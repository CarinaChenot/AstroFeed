// Landing

let show, hide

function timer() {
    hide = setTimeout(hidePage, 2500)
    show = setTimeout(showPage, 1000)
}

function hidePage() {
    document.querySelector('#landing').style.display = 'none'
}

function showPage() {
    document.querySelector('#home').style.display = 'block'
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
let date = document.querySelectorAll('.timeline .date')
let dateContainer = document.querySelector('.date-container')
let ligne = document.querySelector('.ligne').offsetWidth
let datePos = 0
let dateY = -16;

dateContainer.style.width = ligne + 'px';

for (let i = 0; i < dots.length; i++) {
    dots[i].style.transform = 'rotate(' + (i + 3) * 10 + 'deg) translateX(' + ligne / 2 + 'px)'
}
for (let i = 0; i < strokes.length; i++) {
    strokes[i].style.transform = 'rotate(' + i * 45 + 'deg) translateX(' + ligne / 2 + 'px)'
}
for (let i = 0; i < date.length; i++) {
    date[i].style.transform = 'translateY(' + parseInt(dateY + (ligne / 2)) + 'px) rotate(' + datePos + 'deg) translateY(' + parseInt((ligne / 2) + 40) + 'px)'
    datePos += 45
    dateY -= 16
}
