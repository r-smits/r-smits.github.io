// Some test data
var plotData = [
  ["row1", "IntroducedInHouse", "link"],
  ["row2", "PassedInSenate1", "link"],
  ["row3", "BecamePublicLaw", "link"],
  ["row4", "BecamePublicLaw", "link"],
  ["row5", "IntroducedInHouse", "link"],
  ["row4", "BecamePublicLaw", "link"]
];

// Variables called by multiple functions and I'm to lazy to properly implement
var dataContainer = [];
var counterArr = [];
var counterArrSum = 0;
var collectCat = [];
var cDem = 1;
var id = 0;

// Drawing init section
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext('2d');

// Sizing variables
canvas.width = window.innerWidth / 2 - 50;
canvas.height = window.innerHeight / 2 - 80;

var halfWidth = window.innerWidth / 2;

canvas.style.left = "50%";
canvas.style.top = "425px";
canvas.style.position = "absolute";

if (canvas.width < canvas.height)
{var radius = canvas.width / 2.2;}
else
{var radius = canvas.height / 2.2;}

let mpcX = canvas.width / 2;
let mpcY = canvas.height / 2;

function init()
{
  //loadData();
  getCategories();
  createPartitions(counterArr, counterArrSum);
}

/*

<input type="file" />



// THIS IS A SHITTY CSV PARSER
function loadData()
{
  const input = document.querySelector('input[type="file"]');

  input.style.top = "50%";
  input.position = "absolute";

  input.addEventListener('change', function(e)
  {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = function()
    {
      const lines = reader.result.split('\n').map(function(line)
      {
        if (line != "") {dataContainer.push(line.split(','));}
      })

      plotData = [];
      input.value = '';
      plotData = dataContainer;

      init();
    }
  }, false);
}

/*
function filefromWeb(){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function()
  {
    if (this.readystate == 4 && this.status == 200)
    {
      console.log(this.responseText);
    }
  };

  xhttp.open("GET", "Test1.csv", true);
  xhttp.send();

  var fs = require('fs');
  var rm = fs.readFileSync('readme.txt', 'utf8');
  console.log(rm);

  ctx.fillText(rm, ampX + 10, ampY + 5);
  ctx.stroke();
}
*/

// GAIN NUMBER OF CATEGORIES AND NUMBER CONTAINED
function getCategories()
{
  counterArr = [];
  counterArrSum = 0;

  var category = plotData[0][cDem];

  for (var i = 0; i < plotData.length; i += 1)
  {
    if (i == 0 || plotData[0][cDem] != plotData[i][cDem])
    {
      category = plotData[i][cDem];
      if (category != "undefined")
      {counterArr.push(gCiterate(category));}
    }
  }

  for (var x = 0; x < counterArr.length; x += 1)
  {
    console.log(counterArr[x]);
    counterArrSum = counterArrSum + counterArr[x][0];
  }
}

function gCiterate(strToFind)
{
  var counter = 0;

  for(var i = 0; i < plotData.length; i = i + 1)
  {
    if (plotData[i].includes(strToFind))
    {
      counter += 1;
      plotData[i] = "";
    }
  }

  return [counter, strToFind];
}

//CREATE PIE CHART FROM DATA GATHERED
function createPartitions(partitionData, partitionSum)
{

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var labelXY = [];
  labelXY = [];

  var startAngle = 0;
  var endAngle = 0;
  var halfAngle = 0;

  var ampX = 0;
  var ampY = 0;

  var prevX = 0;
  var prevy = 0;

  var mpcX2 = 0;
  var mpcY2 = 0;

  mpcX2 = mpcX + radius;
  mpcY2 = mpcY;

  for (var i = 0; i < partitionData.length; i = i + 1)
  {
    // Angle Calculations
    startAngle = endAngle;
    halfAngle = endAngle + (Math.PI * 2) * (0.5 * partitionData[i][0] / partitionSum);
    endAngle = endAngle + (Math.PI * 2) * (partitionData[i][0] / partitionSum);

    // Draw line segment 1 (start)
    ctx.beginPath();
    ctx.moveTo(mpcX, mpcY);
    ctx.lineTo(mpcX2, mpcY2);
    ctx.stroke();

    // Draw angle to extent necessary
    ctx.arc(mpcX, mpcY, radius, startAngle, endAngle, false);
    ctx.stroke();

    // Calculations for line segment
    mpcX2 = mpcX + Math.cos(endAngle) * radius;
    mpcY2 = mpcY + Math.sin(endAngle) * radius;

    // Draw line segment 1 (end)
    ctx.moveTo(mpcX, mpcY);
    ctx.lineTo(mpcX2, mpcY2);
    ctx.stroke();

    // Color the segment
    ctx.fillStyle = colorPicker(); // sequential
    ctx.fill();

    // Calculation for labels
    ampX = mpcX + Math.cos(halfAngle) * radius;
    ampY = mpcY + Math.sin(halfAngle) * radius;
    ampX = (mpcX + ampX) / 2;
    ampY = (mpcY + ampY) / 2;

    // Init for labels
    labelXY.push([ampX, ampY]);

    ctx.closePath();
  }

  placeLabels(partitionData, labelXY, ctx);
}

function colorPicker()
{

  // Dataguidance colors
  var colors = ["#17438A", "#a2b4d0", "#748eb9", "#4569a1", "#113268"];
  var colorCode = "";

  colorCode = colors[id];

  if (id < 4)
  {id = id + 1;}
  else
  {id = 0;}

  return colorCode;
}

function placeLabels(partitionData, XYArray, canvasPointer)
{
  //Debug
  console.log("labelcount triggered");

  var labelCount = 0;

  for(var i = 0; i < XYArray.length; i = i + 1)
  {
      canvasPointer.fillStyle = "#000000" // black
      canvasPointer.fillRect(XYArray[i][0], XYArray[i][1], 5, 5);
      var text = partitionData[i][1];
      console.log("Array[" + i + "][1]= " + partitionData[i][1]);
      canvasPointer.fillText(text, XYArray[i][0] + 10, XYArray[i][1] + 5);
  }

  XYArray = [];
}

function printArr(pArr)
{
  for (var i = 0; i < pArr.length; i += 1)
  {
    console.log(pArr[i]);
  }
}

window.onload = init();
