 <?php

    $astronauts = file_get_contents('astronauts.json');
    $astronauts = json_decode($astronauts);

    include 'includes/cache.php';
    include 'includes/tweet_html.php';
    include 'includes/iss_location.php';

 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>Astrofeed</title>
    <link rel="icon" type="image/png" href="assets/img/astrofeed_favicon.png" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i" rel="stylesheet">
    <link href="assets/css/app.min.css" rel="stylesheet">
</head>

<body onload="timer()">

    <!-- LANDING -->
<!--
    <section id="landing">
        <div class="landing-text">
            AstroFeed
            <div>An interactive astronauts socials feed</div>
        </div>
    </section>
-->

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
            <h1>Twitter feed</h1>
            <div class="feed-container">
                <?php foreach ($tweets as $_astro): ?>
                    <div class="tweets-display <?= $_astro[0]->user->screen_name ?>">
                        <h2 class="name">- <?= $_astro[0]->user->name ?> -</h2>
                        <a class="user-link" href="https://twitter.com/<?= $_astro[0]->user->screen_name ?>" target="_blank">@<?= $_astro[0]->user->screen_name ?></a>

                        <?php foreach ($_astro as $_tweet): ?>
                            <div class="tweet <?= $_tweet->user->screen_name ?>" id="id<?= $_tweet->id_str ?>">
                                <span class="date"><?= date('d F - H:i', strtotime($_tweet->created_at)) ?></span>
                                <p class="text"><?php echo json_tweet_text_to_HTML($_tweet); ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Embed ISS live -->
<!--
        <div class="live">
        <iframe width="4280" height="270" src="http://www.ustream.tv/embed/17074538?html5ui" scrolling="no" allowfullscreen webkitallowfullscreen frameborder="0" style="border: 0 none transparent;"></iframe></div>
-->

        <!-- Timeline wheel -->
        <div class="timeline">
            <div class="overflow">
                <div class="ligne"></div>
                <div class="wheel">
                    <div class="dots-origin">
                        <?php foreach ($tweets as $_astro): ?>
                            <?php foreach ($_astro as $_tweet):
                                if (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")  , date("d"), date("Y"))) {
                                    $day = 0;
                                } elseif (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")-1  , date("d"), date("Y"))) {
                                    $day = 1;
                                } elseif (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")-2  , date("d"), date("Y"))) {
                                        $day = 2;
                                } elseif (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")-3  , date("d"), date("Y"))) {
                                        $day = 3;
                                } elseif (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")-4  , date("d"), date("Y"))) {
                                        $day = 4;
                                } elseif (strtotime($_tweet->created_at) > mktime(0, 0, 0, date("m")-5  , date("d"), date("Y"))) {
                                        $day = 5;
                                } else {
                                    continue;
                                }

                                ?>
                                     <div data-day="<?= $day ?>" data-date="<?= strtotime($_tweet->created_at) ?>" class="dot <?= $_tweet->user->screen_name ?>" onclick="showTweet('<?= $_tweet->id_str ?>');"></div>
                            <?php endforeach; ?>
                        <?php endforeach; ?>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                        <div class="stroke"></div>
                    </div>
                    <div class="date-container">
                        <div class="date"><?= date("l jS"); ?></div>
                        <div class="date"><?= date("l jS", mktime(0, 0, 0, date("m")  , date("d")-1, date("Y"))); ?></div>
                        <div class="date"><?= date("l jS", mktime(0, 0, 0, date("m")  , date("d")-2, date("Y"))); ?></div>
                        <div class="date"><?= date("l jS", mktime(0, 0, 0, date("m")  , date("d")-3, date("Y"))); ?></div>
                        <div class="date"><?= date("l jS", mktime(0, 0, 0, date("m")  , date("d")-4, date("Y"))); ?></div>
                        <div class="date"><?= date("l jS", mktime(0, 0, 0, date("m")  , date("d")-5, date("Y"))); ?></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-centers">
            <h2>Space centers</h2>
            <a href="#">Nasa</a> -
            <a href="#">Esa</a> -
            <a href="#">Rsa</a>
              
            <h2>ISS coordinates</h2>
            <span class="iss iss_lat">Latitude / <?php echo $iss_pos->iss_position->latitude ?></span>
            <span class="iss iss_long">Longitude / <?php echo $iss_pos->iss_position->longitude; ?></span>
            <button onClick="window.location.reload()">- Click to get new Iss position</button>
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
