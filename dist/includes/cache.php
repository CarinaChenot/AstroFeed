<?php

foreach ($astronauts as $_astronaut) {

    $path = './cache/'.md5($_astronaut->twitter.date('Y-m-d H'));

    // From cache
    if (file_exists($path)) {

        $tweets[$_astronaut->twitter] = json_decode(file_get_contents($path));

    // From API
    } else {
        
        include 'twitter_connect.php';

        //Save in cache
        $data = json_encode($data);
        file_put_contents($path, $data);

        // Get content
        $tweets[$_astronaut->twitter] = json_decode(file_get_contents($path));
    }
}
