//imports

//Public variables
var barChartplot = [
	[10	, "C1"],
	[9	, "C2"],
	[8	, "C3"],
	[7	, "C4"],
	[6	, "C5"],
	[6	, "C6"],
	[4	, "C7"],
	[3	, "C8"],
	[2	, "C9"],
	[1	, "C10"],
	[27	, "C11"],
	[4	, "C12"],
	[2	, "C13"],
	[1	, "C14"],
	[5	, "C15"],
	[4	, "C16"],
	[2	, "C17"],
	[1	, "C18"],
	[30	, "C19"],
	[4	, "C20"],
	[2	, "C21"],
	[1	, "C22"],
	[9	, "C23"],
	[4	, "C24"],
	[8	, "C25"],
	[14	, "C26"],
	[2	, "C27"],
	[9	, "C28"],
	[27	, "C29"],
	[28 , "C30"],
	[18	, "C31"],
];

var barChartObjects = [];
var barChartIterateVars = [0, 0];


//Canvas object
let canvas2 = document.getElementById("canvas2");
let drawc2 = canvas2.getContext('2d');

//Size and width of the canvas
canvas2.width = window.innerWidth - 50;
canvas2.height = window.innerHeight / 2 - 25;

canvas2.style.left = "0%";
canvas2.style.top = "0%";
canvas2.style.position = "absolute";

//Animation global variables
var val1 = 0;
var val2 = 0;

var start = 0;
var end = 0;

var dX = 0;
var middX = 0;

var tempv1C = "";
var tempv2C = "";

//Translation for bounce
var barChartTranslateRatio = 25;

var translatedv1X = 0;
var translatedv2X = 0;
var translateddX = 0;
var translatedmiddX = 0;

var origStartY = 0;
var origEndY = 0;

var dXCounter = 0;

//Finished variable
var bounceFinished = false;


class barChartObject
{
	constructor(value, name, x, y, width, height, color, lX, lY)
	{
		//Essentials
		this.value = value;
		this.name = name;

		//Startingpoints
		this.x = x;
		this.y = y;

		//Width and height of object
		this.width = width;
		this.height = height;

		//Color
		this.color = color;

		//Label coordinates
		this.lX = lX;
		this.lY = lY;
	}

	draw()
	{
		//Begin drawing
		drawc2.beginPath();

		//Draw the rectangle
		drawc2.rect(this.x, this.y, this.width, this.height);
		drawc2.stroke();

		//Fill the drawn area
		drawc2.fillStyle = this.color;
		drawc2.fill();

		//Label
		drawc2.fillStyle = "#000000" // black
	 	drawc2.fillRect(this.lX, this.lY, 5, 5);
	  	drawc2.fillText(this.name, this.lX + 10, this.lY + 5);

		//Stop drawing
		drawc2.closePath();
	}

	erase() { drawc2.clearRect(this.x-2, canvas2.height, this.width+4, -canvas2.height); }
}


function init()
{
	constructBarChart(barChartplot);
	createBars(barChartplot);

	//bubbleSort(barChartObjects);


}

function bubbleSort(data)
{
	var max = data.length-1;
	bounceFinished = false;

	if (barChartIterateVars[1] < max)
	{
		barChartIterateVars[1] += 1;

		if (data[barChartIterateVars[0]].value > data[barChartIterateVars[1]].value) 
		{
			constructSwap(barChartIterateVars[0], barChartIterateVars[1]);
			return;
		}
	}
	else
	{
		if (barChartIterateVars[0] < max)
		{
			barChartIterateVars[0] += 1;
			barChartIterateVars[1] = barChartIterateVars[0];
		}
	}
	
	if (barChartIterateVars[0] == max && barChartIterateVars[1] == max)
	{
		//Debug message
		console.log("bubbleSort finished");

		//Reset values
		barChartIterateVars[0] = 0;
		barChartIterateVars[1] = 0;

		return;
	}
	else
	{
		bubbleSort(data);
	}
}


function traditionalQuickSort(data)
{

	//Now you have objects for every bar.
	//This enables you to write a swap function that only makes use of these objects.
	//You can set a custom color for two of the bars and draw them in red.

	//Then you can animate a change in their x and y position to match the x and y position of the one that needs to be swapped.
	//Finally you can, administratively, change the location of the objects in the array.
	//You can also adjust the 


	return data;
}





function constructBarChart(constructData)
{
	//Reset the sum of values
	var barChartplotSum = 0;

	//Calculate width of the bar
	var widthOfBar = (canvas2.width / constructData.length);
	var widthOfBar = widthOfBar * 0.6;

	//Halfwidth for label coordinates
	var halfWidthOfBar = widthOfBar * 0.2;

	for (var i = 0; i < constructData.length; i += 1)
	{
		//Calculate height of the bar
		var heightOfBar = (canvas2.height - 50) / maxOfArray();
		heightOfBar = (-heightOfBar * constructData[i][0]);

		//Add the starting point for the width and height
		var heightofBarStartingPoint = canvas2.height - 30;
		var widthofBarStartingPoint = (widthOfBar * i) + (widthOfBar * 0.6 * i) + 30;

		//Assign to barChartElement and create object
		constructData[i] = [constructData[i][0], constructData[i][1], widthofBarStartingPoint, widthOfBar, heightofBarStartingPoint, heightOfBar];

		//Calculating the XY for the labels
		var labelX = widthofBarStartingPoint + halfWidthOfBar;
		var labelY = canvas2.height - 17;

		//Create object and push
		var barObject = new barChartObject(constructData[i][0], constructData[i][1], widthofBarStartingPoint, heightofBarStartingPoint, widthOfBar, heightOfBar, colorPicker(), labelX, labelY);
		barChartObjects.push(barObject);

		//Getting the sum for the partition call
		barChartplotSum += constructData[i][0];
	}

	createPartitions(constructData, barChartplotSum);
}

