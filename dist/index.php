 <?php

 $astronauts = file_get_contents('astronauts.json');
 $astronauts = json_decode($astronauts);

  //  include 'includes/twitter_requests.php';
  //  include 'includes/cache.php';


 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i" rel="stylesheet">
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
            <?php foreach ($astronauts as $_astronaut): ?>
                 <a class="astro" href="?astronaut=<?= $_astronaut->twitter ?>" style="background-image: url('assets/img/<?= $_astronaut->picture_small ?>')">
                     <span class="astro-caption">
                         <?= $_astronaut->name ?>
                     </span>
                 </a>
            <?php endforeach; ?>

        </div>
        <!-- Timeline wheel -->
        <div class="timeline">
            <div class="overflow">
                <div class="mask">
                  <div class="wheel">
                      <div class="ligne">
                        <div class="dots-origin">
                          <div class="dot one"></div>
                          <div class="dot two"></div>
                          <div class="dot three"></div>
                        </div>

                      </div>
                  </div>
                </div>
            </div>
        </div>
    </section>

	<!-- <script src="js/three.min.js"></script> -->
  <script src='assets/js/threex.windowresize.js'></script>
  <script src="assets/js/main.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.js"></script>
	<script src="assets/js/Detector.js"></script>
	<script src="assets/js/TrackballControls.js"></script>
	<script src="assets/js/earth.js"></script>
</body>

</html>
