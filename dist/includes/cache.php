<?php

// Setup
$astronauts = ['astro_kimbrough', 'Thom_astro', 'AstroPeggy', 'Astro_Alex', 'astro_luca', 'astro_timpeake', 'Astro2fish', 'Astro_Jeff', 'Astro_Wheels'];

foreach ($astronauts as $_astronaut) {
    $path = './cache/'.md5($_astronaut.date('Y-m-d H'));

    // From cache
    if (file_exists($path)) {

        $tweets[$_astronaut] = file_get_contents($path);

    // From API
    } else {

        // Get content
        $tweets[$_astronaut] = file_get_contents('http://google.com'); // À remplacer par la requête API

        // Save in cache
        file_put_contents($path, $tweets[$_astronaut]);
    }
}
