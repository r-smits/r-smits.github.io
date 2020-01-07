//Canvas objects
let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d', { alpha: false });

let background = document.getElementById("background");
let backgroundcontext = background.getContext('2d', { alpha: false });

//Requests
var halfCanvas = 0;

let pi = Math.PI;
let twoPI = 2 * pi;

function initRetrieval() {

	initCanvas();
	initBackground();

	let response = retrieveGeoSpatialData();
	let worldData = JSON.parse(response);

	set(worldData, true);

	visvalingam = new visvalingamwhyatt();
	visvalingam.set(object.coordinates);

	send(worldData);
}



function initCanvas()
{
  canvas.height = canvas.width = 700;
  canvas.style.left = "30%";
  canvas.style.bottom = "3%";
  canvas.style.top = "0%";
  canvas.style.position = "absolute";

  context.lineWidth = 0.5;

  (canvas.height < canvas.width) ? halfCanvas = canvas.height / 2 : halfCanvas = canvas.width / 2;
}

function initBackground() {

	background.height = background.width = canvas.height;
 	background.style.left = canvas.style.left;
  	background.style.bottom = canvas.style.bottom;
  	background.style.top = canvas.style.top;
  	background.style.position = canvas.style.position;

  	background.addEventListener('mousedown', click, false);

  	backgroundcontext.lineWidth = 0.5;

	backgroundcontext.beginPath();
	backgroundcontext.arc(halfCanvas, halfCanvas, halfCanvas, 0, twoPI);
	backgroundcontext.stroke();
	backgroundcontext.closePath();
}


function retrieveGeoSpatialData() {

  let httpreq = new XMLHttpRequest();

  httpreq.open("GET", "countries-110m.json", false);
  httpreq.send();

  while (httpreq.status != 200) {}
  return httpreq.responseText;
}

function send(topology) { received(0, 0.3, 0); }

window.onload = initRetrieval();

function click(event) {
  let coordinate = getCoordinate(event);
  console.log(coordinate);
  findIntersect(coordinate);
}






