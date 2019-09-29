//Contains the barchart class objects, only used for bubble sort
var barChartIterateVars = [0, 0];

//Piechart data collection points
var barChartplotSumArray = [];
var barChartplotSwapCounter = 0;
var barChartplotSum = 0;


//	GLOBAL VARIABLES

//Canvas objects
let canvas2 = document.getElementById("canvas2");
let drawc2 = canvas2.getContext('2d');

//Objects that populate the barchart
var barChartplot = [];
var resetPlot = [];
var barChartObjects = [];

//These are the objects that help the orderedSwap function work
var barChartQuickSort = [];
var barChartSelectionSort = [];
var barChartgnomeSort = [];
var barChartMergeSort = [];

var swapOrder = [];
var orderIndex = -1;
var algoNo = 0;

//Objects for the animation cycle
var bounceFinished = false;
var dXCounter = 0;

var source = 0;
var destination = 0;
var bounciness = 40;

var dx = 0;
var middx = 0;
var dxsourceinterval = 0;
var dxdestinationinterval = 0;
var originalY = 0;

var translatedx = 0;
var translatedmiddx = 0;


//	INIT
function init()
{
	constructCanvas();
	scramble();
}

function constructCanvas()
{
	//Size and width of the canvas
	canvas2.width = window.innerWidth - 50;
	canvas2.height = 400;

	canvas2.style.left = "0%";
	canvas2.style.top = "0%";
	canvas2.style.position = "absolute";
}

//Scrambles and populates the empty barchart arrays
function scramble()
{
	barChartplot = [];
	barChartObjects = [];
	barChartplotSumArray = [];
	orderIndex = -1;

	//Iterate and give random numbers to barChartplot
	for (var i = 0; i < 40; i += 1)
	{
		var randomNumber = Math.floor(Math.random() * 100);
		var category = i+1; 
		barChartplot.push([randomNumber, category]);
	}

	//Put random values
	resetPlot = [];
	resetPlot = Array.from(barChartplot);

	//Render the changes
	constructBarChart(barChartplot);
	createBars(barChartplot);
}

//Resets current array to unsorted state
function resetBarChartplot()
{
	//Debug
	console.log("called resetBarChartPlot");

	//Reset algo values
	barChartObjects = [];
	barChartQuickSort = [];
	orderIndex = -1;

	//Reset plots
	barChartplot = [];
	barChartplot = Array.from(resetPlot);

	//Draw the new data on the canvas
	constructBarChart(barChartplot);
	createBars(barChartplot);
}


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
		this.originalColor = color;

		//Label coordinates
		this.lX = lX;
		this.lY = lY;

		//Array init
		barChartObjects.push(this);
	}

	draw()
	{
		//Begin drawing
		drawc2.beginPath();

		//Set width
		drawc2.lineWidth = 2;

		//Draw the rectangle
		drawc2.rect(this.x, this.y, this.width, this.height);
		drawc2.stroke();

		//Fill the drawn area
		drawc2.fillStyle = this.color;
		drawc2.fill();

		//Label
		drawc2.fillStyle = "#000000" // black
	  	drawc2.fillText(this.name, this.lX, this.lY);

		//Stop drawing
		drawc2.closePath();
	}

	erase() { drawc2.clearRect(this.x-2, canvas2.height, this.width+4, -canvas2.height); }
	revertColor() { this.color = this.originalColor; }
}


function constructBarChart()
{
	//Calculate width of the bar
	var widthOfBar = (canvas2.width / barChartplot.length);
	var widthOfBar = widthOfBar * 0.8;

	//Halfwidth for label coordinates
	var halfWidthOfBar = widthOfBar * 0.3;

	for (var i = 0; i < barChartplot.length; i += 1)
	{
		//Calculate height of the bar
		var heightOfBar = (canvas2.height - 70) / maxOfArray(barChartplot);
		heightOfBar = (-heightOfBar * barChartplot[i][0]);

		//Add the starting point for the width and height
		var heightofBarStartingPoint = canvas2.height - 50;
		var widthofBarStartingPoint = (widthOfBar * i) + (widthOfBar * 0.2 * i) + 30;

		//Calculating the XY for the labels
		var labelX = widthofBarStartingPoint + halfWidthOfBar;
		var labelY = canvas2.height - 30;

		//Create class object
		var barObject = new barChartObject(
													barChartplot[i][0], 
													barChartplot[i][1], 
													widthofBarStartingPoint, 
													heightofBarStartingPoint, 
													widthOfBar, 
													heightOfBar, 
													colorPicker(), 
													labelX, 
													labelY
											);	
	}

	//Get the sum of barChartplot
	barChartplotSum = sumOfArray(barChartplot);
}

function createBars()
{
	let canvas2 = document.getElementById("canvas2");
	let drawc2 = canvas2.getContext('2d');

	//Clear what was previously drawn
	drawc2.clearRect(0, 0, canvas2.width, canvas2.height);

	//Draw by referring to objects
	for (var i = 0; i < barChartObjects.length; i += 1)
	{
		barChartObjects[i].draw();
	}	
}


