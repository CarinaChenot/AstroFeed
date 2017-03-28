'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var markers = document.querySelector('.markers');

var Marker = function () {
    function Marker(x, y, twitter, astronaut) {
        _classCallCheck(this, Marker);

        this.x = x;
        this.y = y;
        this.marker;
        this.astronaut = astronaut;
        this.twitter = twitter;
    }

    _createClass(Marker, [{
        key: 'showPopup',
        value: function showPopup() {
            this.marker.addEventListener('click', function (e) {
                // e.preventDefault()
                // window.history.pushState('object or string', 'Title', '?astronaut=' + this.twitter)
                document.querySelector('.popup').classList.toggle('show');
            });
        }
    }, {
        key: 'create',
        value: function create() {
            var markers = document.querySelector('.markers');

            // Create marker div
            this.marker = document.createElement('a');
            this.marker.setAttribute('data-id', this.id);
            this.marker.classList.add('marker');
            this.marker.setAttribute('href', '?astronaut=' + this.twitter);
            this.marker.innerHTML = this.astronaut;
            this.marker.style.left = this.x + 'px';
            this.marker.style.top = this.y + 'px';

            markers.append(this.marker);

            // Call popup click
            return this.showPopup();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.marker.style.display = 'none';
        }
    }]);

    return Marker;
}();

var marker1 = new Marker(40, 50, 'astro_kimbrough', 'Shane Kimbrough');
marker1.create();
var marker2 = new Marker(50, 50, 'Thom_astr', 'Thomas Pesquet');
marker2.create();
var marker3 = new Marker(60, 60, 'AstroPeggy', 'Peggy Whitson');
marker3.create();
var marker4 = new Marker(70, 70, 'Astro_Alex', 'Alexander Gerst');
marker4.create();
var marker5 = new Marker(80, 80, 'astro_luca', 'Luca Parmitano');
marker5.create();
var marker6 = new Marker(90, 90, 'astro_timpeake', 'Tim Peake');
marker6.create();
var marker7 = new Marker(100, 100, 'Astro2fish', 'Jack Fischer');
marker7.create();
var marker8 = new Marker(70, 90, 'Astro_Jeff', 'Jeff Williams');
marker8.create();
var marker9 = new Marker(70, 90, 'Astro_Wheels', 'Doug Wheelock');
marker9.create();