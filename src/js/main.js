// Landing

let myVar;

function timer() {
    myVar = setTimeout(hidePage, 2500);
}

function hidePage() {
  document.getElementById('landing').style.display = 'none';
}
