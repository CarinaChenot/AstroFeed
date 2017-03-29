// Landing

let myVar;

function timer() {
    myVar = setTimeout(hidePage, 2500);
}

function hidePage() {
  document.getElementById('landing').style.display = 'none';
}

// Scroll timeline
let wheel = document.querySelector('.wheel');
let timeline = document.querySelector('.timeline');

timeline.scrollTop = 360;

timeline.addEventListener('scroll', () => {

   	wheel.style.transform = 'translateX(-50%) rotate(' + (timeline.scrollTop) + 'deg)';

   	if(timeline.scrollTop >= 720){
   		timeline.scrollTop = 360;
   	}
   	else if(timeline.scrollTop == 0){
   		timeline.scrollTop = 360;
   	}
}, false);
