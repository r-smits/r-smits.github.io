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
var barChartQuickSort = [];
var barChartQuickSortIndex = -1;


var quickSortLBUB = [];
var LBUBcounter1 = 0;
var LBUBCounter2 = 0;

//Canvas object
let canvas2 = document.getElementById("canvas2");
let drawc2 = canvas2.getContext('2d');

//Size and width of the canvas
canvas2.width = window.innerWidth - 50;
canvas2.height = window.innerHeight / 2 - 25;

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
		barChartIterateVars[0] = 0;
		barChartIterateVars[1] = 0;

		algoNo = 0;

		return;
	}
	else
	{
		bubbleSort(data);
	}
}

/*
//Quicksort algorithm
function traditionalQuickSort(lb, ub, data)
{
	//Debug
	console.log("called quicksort");
	//Init
	algoNo = 2;

	if (lb < ub)
	{
		//First pick the pivot
		pInd = lb + ((ub - lb) / 2);
		pInd = Math.floor(pInd);
		console.log("index: " + pInd);
		p = data[pInd].value;

		//Store original lb value
		origlb = lb;
		origub = ub;
		quickSortLBUB.push([lb, ub]);

		traditionalQuickSortPartition(lb, ub, data);
	}
}

function traditionalQuickSortPartition(lb, ub, data)
{
	//Animation reset
	bounceFinished = false;

	//Then search for values to swap
	while (data[ub].value > p) {ub -= 1;}
    while (data[lb].value < p) {lb += 1;}
  

    if (lb >= ub) 
    {
    	traditionalQuickSortCallBack(ub, data);
    	return;
    }

    //Swap
    console.log("called for a swap");
    console.log("values: " + lb + " " + ub + " " + p);
    constructSwap(lb, ub);    
}

function traditionalQuickSortCallBack(pivot, data)
{
	console.log("called to branch out the binary tree");

	LBUBcounter1 += 1;
	console.log("values: " + quickSortLBUB[LBUBcounter1][0] + " " + quickSortLBUB[LBUBcounter1][1] + " " + p);
	traditionalQuickSort(quickSortLBUB[LBUBcounter1][0], pivot, data);
	console.log("called the second recursive function with values: " + pivot+1 + " " + origub);
	traditionalQuickSort(pivot+1, origub, data);
}
*/

function traditionalQuickSortExecutor(data)
{
	algoNo = 2;

	traditionalQuickSort(0, data.length-1, data);
	traditionalQuickSortSwap(barChartQuickSort);
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

function traditionalQuickSortSwap(order)
{

	barChartQuickSortIndex += 1;
	bounceFinished = false;

	//swap
	if (barChartQuickSortIndex < order.length) 
	{ 
		console.log(order[barChartQuickSortIndex][0] + ", " + order[barChartQuickSortIndex][1]);
		constructSwap(order[barChartQuickSortIndex][0], order[barChartQuickSortIndex][1]); 
	}
	else
	{
		barChartQuickSortIndex = -1;
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

	//Callback to correct algorithm
	if (algoNo == 1) {bubbleSort(barChartObjects);}
	if (algoNo == 2) {traditionalQuickSortSwap(barChartQuickSort);}
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




