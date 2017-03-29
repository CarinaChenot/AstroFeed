'use strict';

// Landing

var myVar = void 0;

function timer() {
  myVar = setTimeout(hidePage, 2500);
}

function hidePage() {
  document.getElementById('landing').style.display = 'none';
}