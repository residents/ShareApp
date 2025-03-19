<?php

        date_default_timezone_set('America/Mexico_City');

        $ds = DIRECTORY_SEPARATOR;
        $date = date('Ymd');
        $storeFolder = 'files/' . $date . '/';

        if(!folder_exist($storeFolder)){
            mkdir($storeFolder, 0755);
        }

        function getData(){
                $date = date('Ymd');
                $storeFolder = 'files/' . $date . '/';
                $listFiles = [];
                $files = array_diff(scandir($storeFolder), array('..', '.'));
                foreach ($files as $k => $file) {
                        $listFiles[] = array(
                                'filename' => $file, 
                                'size' => filesize($storeFolder . $file),
                                'datetime' => filemtime($storeFolder . $file)
                        );
                }
                usort($listFiles, function($a, $b) {
                        return strcmp($b['datetime'], $a['datetime']);
                });
                return array(
                        'time' => date('Ymdhis'),
                        'success' => true, 
                        'folder' => $storeFolder, 
                        'files' => $listFiles
                );
        }

        function folder_exist($folder){
                // Get canonicalized absolute pathname
                $path = realpath($folder);

                // If it exist, check if it's a directory
                if($path !== false AND is_dir($path))
                {
                // Return canonicalized absolute pathname
                return $path;
                }

                // Path/folder does not exist
                return false;
        }

        

?>
