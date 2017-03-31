'use strict';

// Landing

var show = void 0,
    hide = void 0;

function timer() {
    hide = setTimeout(hidePage, 2500);
    // show = setTimeout(showPage, 1000)
}

function hidePage() {
    document.querySelector('#landing').style.display = 'none';
}

// function showPage() {
//     document.querySelector('#home').style.display = 'block'
// }

// Tweets animation
function displayTweets(astro) {
    var container = document.querySelectorAll('.tweets-display');
    var tweets = document.querySelectorAll('.tweet');

    for (var i = 0; i < container.length; i++) {
        container[i].classList.remove('active');
    }
    for (var _i = 0; _i < tweets.length; _i++) {
        tweets[_i].classList.remove('selected');
    }

    var selected = document.querySelector('.tweets-display.' + astro);
    selected.classList.add('active');
}

// Scroll timeline

var wheel = document.querySelector('.wheel');
var timeline = document.querySelector('.timeline');
var rotation = 0;

var scroll_pos = 0;
var ticking = false;

timeline.addEventListener('scroll', function (e) {
    e.preventDefault();
    if (!ticking) {

        // //infinite scroll
        // if (timeline.scrollTop >= 200) {
        //     timeline.scrollTop = 0
        // } else if (timeline.scrollTop == 0) {
        //     timeline.scrollTop = 200
        // }

        if (scroll_pos > timeline.scrollTop) {
            rotation += 45;
        } else {
            rotation -= 45;
        }

        wheel.style.transform = 'rotate(' + rotation + 'deg)';
        ticking = true;
        setTimeout(function () {
            scroll_pos = timeline.scrollTop;
            ticking = false;
        }, 1000);
    }
});

// Generate timeline dots

var dots = document.querySelectorAll('.dot');
var strokes = document.querySelectorAll('.stroke');
var date = document.querySelectorAll('.timeline .date');
var dateContainer = document.querySelector('.date-container');
var ligne = document.querySelector('.ligne').offsetWidth;
var datePos = 0;
var dateY = -16;

dateContainer.style.width = ligne + 'px';

var section = 0;

for (var i = 0; i < dots.length; i++) {
    if (dots[i].getAttribute('data-day') == 1) section = 45;
    if (dots[i].getAttribute('data-day') == 2) section = 90;
    if (dots[i].getAttribute('data-day') == 3) section = 135;
    if (dots[i].getAttribute('data-day') == 4) section = 180;
    if (dots[i].getAttribute('data-day') == 5) section = 225;
    dots[i].style.transform = 'rotate(' + (i + section) * 10 + 'deg) translateY(' + ligne / 2 + 'px)';
}
for (var _i2 = 0; _i2 < strokes.length; _i2++) {
    strokes[_i2].style.transform = 'rotate(' + _i2 * 45 + 'deg) translateX(' + ligne / 2 + 'px)';
}
for (var _i3 = 0; _i3 < date.length; _i3++) {
    date[_i3].style.transform = 'translateY(' + parseInt(dateY + ligne / 2) + 'px) rotate(' + datePos + 'deg) translateY(' + parseInt(ligne / 2 + 40) + 'px)';
    datePos += 45;
    dateY -= 16;
}

function showTweet(id) {
    var tweets = document.querySelectorAll('.tweet');
    var tweet = document.querySelector('#id' + id);
    var container = document.querySelectorAll('.tweets-display');

    for (var _i4 = 0; _i4 < container.length; _i4++) {
        container[_i4].classList.remove('active');
    }
    for (var _i5 = 0; _i5 < tweets.length; _i5++) {
        tweets[_i5].classList.remove('selected');
    }
    tweet.classList.add('selected');
}

// Get click or scroll
document.querySelector('.overflow').addEventListener('click', function () {
    wheel.style.zIndex = '1';
});
window.addEventListener('scroll', function () {
    wheel.style.zIndex = '-1';
});