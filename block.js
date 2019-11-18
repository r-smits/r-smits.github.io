
//Canvas objects
let canvas2 = document.getElementById("canvas2");

let draw2 = canvas2.getContext('2d');

//Append to the right div
let div2 = document.getElementById("wrapperchild2");

canvas2.width = 250;
canvas2.height = 250;


function init() {

  draw2.beginPath();
  draw2.arc(100, 100, 85, 0, 2 * Math.PI);
  draw2.stroke();
}

window.onload = init();