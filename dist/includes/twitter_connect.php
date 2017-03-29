<?php

require_once('twitter_api_exchange.php');

// Access tokens

$settings = array(
  'oauth_access_token' => "2858404152-cNnInxsJnOX7ZZ54CcPNcGgRXhrILKjnc41xr98",
  'oauth_access_token_secret' => "1Ih2a8xrBuSBE2FChMeZ35ev11RPP7fQP7eKVfUfT1Xt6",
  'consumer_key' => "e2G1pBW1qknzcWOXiWFm3XtfL",
  'consumer_secret' => "AMteVCs9AZCqNkdybCbtwiFSh41wz1ptlHS2npkNbZyQt9bHWn"
);

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$requestMethod = 'GET';
$count = 20;

$getfield = '?screen_name='.$_astronaut->twitter.'&count='.$count;

$twitter = new TwitterAPIExchange($settings);

$data = json_decode($twitter->setGetfield($getfield)
                      ->buildOauth($url, $requestMethod)
                      ->performRequest(),$assoc = TRUE);
