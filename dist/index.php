 <?php

   include 'includes/twitter_requests.php';
   include 'includes/cache.php';

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

        <div class="astro-list">
            <h1>Astronauts</h1>
            <?php foreach ($astronauts as $_astronaut):?>
                 <a class="astro" href="?astronaut=<?= $_astronaut ?>" style="background-image: url('assets/img/<?= 'doge.jpeg' ?>')"></a>
            <?php endforeach; ?>

        </div>
        <div class="center">
            <div class="popup">

            </div>
            <div class="timeline">
                <div class="ligne">

                </div>
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
