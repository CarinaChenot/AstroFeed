<?php
  $result = file_get_contents('http://api.open-notify.org/iss-now.json');
  $result = json_decode($result);

  $iss_lat = $result->iss_position->latitude;
  $iss_long = $result->iss_position->longitude;
