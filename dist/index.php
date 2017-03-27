<?php

// Faire le cache
// // Setup
// $city = !empty($_GET['city']) ? $_GET['city'] : 'Paris';
// $url = 'http://api.openweathermap.org/data/2.5/forecast?q=' . $city . '&units=metric&APPID=9e8150c9d6fbf87d678d2cf7f7a2c00a';
// $path = './cache/'.md5($url.date('Y-m-d H'));
//
// // From cache
// if (file_exists($path)) {
//
//     $forecast = file_get_contents($path);
// 
// // From API
// } else {
//
//     // Get content
//     $forecast = file_get_contents($url);
//
//     // Save in cache
//     file_put_contents($path, $forecast);
// }
//
// $forecast = json_decode($forecast);

 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="assets/css/app.min.css" rel="stylesheet">
</head>

<body>

    <section>
        <form class="" action="#" method="post">

        </form>
    </section>

    <script src="assets/js/main.min.js"></script>
</body>

</html>
