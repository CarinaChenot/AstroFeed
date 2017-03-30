// Landing

let myVar

function timer() {
    myVar = setTimeout(hidePage, 2500)
}

function hidePage() {
    document.getElementById('landing').style.display = 'none'
}

// Tweets animation
function displayTweets(astro) {
    let container = document.querySelectorAll('.tweets-display')

    for (let i = 0; i < container.length; i++) {
        container[i].classList.remove('active')
    }

    let selected = document.querySelector('.tweets-display.' + astro)
    selected.classList.add('active')
}


// Scroll timeline

let wheel = document.querySelector('.wheel')
let timeline = document.querySelector('.timeline')
let rotation = 0

let scroll_pos = 0
let ticking = false

timeline.addEventListener('scroll', (e) => {
    e.preventDefault()
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
            rotation += 45
        } else {
            rotation -= 45
        }

        wheel.style.transform = 'rotate(' + rotation + 'deg)'
        ticking = true
        setTimeout(() => {
            scroll_pos = timeline.scrollTop
            ticking = false
        }, 1000)
    }
})


// Generate timeline dots

let dots = document.querySelectorAll('.dot')
let strokes = document.querySelectorAll('.stroke')
let date = document.querySelectorAll('.date')
let ligne = document.querySelector('.ligne').offsetWidth
let datePos = 0;


for (let i = 0; i < dots.length; i++) {
    dots[i].style.transform = 'rotate(' + (i+3) * 10 + 'deg) translateX(' + ligne / 2 + 'px)'
}
for (let i = 0; i < strokes.length; i++) {
    strokes[i].style.transform = 'rotate(' + i * 45 + 'deg) translateX(' + ligne / 2 + 'px)'
}
for (let i = 0; i < date.length; i++) {
    date[i].style.transform = 'rotate(' + datePos + 'deg) translateY(' + ligne / 2 + 'px) translateX(-50%)'
    datePos -= 45;
}
