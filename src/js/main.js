// Landing

let myVar;

function timer() {
    myVar = setTimeout(hidePage, 10000);
}

function hidePage() {
  document.getElementById('landing').style.display = 'none';
}
