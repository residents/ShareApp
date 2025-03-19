var dropzone = null;
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

function initDropZone(datos){
	Dropzone = new Dropzone("#form-dropzone", { 
		maxFilesize: 1000,
		maxThumbnailFilesize: 10,
		createImageThumbnails: false,
		thumbnailMethod: "contain",
		acceptedFiles: "audio/*,video/*",
		addRemoveLinks: false,
		dictDefaultMessage: 'Arrastre sus archivos aqui para cargarlos al servidor.',
		dictRemoveFile: 'Eliminar',
		init: function() {
			//console.log(datos);
			let files = datos.files;
			let myDropzone = this;
			files.forEach((element, index) => {
				let mockFile = { name: element.filename, size: element.size};
				let urlToFile = window.location.href + datos.folder + element.filename;

			    myDropzone.options.addedfile.call(myDropzone, mockFile);
			    myDropzone.options.complete(myDropzone);
			    myDropzone.emit("complete", mockFile);
			});
			this.on("success", file => {
				let response = JSON.parse(file.xhr.response);
		    	if(!response.success){
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
		},
		accept: function(file, done) {
			//console.log(file.xhr);
			//console.log(file);
			done();
	    }
	});
}

getData();