//Swap visualiser
function orderedSwap(order)
{
	orderIndex += 1;
	bounceFinished = false;

	//swap
	if (orderIndex < order.length) 
	{ 
		//Initialise
		source 					= order[orderIndex][0];
		destination				= order[orderIndex][1];
		dXCounter 				= 0;
		bounciness				= 40;
		originalY 				= barChartObjects[source].y;

		//Differentials
		dx 						= Math.abs(barChartObjects[destination].x - barChartObjects[source].x);
		middx 					= lowest(barChartObjects[source].x, barChartObjects[destination].x) + Math.abs(dx / 2);
		dxsourceinterval		= (barChartObjects[destination].x - barChartObjects[source].x) / (12 + 2 * (Math.abs(source - destination)));
		dxdestinationinterval	= (barChartObjects[source].x - barChartObjects[destination].x) / (12 + 2 * (Math.abs(source - destination)));

		//Tranlate values for the purpose of the animation
		translateddx 			= (dx / 2) / 40;
		translatedmiddx 		= middx / 40;

		//console.log(dx, middx, dxsourceinterval, dxdestinationinterval, originalY, translateddx, translatedmiddx);

		//Change the color to red
		barChartObjects[source].color 	= "#DC143C";
		barChartObjects[destination].color 	= "#DC143C";

		//Pivot to green if available
		if (swapOrder[0].length >= 3) 
		{
			printArr(swapOrder);
			var pivot = order[orderIndex][2];
			barChartObjects[pivot].color = "#00ff00";
			barChartObjects[pivot].draw();
		}

		barChartObjects[source].draw();
		barChartObjects[destination].draw();

		animateLoader(bounceFinished);
	}
	else
	{
		//Reset values
		orderIndex 			= -1;
		algoNo 				= 0;
	}
}


function animateLoader(bounceFinished)
{
	//Debug
	console.log("called animateLoader" + " " + bounceFinished);

	//Call the animation
	if (!bounceFinished) {setTimeout(function() {window.requestAnimationFrame(animateBarChartSwap);}, 20);}
	else
	{ animationFinished(); }
}


function animateBarChartSwap(timestamp)
{
	barChartObjects[source].x += dxsourceinterval;
	barChartObjects[destination].x += dxdestinationinterval;

	let translatedxs = (barChartObjects[source].x / bounciness) - translatedmiddx;
	let translatedxd = (barChartObjects[destination].x / bounciness) - translatedmiddx;

	let ys = -(-(Math.pow(translatedxs, 2)) + Math.pow(translateddx, 2)) + originalY;
	let yd = -(-(Math.pow(translatedxd, 2)) + Math.pow(translateddx, 2)) + originalY;

	barChartObjects[source].y = ys;
	barChartObjects[destination].y = yd;

	barChartObjects[source].lX += dxsourceinterval;
	barChartObjects[destination].lX += dxdestinationinterval;

	//Clear the canvas and render the board
	createBars();
	
	//Render update
	barChartObjects[source].draw();
	barChartObjects[destination].draw();
	
	
	//Increment the counter
	dXCounter += 1;

	if (dXCounter < (12 + 2 * (Math.abs(source - destination))))
	{ window.requestAnimationFrame(animateBarChartSwap); }
	else
	{
		//Reset
		bounceFinished = true;

		//Continue
		setTimeout(function() { animateLoader(bounceFinished); }, 10);
	}
}


function animationFinished()
{	
	//Debug
	console.log("called animationFinished");

	//Define the source and the destination
	let source 			= swapOrder[orderIndex][0];
	let destination		= swapOrder[orderIndex][1];

	//Change color back to old colors
	barChartObjects[source].revertColor();
	barChartObjects[destination].revertColor();

	//Visualise pivot if present
	if (swapOrder[0].length >= 3) 
	{
		var pivot = swapOrder[orderIndex][2];
		barChartObjects[pivot].revertColor();
		barChartObjects[pivot].draw();
	}

	//Render with the correct colors, only insofar needed
	barChartObjects[source].draw();
	barChartObjects[destination].draw();

	//Conduct an 'administrative swap'
	swap(barChartObjects, source, destination);

	//Callback to correct algorithm
	orderedSwap(swapOrder);
}


//	ALGORITHMS

