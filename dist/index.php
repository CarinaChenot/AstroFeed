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

 <?php
   include 'includes/twitter_requests.php';
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

<body onload="timer()">
    <section id="landing">
        <div class="landing-text">
            AstroFeed
            <div>An interactive astronauts socials feed</div>
        </div>
    </section>
    <section id="home">
        <div id="webgl"></div>

        <div class="markers">

        </div>
        <div class="center">
            <div class="popup">

            </div>
        </div>
    </section>

	<!-- <script src="js/three.min.js"></script> -->
    <script src="assets/js/main.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.js"></script>
	<script src="assets/js/Detector.js"></script>
	<script src="assets/js/TrackballControls.js"></script>
	<script src="assets/js/earth.js"></script>
	<script src="assets/js/markers.js"></script>
</body>

</html>
