<?php

require_once('twitter_api_exchange.php');

/** Set access tokens **/
$settings = array(
  'oauth_access_token' => "2858404152-cNnInxsJnOX7ZZ54CcPNcGgRXhrILKjnc41xr98",
  'oauth_access_token_secret' => "1Ih2a8xrBuSBE2FChMeZ35ev11RPP7fQP7eKVfUfT1Xt6",
  'consumer_key' => "e2G1pBW1qknzcWOXiWFm3XtfL",
  'consumer_secret' => "AMteVCs9AZCqNkdybCbtwiFSh41wz1ptlHS2npkNbZyQt9bHWn"
);

/** Set request and method **/

// Get twitter user timeline
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$requestMethod = 'GET';

if (!empty($_GET['astronaut']))
{

  /** Get astronaut twitter screen_name and count **/
  $astronaut = $_GET['astronaut'];
  if (isset($_GET['count']))
    $count = $_GET['count'];
  else
    $count = 20;

  $getfield = '?screen_name='.$astronaut.'&count='.$count;

  $twitter = new TwitterAPIExchange($settings);
  $twitter->setGetfield($getfield)
    ->buildOauth($url, $requestMethod)
    ->performRequest();

  $tweets = json_decode($twitter->setGetfield($getfield)
                        ->buildOauth($url, $requestMethod)
                        ->performRequest(),$assoc = TRUE);

    foreach($tweets['Thom_astro'] as $_tweet)
    {

      // Get time and date of the tweet
      echo "Time and Date of Tweet: ".date('d F - H:i', strtotime($_tweet->created_at))."<br />";

      // Get the tweet text
      if (isset($_tweet->entities->urls['0']->url))
      {
        $no_link_tweet = str_replace($_tweet->entities->urls['0']->url, '', $_tweet->text).'<br />';
        echo $no_link_tweet;
      }
      else
      {
        echo $_tweet->text.'<br />';
      }


      // Check if media in the tweet and set size if true (thumb, small, medium, large or w and h)
      if(isset($_tweet->entities->media['0']->media_url))
        echo "Tweet image: <img src=".$_tweet->entities->media['0']->media_url.":small /><br />";

      echo '<br />';
    }
}
