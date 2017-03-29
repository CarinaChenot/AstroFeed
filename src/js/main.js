// Landing

let myVar

function timer() {
    myVar = setTimeout(hidePage, 2500)
}

function hidePage() {
  document.getElementById('landing').style.display = 'none'
}

// Scroll timeline
let wheel = document.querySelector('.wheel')
let timeline = document.querySelector('.timeline')
let slow = 3 // set 1 to default

timeline.scrollTop = 360*3

timeline.addEventListener('scroll', () => {

   	wheel.style.transform = 'rotate(' + (timeline.scrollTop/slow) + 'deg)'

   	if(timeline.scrollTop >= 720*slow){
   		timeline.scrollTop = 360*slow
   	}
   	else if(timeline.scrollTop == 0){
   		timeline.scrollTop = 360*slow
   	}
}, false)


// Generate timeline dots

let dots = document.querySelectorAll('.dot')
let ligne = document.querySelector('.ligne').offsetWidth

for (let i = 0; i < dots.length; i++) {
    dots[i].style.transform = 'rotate(-' + i*10 + 'deg) translateX(-' + ligne/2 + 'px)'
}
