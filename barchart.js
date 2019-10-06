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
var swapOrder = [];
var orderIndex = -1;
var algoNo = 0;

//Objects for the animation cycle
var animationCycle = [];
var bounceFinished = false;
var dXCounter = 0;
var bounciness = 40;
var originalY = canvas2.height - 50;
var mergeSwitch = false;


//	INIT
function init()
{
	constructCanvas();
	scramble();
}

function constructCanvas()
{
	//Size and width of the canvas
	canvas2.width = window.innerWidth * 0.8;
	canvas2.height = 450;

	canvas2.style.left = "16%";
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
	for (var i = 0; i < 50; i += 1)
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
		var barObject = new barChartObject(barChartplot[i][0], barChartplot[i][1], widthofBarStartingPoint, heightofBarStartingPoint, widthOfBar, heightOfBar, colorPicker(), labelX, labelY);	
	}

	//Get the sum of barChartplot
	barChartplotSum = sumOfArray(barChartplot);
}


function createBars()
{
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
	originalY = barChartObjects[0].y;
	mergeSwitch = false;

	//swap
	if (orderIndex < order.length) 
	{ 
		//Initialise
		let source 					= order[orderIndex][0];
		let destination				= order[orderIndex][1];
		
		//Differentials
		let cycleNo					= (8 + 2 * (Math.abs(source - destination)));
		let dx 						= Math.abs(barChartObjects[destination].x - barChartObjects[source].x);
		let dxsourceinterval		= (barChartObjects[destination].x - barChartObjects[source].x) / cycleNo;
		let dxdestinationinterval	= (barChartObjects[source].x - barChartObjects[destination].x) / cycleNo;

		//Tranlate values for the purpose of the animation
		let translatedmiddx 		= (lowest(barChartObjects[source].x, barChartObjects[destination].x) + dx / 2) / bounciness;
		let translateddx 			= (dx / 2) / bounciness;

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

		animationCycle.push([source, destination, dxsourceinterval, translateddx, translatedmiddx, cycleNo]);
		animationCycle.push([destination, source, dxdestinationinterval, translateddx, translatedmiddx, cycleNo]);

		animateLoader(bounceFinished);
	}
	else
	{
		//Reset values
		orderIndex 			= -1;
		algoNo 				= 0;
	}
}



