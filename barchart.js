//imports

//Public variables
var barChartplot = [
	[10	, "1"],
	[9	, "2"],
	[8	, "3"],
	[7	, "4"],
	[6	, "5"],
	[6	, "6"],
	[4	, "7"],
	[3	, "8"],
	[2	, "9"],
	[1	, "10"],
	[27	, "11"],
	[4	, "12"],
	[2	, "13"],
	[1	, "14"],
	[5	, "15"],
	[4	, "16"],
	[2	, "17"],
	[1	, "18"],
	[30	, "19"],
	[4	, "20"],
	[2	, "21"],
	[1	, "22"],
	[9	, "23"],
	[4	, "24"],
	[8	, "25"],
	[14	, "26"],
	[2	, "27"],
	[9	, "28"],
	[27	, "29"],
	[30 , "30"]
];


var resetPlot = [
	[10	, "1"],
	[9	, "2"],
	[8	, "3"],
	[7	, "4"],
	[6	, "5"],
	[6	, "6"],
	[4	, "7"],
	[3	, "8"],
	[2	, "9"],
	[1	, "10"],
	[27	, "11"],
	[4	, "12"],
	[2	, "13"],
	[1	, "14"],
	[5	, "15"],
	[4	, "16"],
	[2	, "17"],
	[1	, "18"],
	[30	, "19"],
	[4	, "20"],
	[2	, "21"],
	[1	, "22"],
	[9	, "23"],
	[4	, "24"],
	[8	, "25"],
	[14	, "26"],
	[2	, "27"],
	[9	, "28"],
	[27	, "29"],
	[30 , "30"]
];


var barChartObjects = [];
var barChartIterateVars = [0, 0];
var barChartQuickSort = [];
var orderIndex = -1;


var quickSortLBUB = [];
var LBUBcounter1 = 0;
var LBUBCounter2 = 0;

//Canvas object
let canvas2 = document.getElementById("canvas2");
let drawc2 = canvas2.getContext('2d');

//Size and width of the canvas
canvas2.width = window.innerWidth - 50;
canvas2.height = 400;

canvas2.style.left = "0%";
canvas2.style.top = "0%";
canvas2.style.position = "absolute";

//Determine which algorithm is running
var algoNo = 0;
var p = 0;
var pInd = 0;

//Animation global variables
var val1 = 0;
var val2 = 0;

var start = 0;
var end = 0;

var dX = 0;
var middX = 0;

var tempv1C = "";
var tempv2C = "";
var tempPivotC = "";

//Translation for bounce
var barChartTranslateRatio = 30;

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
}

//Reset
function resetBarChartplot()
{
	//Debug
	console.log("called resetBarChartPlot");

	//Reset algo values
	barChartObjects = [];
	barChartQuickSort = [];
	orderIndex = -1;

	//Draw the new data on the canvas
	constructBarChart(barChartplot);
	createBars(barChartplot);

	//Reset plots
	barChartplot = resetPlot;
}


//Scramble
function scramble()
{
	barChartplot = [];
	barChartObjects = [];
	barChartQuickSort = [];
	orderIndex = -1;

	//Iterate and give random numbers
	for (var i = 0; i < 30; i += 1)
	{
		var randomNumber = Math.floor(Math.random() * 100);
		var category = i+1; 
		barChartplot.push([randomNumber, category]);
	}

	//Put random values
	resetPlot = barChartplot;

	//Render the changes
	constructBarChart(barChartplot);
	createBars(barChartplot);
}


//Bubble sort algorithm
function bubbleSort(data)
{
	//Init
	algoNo = 1;

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
		barChartIterateVars = [0, 0];

		return;
	}
	else
	{
		bubbleSort(data);
	}
}


//QuickSort algorithm
function traditionalQuickSortExecutor(data)
{
	algoNo = 2;
	barChartQuickSort = [];
	openIndex = -1;

	traditionalQuickSort(0, data.length-1, data);
	orderedSwap(barChartQuickSort);
}

function traditionalQuickSort(lb, ub, data)
{
	if (lb < ub)
	{

		var p = traditionalPivot(lb, ub, data);
    
    	traditionalQuickSort(lb, p, data);
    	traditionalQuickSort(p+1, ub, data);
	}
}

function traditionalPivot(lb, ub, data)
{

	var i = Math.floor(lb + ((ub - lb) / 2));
	console.log(i);
    var p = data[i][0];
        
    while (1)
    {
            
    	while (data[ub][0] > p)
        {
        	ub -= 1;
        }
            
        while (data[lb][0] < p)
        {
            lb += 1;
        }
            
        //This breaks the loop; once the lb goes beyond the ub
        if (lb >= ub) {return ub;}

        barChartQuickSort.push([lb, ub, data[lb][0], data[ub][0]]);
        var temp = data[lb];
        data[lb] = data[ub];
        data[ub] = temp;
            
        ub -= 1;
        lb += 1;
    }
}


function orderedSwap(order)
{
	orderIndex += 1;
	bounceFinished = false;

	//swap
	if (orderIndex < order.length) 
	{ 
		constructSwap(order[orderIndex][0], order[orderIndex][1]); 
	}
	else
	{
		orderIndex = -1;
	}
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
		var heightOfBar = (canvas2.height - 70) / maxOfArray();
		heightOfBar = (-heightOfBar * constructData[i][0]);

		//Add the starting point for the width and height
		var heightofBarStartingPoint = canvas2.height - 50;
		var widthofBarStartingPoint = (widthOfBar * i) + (widthOfBar * 0.6 * i) + 30;

		//Assign to barChartElement and create object
		constructData[i] = [constructData[i][0], constructData[i][1], widthofBarStartingPoint, widthOfBar, heightofBarStartingPoint, heightOfBar];

		//Calculating the XY for the labels
		var labelX = widthofBarStartingPoint + halfWidthOfBar;
		var labelY = canvas2.height - 30;

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
	console.log("values: " + barChartObjects[val1].value + " " + barChartObjects[val2].value);

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
	barChartObjects[start].x += (dX / (12 + 3 * (Math.abs(val1 - val2))));
	barChartObjects[end].x -= (dX / (12 + 3 * (Math.abs(val1 - val2))));

	barChartObjects[start].lX += (dX / (12 + 3 * (Math.abs(val1 - val2))));
	barChartObjects[end].lX -= (dX / (12 + 3 * (Math.abs(val1 - val2))));

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

	//Color
	barChartObjects[val1].draw();
	barChartObjects[val2].draw();

	//Increment the counter
	dXCounter += 1;

	if (dXCounter < (12 + 3 * (Math.abs(val1 - val2))))
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
		setTimeout(function() { animateLoader(bounceFinished); }, 10);
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

	//Callback to correct algorithm
	if (algoNo == 1) { bubbleSort(barChartObjects); }
	if (algoNo == 2) { orderedSwap(barChartQuickSort); }
}


function maxOfArray()
{
	var max = 0;

	for (var i = 0; i < barChartplot.length; i += 1)
	{
		if (barChartplot[i][0] > max) { max = barChartplot[i][0]; }
	}

	return max;
}

window.onload = init();




