// let markers = document.querySelector('.markers')
//
// class Marker {
//
//     constructor(x, y, twitter, astronaut) {
//         this.x = x
//         this.y = y
//         this.marker
//         this.astronaut = astronaut
//         this.twitter = twitter
//     }
//     showPopup() {
//         this.marker.addEventListener('click', (e) => {
//             // e.preventDefault()
//             // window.history.pushState('object or string', 'Title', '?astronaut=' + this.twitter)
//             document.querySelector('.popup').classList.toggle('show')
//         })
//     }
//     create() {
//         let markers = document.querySelector('.markers')
//
//         // Create marker div
//         this.marker = document.createElement('a')
//         this.marker.setAttribute('data-id', this.id)
//         this.marker.classList.add('marker')
//         this.marker.setAttribute('href', '?astronaut=' + this.twitter)
//         this.marker.innerHTML = this.astronaut
//         this.marker.style.left = this.x + 'px'
//         this.marker.style.top = this.y + 'px'
//
//         markers.append(this.marker)
//
//         // Call popup click
//         return this.showPopup()
//     }
//     hide() {
//         this.marker.style.display = 'none'
//     }
// }
//
// let marker1 = new Marker(40, 50, 'astro_kimbrough', 'Shane Kimbrough')
// marker1.create()
// let marker2 = new Marker(50, 50, 'Thom_astr', 'Thomas Pesquet')
// marker2.create()
// let marker3 = new Marker(60, 60, 'AstroPeggy', 'Peggy Whitson')
// marker3.create()
// let marker4 = new Marker(70, 70, 'Astro_Alex', 'Alexander Gerst')
// marker4.create()
// let marker5 = new Marker(80, 80, 'astro_luca', 'Luca Parmitano')
// marker5.create()
// let marker6 = new Marker(90, 90, 'astro_timpeake', 'Tim Peake')
// marker6.create()
// let marker7 = new Marker(100, 100, 'Astro2fish', 'Jack Fischer')
// marker7.create()
// let marker8 = new Marker(70, 90, 'Astro_Jeff', 'Jeff Williams')
// marker8.create()
// let marker9 = new Marker(70, 90, 'Astro_Wheels', 'Doug Wheelock')
// marker9.create()
//"use strict";
"use strict";