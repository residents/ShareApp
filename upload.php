<?php
    
    require_once('util.php');

    if (!empty($_FILES)) {
        $tempFile = $_FILES['file']['tmp_name'];
        $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;
        $targetFile =  $targetPath. $_FILES['file']['name'];

        if(file_exists($targetFile)){
            echo json_encode(array('success' => false, 'error' => 'El archivo ya existe.'));
            return;
        }

        move_uploaded_file($tempFile,$targetFile);
        echo json_encode(array('success' => true, 'file' => $_FILES['file']));
    }else{
        echo json_encode(array('success' => false, 'error' => 'No fue posible cargar el archivo.'));
    }

    //cambiar el nombre de los archivos a nombre consecutivo (ok)
    //duplicar app para trabajar con 2 estaciones
    //agregar logo y quitar titulo (ok)
    //al recargar la pagina de subidas, listar los archivos del mas viejo al mas nuevo (ok)
    //manejar los errores de carga (ok)
?> 