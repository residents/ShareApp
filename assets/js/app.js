var myDropzone = null;
var numberFiles = 0;
async function getData(){
	await fetch('./getData.php')
	.then((respuesta) => {
		return respuesta.json();
	}).then((datos) => {
		initDropZone(datos);
	}).catch(error => {
    	console.log(error);
	})
}
function callbackDisplayFile(arg){
	console.log(arg);
}

function compareFileName(a, b){
  const nameA = a.filename.toUpperCase(); // ignore upper and lowercase
  const nameB = b.filename.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function initDropZone(datos){
	myDropzone = new Dropzone("#form-dropzone", { 
		maxFilesize: 1000,
		maxThumbnailFilesize: 10,
		createImageThumbnails: false,
		thumbnailMethod: "contain",
		acceptedFiles: "audio/*",
		addRemoveLinks: false,
		dictDefaultMessage: 'Arrastre sus archivos aqui para cargarlos al servidor.',
		dictRemoveFile: 'Eliminar',
		renameFile: function (file) {
			let newName = `Audio_${`${numberFiles+1}`.padStart(3,0)}.mp3`;
			return newName;
		},
		accept: function (file, done) {
	        done();
	    },
		init: function() {
			//console.log(datos);
			let files = datos.files;
			numberFiles += files.length;
			let myDropzone = this;
			files.sort(compareFileName);
			files.forEach((element, index) => {
				let mockFile = { name: element.filename, size: element.size};
				let urlToFile = window.location.href + datos.folder + element.filename;
			    myDropzone.options.addedfile.call(myDropzone, mockFile);
			    myDropzone.options.complete(myDropzone);
			    myDropzone.emit("complete", mockFile);

			});
			this.on("success", (file, response) => {
				response = JSON.parse(response);
		    	if(response.success){
		    		numberFiles++;
		    		file.name = response.file.name;
		    		window.location.reload();
		    	}else{
		    		myDropzone.removeFile(file);
		    		Swal.fire({
						title: 'Error!',
						text: '¡El archivo que intenta cargar ya existe!',
						icon: 'error',
						confirmButtonText: 'Ok',
						backdrop: true,
						confirmButtonColor: '#dd6b55',
					})
		    	}
		    });
		    this.on("complete", function (file) {
				console.log(file);
			});
		},
		accept: function(file, done) {
			//console.log(file.xhr);
			//console.log(file);
			done();
	    }
	});
}

getData();