 <?php

    $astronauts = file_get_contents('astronauts.json');
    $astronauts = json_decode($astronauts);

    include 'includes/cache.php';
    include 'includes/tweet_html.php';

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

    <!-- LANDING -->
    <section id="landing">
        <div class="landing-text">
            AstroFeed
            <div>An interactive astronauts socials feed</div>
        </div>
    </section>

    <!-- HOME -->
    <div id="webgl"></div>
    <section id="home">

        <!-- Astro list -->
        <div class="astro-list">
            <h1>Astronauts</h1>
            <?php foreach ($astronauts as $_astronaut): ?>
                <div class="astro">
                    <a class="astro-picture" href="#" onclick="displayTweets('<?= $_astronaut->twitter ?>');" style="background-image: url('assets/img/<?= $_astronaut->picture_small ?>')"></a>
                    <div class="astro-caption"><div><?= $_astronaut->name ?></div></div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Tweets display -->
        <div class="tweets-container">
            <?php foreach ($tweets as $_astro): ?>
            <div class="tweets-display <?= $_astro[0]->user->screen_name ?>">
                <h2 class="name"><?= $_astro[0]->user->name ?></h2>
                <?php foreach ($_astro as $_tweet): ?>
                     <div class="tweet <?= $_tweet->user->screen_name ?>">
                         <span class="date"><?= date('d F - H:i', strtotime($_tweet->created_at)) ?></span>
                         <p class="text"><?php echo json_tweet_text_to_HTML($_tweet); ?></p>
                     </div>
                <?php endforeach; ?>
            </div>
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
                          <div class="stroke"></div>
                          <div class="stroke"></div>
                          <div class="stroke"></div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        <div class="space-centers">
              <a href="#">Nasa</a>
              <a href="#">Esa</a>
              <a href="#">Rsa</a>
        </div>

    </section>

    <!-- Scripts -->
    <script src='assets/js/threex.windowresize.js'></script>
    <script src="assets/js/main.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.js"></script>
	<script src="assets/js/Detector.js"></script>
	<script src="assets/js/TrackballControls.js"></script>
	<script src="assets/js/earth.js"></script>

</body>

</html>
