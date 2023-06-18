let divisor = document.querySelector('.divisor');
let slider = document.getElementById('slider-range');

let divisorChanged = () => (divisor.style.width = slider.value + '%');
