<?php
	require_once('util.php');
	header("X-Accel-Buffering: no");
	header("Content-Type: text/event-stream");
	header("Cache-Control: no-cache");

	//$counter = 5;
	while (true) {

	  /*echo "event: ping\n";
	  $curDate = date(DATE_ISO8601);
	  echo 'data: {"time": "' . $curDate . '"}';
	  echo "\n\n";*/


	  //$counter--;

	  //if ($counter <= 0) {
	    echo 'data: ' . json_encode(getData()) . "\n\n";
	    //$counter = 5;
	  //}

	  if (ob_get_contents()) {
	      ob_end_flush();
	  }
	  flush();

	  if (connection_aborted()) break;

	  sleep(5);
	}
?>