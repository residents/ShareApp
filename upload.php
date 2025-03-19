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
        echo json_encode(array('success' => true, 'file-upload' => $_FILES['file']));
    }else{
        echo json_encode(array('success' => false, 'error' => 'No fue posible cargar el archivo.'));
    }


?> 