function orderedMerge(order)
{
	orderIndex += 1;
	originalY = barChartObjects[0].y;
	mergeSwitch = true;

	if (orderIndex < order.length)
	{
		//Initialise
		let overalSource	 	= order[orderIndex][0];
		let overalDestination	= order[orderIndex][1];

		let cycleNo				= (8 + 2 * (Math.abs(overalSource - overalDestination)));

		for (var i = overalDestination; i < overalSource; i += 1)
		{
			//Initialise
			source 					= i;
			destination				= i+1;

			//Differentials
			dx 						= Math.abs(barChartObjects[destination].x - barChartObjects[source].x);
			dxsourceinterval		= (barChartObjects[destination].x - barChartObjects[source].x) / cycleNo;

			//Tranlate values for the purpose of the animation
			translatedmiddx 		= (lowest(barChartObjects[destination].x, barChartObjects[source].x) + dx / 2) / bounciness;
			translateddx 			= (dx / 2) / bounciness;

			//Change the color to red
			barChartObjects[source].color 	= "#DC143C";
			barChartObjects[source].draw();

			//Push the variabels to an array
			animationCycle.push([source, destination, dxsourceinterval, translateddx, translatedmiddx, cycleNo]);
		}

		
		//Differentials
		dx 						= Math.abs(barChartObjects[overalDestination].x - barChartObjects[overalSource].x);
		dxsourceinterval		= (barChartObjects[overalDestination].x - barChartObjects[overalSource].x) / cycleNo;

		//Tranlate values for the purpose of the animation
		translateddx 			= (dx / 2) / bounciness;
		translatedmiddx 		= (lowest(barChartObjects[overalSource].x, barChartObjects[overalDestination].x) + dx / 2) / bounciness;

		//Change the color to red
		barChartObjects[overalSource].color 	= "#DC143C";
		barChartObjects[overalSource].draw();

		//Push the variabels to an array
		animationCycle.push([overalSource, overalDestination, dxsourceinterval, translateddx, translatedmiddx, cycleNo]);
		
		console.log("delivered order: ")
		console.log(order[orderIndex][0] + " " + order[orderIndex][1]);
		console.log("resulting animation cycle:")
		printArr(animationCycle);
		
		if (animationCycle.length > 0) { animateLoader(bounceFinished); } else { orderedMerge(order); }
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
	//	DEQUEUE
	for (var i = 0; i < animationCycle.length; i += 1)
	{
		let source 							= animationCycle[i][0];

		barChartObjects[source].x 			+= animationCycle[i][2];
		barChartObjects[source].lX 			+= animationCycle[i][2];

		let translatedx 					= (barChartObjects[source].x / bounciness) - animationCycle[i][4];
		barChartObjects[source].y			= -(-(Math.pow(translatedx, 2)) + Math.pow(animationCycle[i][3], 2)) + originalY;
	}
	
	//	RENDER
	createBars();
	for (var i = 0; i < animationCycle.length; i += 1)
	{
		let source = animationCycle[i][0];
		barChartObjects[source].draw();
	}
	
	//	CONDITIONAL CONTINUE
	dXCounter += 1;

	if (dXCounter < animationCycle[0][5])
	{ window.requestAnimationFrame(animateBarChartSwap); }
	else
	{
		//Reset
		animationCycle = [];
		dXCounter 		= 0;
		bounceFinished = true;

		//Continue
		setTimeout(function() { animateLoader(bounceFinished); }, 10);
	}
}

function animationFinished()
{	
	//Debug
	console.log("called animationFinished");

	//Indicate a new animation can start
	bounceFinished = false;

	//Define the source and the destination
	let source 			= swapOrder[orderIndex][0];
	let destination		= swapOrder[orderIndex][1];

	//Visualise pivot if present
	if (swapOrder[0].length >= 3) 
	{
		var pivot = swapOrder[orderIndex][2];
		barChartObjects[pivot].revertColor();
		barChartObjects[pivot].erase();
		barChartObjects[pivot].draw();
	}

	if (mergeSwitch) 
	{
		//Change color back to old colors
		for (var i = destination; i <= source; i += 1)
		{
			barChartObjects[i].revertColor();
			barChartObjects[i].erase();
			barChartObjects[i].draw();
		}

		//Conduct an 'administrative swap' and callback
		merge(barChartObjects, source, destination);
		orderedMerge(swapOrder); 
	} 
	else 
	{ 
		//Change color back to old colors
		barChartObjects[source].revertColor();
		barChartObjects[destination].revertColor();

		//Render with the correct colors, only insofar needed
		barChartObjects[source].erase();
		barChartObjects[destination].erase();

		barChartObjects[source].draw();
		barChartObjects[destination].draw();

		//Conduct an 'administrative swap' and callback
		swap(barChartObjects, source, destination);
		orderedSwap(swapOrder); 
	}
}


//	ALGO
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

function insertionSort(data)
{
	//Init
	swapOrder = [];
	openIndex = -1;

	for (var swapIndex = 1; swapIndex < data.length; swapIndex += 1)
	{
		var minIndex = swapIndex;

		while (minIndex > 0 && data[minIndex-1][0] >= data[minIndex][0])
		{
			swapOrder.push([minIndex-1, minIndex]);
			swap(data, minIndex, minIndex-1);
			minIndex -= 1;
		}
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Insertionsort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the process
	orderedSwap(swapOrder);
}

//Gnome sort
function gnomeSort(data)
{
	swapOrder = [];
	openIndex = -1;

	var pos = 0;

	while (pos < data.length)
	{

		if (pos == 0 || data[pos][0] >= data[pos-1][0])
		{
			pos += 1;
		}
		else
		{
			swapOrder.push([pos, pos-1]);
			swap(data, pos, pos-1);
			pos -= 1;
		}
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Gnomesort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise the process
	orderedSwap(swapOrder);
}

//Function select
function selectionSort(data)
{
	//Init
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

function shellSort(data)
{
	//Init
	swapOrder = [];
	openIndex = -1;

	var gaps = [701, 301, 132, 57, 23, 10, 4, 1];

	for (var g = 0; g < gaps.length; g += 1)
	{
		var gap = gaps[g];

		for (var check = gap; check < data.length; check += 1)
		{

			var temp = data[check][0];

			for (var index = check; index >= gap && data[index - gap][0] > temp; index -= gap)
			{

				swapOrder.push([index, index-gap]);
				swap(data, index, index-gap);
			}
		}
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "Shell sort"]);
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

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "MergeSort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//Visualise
	orderedMerge(swapOrder);
}


function mergeSort(data, lb, ub)
{
	//Create pivot
	var pivotIndex = Math.floor((lb + ub) / 2);

	if (lb < ub)
	{
		mergeSort(data, lb, pivotIndex);
		mergeSort(data, pivotIndex + 1, ub);

		mergeSortMerge(data, lb, pivotIndex, ub);
	}
}

function mergeSortMerge(data, l, m, h)
{
	var low = l;
	var high = m + 1;
	var limit = h;

	//Main
	while (low <= limit && high <= limit)
	{
		if (data[low][0] >= data[high][0])
		{	
			//Visual aid/
			if (low != high) 
			{
				//Log
				swapOrder.push([high, low]);

				//Re-arrange
				merge(data, high, low);
			}

			low += 1;
			high += 1;
		} 
		else if (data[low][0] < data[high][0]) { low += 1; }
	}
}


//Heapsort
function heapSort(data)
{
	swapOrder = [];
	algoNo = 6;

	var n = data.length-1;
	maxHeap(data, n);

	for (var i = data.length-1; i >= 0; i -= 1)
	{
		swapOrder.push([0, i]);
		swap(data, 0, i);

		n -= 1;

		heapify(data, 0, n);
	}

	//Add piechart data
	barChartplotSumArray.push([swapOrder.length, "HeapSort"]);
	createPartitions(barChartplotSumArray, sumOfArray(barChartplotSumArray));

	//
	printArr(swapOrder);

	//Visualise
	orderedSwap(swapOrder);
}

function maxHeap(data, n)
{
	for (var i = Math.floor((data.length-1) / 2); i >= 0; i -= 1)
	{
		heapify(data, i, n);
	}
}

function heapify(data, i, n)
{
	var leftchild = i * 2 + 1;
	var rightchild = i * 2 + 2;

	var max = i;

	if (leftchild <= n && data[leftchild][0] > data[i][0]) { max = leftchild; 
	}

	if (rightchild <= n && data[rightchild][0] > data[max][0]) { max = rightchild; }

	if (max != i)
	{
		swapOrder.push([i, max]);
		swap(data, i, max);
		heapify(data, max, n);
	}
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

function minOfArray(arr)
{
	var min = arr[0][0];

	for (var i = 0; i < arr.length; i += 1)
	{
		if (arr[i][0] < min) { min = arr[i][0]; }
	}

	return min;
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
	var temp = arr[source];
	arr.splice(source, 1);
	arr.splice(destination, 0, temp);
}


//	START
window.onload = init();