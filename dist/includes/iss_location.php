<?php

    $iss_pos = file_get_contents('http://api.open-notify.org/iss-now.json');
    $iss_pos = json_decode($iss_pos);