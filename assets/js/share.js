var container = document.getElementById('ContainerCards');
var arrAudios = null;
var bndInit = true;
async function getData(){
	await fetch('../getData.php')
	.then((respuesta) => {
		return respuesta.json();
	}).then((datos) => {
		arrAudios = datos;
		initGrid();
	}).catch(error => {
    	console.log(error);
	})
}

const modalQr = new bootstrap.Modal('#ModalQr', {

});
//const myModalEl = document.getElementById('ModalQr')

var qrcode = new QRCode(document.getElementById("QrCode"), {
    text: window.location.href,
    width: parseInt(screen.height * 0.5),
    height: parseInt(screen.height * 0.5),
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function createQrCode(url){
	qrcode.clear();
	qrcode.makeCode(url);
}

function openModalQr(element, url, filename) {
	let elTitle = document.getElementById('TitleModal');
	elTitle.innerText = filename;
	createQrCode(url);
	modalQr.show();
}
function connectToSse(){
	const evtSource = new EventSource("../sse.php");
	evtSource.onmessage = (event) => {
		let newArrAudios = JSON.parse(event.data);
		console.log(arrAudios.files.length, newArrAudios.files.length);
		if(arrAudios.files.length != newArrAudios.files.length){
			arrAudios = newArrAudios;
			initGrid();
		}
		//console.log(newArrAudios);
	};
}

function initGrid(){

	container.innerHTML = "";
	console.log("grid actualizado", arrAudios);
	let folder = arrAudios.folder.split('/');
	folder = folder[1];
	arrAudios.files.forEach((element, index) => {
		let card = document.createElement('div');
		card.classList.add('col-3');
		let size = element.size / 1024;
		let sufijo = 'kb';
		if(size > 1024){
			size = size / 1024;
			sufijo = 'mb';
		}
		let urlToFile = window.location.href + '../' + arrAudios.folder + element.filename;
		card.innerHTML = `<div class="card text-bg-light border-darkx shadow-lg ml-1 mb-2">
			<div class="card-body">
				<p class="card-title text-center text-bold">${element.filename}</p>
				<h6 class="card-subtitle mb-2 text-body-secondary">
					<audio class="w-100" src="../${arrAudios.folder}${element.filename}" controls >
	  					Your browser does not support the <code>audio</code> element.
					</audio>
				</h6>
				<hr />
				<p class="card-subtitle mb-2"><small>Carpeta: ${folder}</small></p>
				<p class="card-subtitle mb-2"><small>Tamaño: ${size.toFixed(2)} ${sufijo}</small></p>
				<hr />
				<div class="row">
					<a href="javascript:;" onclick="openModalQr(this, '${urlToFile}', '${element.filename}')" class="card-link btn btn-primary col">Mostrar QR</a>
					
				</div>
			</div>
		</div>`;
		/*<a href="javascript:;" onclick="" class="card-link btn btn-primary col">Whatsapp</a>*/
		container.appendChild(card);
	});
	if(bndInit){
		bndInit = false;
		connectToSse();
	}
}

getData();