function bubbleSort(data)
{

	swapOrder = [];

	for (var i = 0; i < data.length; i += 1)
	{
		for (var j = i; j < data.length; j += 1)
		{
			if (data[i][0] > data[j][0])
			{
				swap(data, i, j);
				swapOrder.push([i, j]);
			}
		}
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Bubblesort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the sort
	orderedSwap(swapOrder);

}

//Function select
function selectionSort(data)
{
	//Init
	algoNo = 2;
	swapOrder = [];
	openIndex = -1;

	var swapIndex = 0;
	var minIndex = 0;

	//Loop
	for (var i = 0; i < data.length; i += 1)
	{
		var min = data[i][0];

		for (var j = i; j < data.length; j += 1)
		{
			if (data[j][0] <= min) { min = data[j][0]; minIndex = j; }
		}

		//Swap
		swap(data, swapIndex, minIndex);

        //Order swap
		swapOrder.push([swapIndex, minIndex]);
		swapIndex += 1;
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Selectionsort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the process
	orderedSwap(swapOrder);
}

//Gnome sort
function gnomeSort(data)
{
	algoNo = 4;
	swapOrder = [];
	openIndex = -1;

	for (var i = 1; i < data.length; i += 1)
	{
		var x = i;

		while (x > 0 && data[x-1][0] > data[x][0])
		{
			//Create blueprint
			swapOrder.push([x-1, x]);

			//Swap
			var temp = data[x-1];
        	data[x-1] = data[x];
        	data[x] = temp;

        	//Iterate over vars
        	x -= 1;
		}
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Gnomesort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the process
	orderedSwap(swapOrder);
}

//QuickSort algorithm
function traditionalQuickSortExecutor(data)
{
	//Init
	algoNo = 3;
	swapOrder = [];
	openIndex = -1;

	//Sort the array
	traditionalQuickSort(0, data.length-1, data);

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Quicksort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the process
	orderedSwap(swapOrder);
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
            
        if (lb >= ub) {return ub;}

        swapOrder.push([lb, ub, i]);
        var temp = data[lb];
        data[lb] = data[ub];
        data[ub] = temp;
            
        ub -= 1;
        lb += 1;
    }
}




function mergeSortExecutor(data)
{
	//Init
	swapOrder = [];
	algoNo = 5;

	//Start algorithm
	mergeSort(data, 0, data.length-1);

	//Visualise
	orderedSwap(swapOrder);
}


function mergeSort(data, lb, ub)
{
	//Creation of helper array
	//var helper = Array.from(data);

	//Create pivot
	var pivotIndex = Math.floor((lb + ub) / 2);
	console.log(lb + " + ((" + ub + " - " + lb + ")" + " / " + "2" + " )) = " + pivotIndex);
	console.log("new mergeSort call: " + lb + " " + pivotIndex + " " + ub);

	if (lb < ub)
	{
		mergeSort(data, lb, pivotIndex);
		mergeSort(data, pivotIndex + 1, ub);

		console.log("mergesort execution: " + lb + " " + ub);
		mergeSortMerge(data, lb, pivotIndex, ub);
	}
	else
	{
		console.log("the algorithm does not comply");
	}

	

}

function mergeSortMerge(data, lb, middle, ub)
{
	var low = lb;
	var midpoint = middle;
	var high = ub;

	middle += 1;

	console.log("low: ", low, "middle: ", middle, "high: ", high);

	//Main
	while (low <= middle && middle <= high)
	{
		if (data[low][0] > data[middle][0])
		{	
			//Visual aid
			swapOrder.push([low, middle, ub + 1]);
			console.log("low: ", data[low][0], "middle: ", data[middle][0]);
			console.log("The swap we got from this: " + low + " " + middle);

			//Re-arrange
			var temp = data[middle];
			data.splice(middle, 1);
			data.splice(low, 0, temp);

			printArr(data);
			
			low += 1;
		}
		else
		{
			console.log("low: ", data[low][0], "middle: ", data[middle][0]);
			middle += 1;
		}
	}

	/*
	//In case of inequalities
	while (low < midpoint)
	{
		//Re-arrange
		var temp = data[low];
		data.splice(low, 1);
		data.splice(high+1, 0, temp);
		console.log("still values in lower half, moved to end: " + low, high);

		low += 1;
	}

	while (middle <= high)
	{
		//Re-arrange
		var temp = data[middle];
		data.splice(middle, 1);
		data.splice(high+1, 0, middle);
		console.log("still values in lower half, moved to end: " + middle, high);

		middle += 1;
	}
	*/



	console.log("finished executing mergesort" + low, middle, high);
}


//	HELPER FUNCTIONS
function maxOfArray(arr)
{
	var max = 0;

	for (var i = 0; i < arr.length; i += 1)
	{
		if (arr[i][0] > max) { max = arr[i][0]; }
	}

	return max;
}

function sumOfArray(arr)
{
	var sum = 0;

	for (var i = 0; i < arr.length; i += 1)
	{
		sum += arr[i][0];
	}

	return sum;
}

function lowest(value1, value2)
{
	if (value1 < value2) { return value1; }
	return value2;
}

function swap(arr, source, destination)
{
	var temp = arr[destination];
	arr[destination] = arr[source];
	arr[source] = temp;
}

function merge(arr, source, destination)
{
	var temp = data[source];
	data.splice(source, 1);
	data.splice(destination, 0, temp);
}


//	START
window.onload = init();