let numer = Math.floor(Math.random() * 5) + 1;

let timer1 = 0;
let timer2 = 0;

function setSlide(nrslajdu) {
  clearTimeout(timer1);
  clearTimeout(timer2);
  numer = nrslajdu - 1;

  hide();
  setTimeout('changeSlide()', 500);
}

function hide() {
  $('#slider').fadeOut(500);
}

function changeSlide() {
  numer++;
  if (numer > 5) numer = 1;

  let plik = '<img src="slajdy/slajd' + numer + '.png" />';
  document.getElementById('slider').innerHTML = plik;
  $('#slider').fadeIn(500);

  timer1 = setTimeout('changeSlide()', 5000);
  timer2 = setTimeout('hide()', 4500);
}
