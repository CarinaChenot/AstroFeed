'use strict';

// Landing

var myVar = void 0;

function timer() {
    myVar = setTimeout(hidePage, 2500);
}

function hidePage() {
    document.getElementById('landing').style.display = 'none';
}

// Tweets animation
function displayTweets(astro) {
    var container = document.querySelectorAll('.tweets-display');

    for (var i = 0; i < container.length; i++) {
        container[i].classList.remove('active');
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

        // console.log('last scroll pos', scroll_pos);
        console.log('actual one', timeline.scrollTop);
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
var date = document.querySelectorAll('.date');
var ligne = document.querySelector('.ligne').offsetWidth;
var datePos = 0;

for (var i = 0; i < dots.length; i++) {
    dots[i].style.transform = 'rotate(' + (i + 3) * 10 + 'deg) translateX(' + ligne / 2 + 'px)';
}
for (var _i = 0; _i < strokes.length; _i++) {
    strokes[_i].style.transform = 'rotate(' + _i * 45 + 'deg) translateX(' + ligne / 2 + 'px)';
}
for (var _i2 = 0; _i2 < date.length; _i2++) {
    date[_i2].style.transform = 'rotate(' + datePos + 'deg) translateY(' + ligne / 2 + 'px) translateX(-50%)';
    datePos -= 45;
}