function createBars(sourceArray)
{
	//Clear what was previously drawn
	drawc2.clearRect(0, 0, canvas2.width, canvas2.height);

	//Draw by referring to objects
	for (var i = 0; i < sourceArray.length; i += 1)
	{
		barChartObjects[i].draw();
	}
}

function constructSwap(v1, v2)
{	
	//Debug
	console.log("called constructSwap");

	//Init the variables
	val1 = v1;
	val2 = v2;

	//Retain colors before color change
	tempv1C = barChartObjects[val1].color;
	tempv2C = barChartObjects[val2].color;

	//Capture original height values for the curvature to return to
	origStartY = barChartObjects[start].y;
	origEndY = barChartObjects[end].y;

	//Change and draw color to signify the change
	barChartObjects[val1].color = "#DC143C";
	barChartObjects[val2].color = "#DC143C";

	barChartObjects[val1].draw();
	barChartObjects[val2].draw();

	//Difference of pixels between the bars on the x-axis
	dX = Math.abs(barChartObjects[val2].x - barChartObjects[val1].x);
	dXCounter = 0;

	//Determine which bar moves up the X-axis, and vice-versa
	if (barChartObjects[val1].x > barChartObjects[val2].x)
	{
		start = val2;
		end = val1;
	}
	else
	{
		start = val1;
		end = val2;
	}

	//Calculate midpoint of trajectory
	middX = barChartObjects[start].x + (dX / 2);

	//Translate
	translatedmiddX = (middX / barChartTranslateRatio);
	translateddX = (dX / 2) / barChartTranslateRatio;

	//Call the animation mechanism
	animateLoader(bounceFinished);
}


function animateLoader(bounceFinished)
{
	//Debug
	console.log("called animateLoader" + " " + bounceFinished);

	//Call the animation
	if (!bounceFinished)
	{
		//Debug
		console.log("calling animateBarChartSwap");

		setTimeout(function() {window.requestAnimationFrame(animateBarChartSwap);}, 10);
	}
	else
	{
		//Call the finishing animation move
		animationFinished();
	}
}


function animateBarChartSwap(timestamp)
{
	//Move variables at (dX / 30) speed
	barChartObjects[start].x += (dX / 30);
	barChartObjects[end].x -= (dX / 30);

	barChartObjects[start].lX += (dX / 30);
	barChartObjects[end].lX -= (dX / 30);

	//Translate
	translatedv1X = (barChartObjects[start].x / barChartTranslateRatio) - translatedmiddX;
	translatedv2X = (barChartObjects[end].x / barChartTranslateRatio) - translatedmiddX;

	//Apply the hyperbolic formula, reverse y-axis value as the canvas counts height from top to bottom
	var sY = -(-(Math.pow(translatedv1X, 2)) + Math.pow(translateddX, 2)) + origStartY;
	var eY = -(-(Math.pow(translatedv2X, 2)) + Math.pow(translateddX, 2)) + origEndY;

	//Labels to stay on a linear trajectory
	barChartObjects[start].y = sY;
	barChartObjects[end].y = eY;
	
	//Clear the canvas and render the board
	createBars(barChartObjects);

	//Make sure the movements are shown on top of the rendered bars
	barChartObjects[val1].draw();
	barChartObjects[val2].draw();

	//Increment the counter
	dXCounter += 1;

	if (dXCounter < 30) 
	{ 
		window.requestAnimationFrame(animateBarChartSwap); 
	}
	else
	{
		//Reset
		bounceFinished = true;

		translatedv1X = 0;
		translatedv2X = 0;
		translateddX = 0;
		translatedmiddX = 0;

		origStartY = 0;
		origEndY = 0;

		dXCounter = 0;

		//Continue
		setTimeout(function() {animateLoader(bounceFinished);}, 10);
	}
}


function animationFinished()
{	
	//Debug
	console.log("called now");

	//Change color back to old colors
	barChartObjects[val1].color = tempv1C;
	barChartObjects[val2].color = tempv2C;

	//Render with the correct colors, only insofar needed
	barChartObjects[val1].draw();
	barChartObjects[val2].draw();

	//Conduct an 'administrative swap'
	var objTemp = barChartObjects[val1];
	barChartObjects[val1] = barChartObjects[val2];
	barChartObjects[val2] = objTemp;

	bubbleSort(barChartObjects);
}


function maxOfArray()
{
	var max = 0;

	for (var i = 0; i < barChartplot.length; i += 1)
	{
		if (barChartplot[i][0] > max) {max = barChartplot[i][0];}
	}

	return max;
}

window.onload = init();




