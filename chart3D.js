
//Canvas objects
let canvas = document.getElementById("canvas1");

let draw = canvas.getContext('2d');


//Append to the right div
let div = document.getElementById("wrapperchild");

//Needed for matrix multiplication
var angleX = 20 / 180 * Math.PI;
var angleY = 0;
var angleZ = 0;

//Collection of objects
var objArray = [];

function initCanvas()
{
  //Size and width of the canvas
  canvas.width = 250;
  canvas.height = 250;

  canvas.style.left = 20;
  canvas.style.top = 60;
  canvas.style.position = "absolute";
  canvas.style.display = "grid";

}

var projectorMatrix = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
var rotateZMatrix = [];
var rotateYMatrix = [];
var rotateXMatrix = [];


class point
{
  constructor(x, y, z)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class triangle
{
  constructor(a, b, c)
  {
    this.p1 = a;
    this.p2 = b;
    this.p3 = c;
  }
}

class mesh
{
  constructor(a, b, c, d, e, f, g, h, i, j, k, l)
  {
      this.tris = [a, b, c, d, e, f, g, h, i, j, k, l];
  }
}

function init()
{
  initCanvas();
  constructScene();
}



function constructScene()
{
  buildCubeMesh();
  buildRectangleMesh();

  window.requestAnimationFrame(animateTris);
}

function buildRectangleMesh()
{
  var a = new point(-0.9, -0.7, -0.25);
  var a2 = new point(-0.9, -0.7, 0.25);

  var b = new point(-0.9, 0.7, -0.25);
  var b2 = new point(-0.9, 0.7, 0.25);

  var c = new point(-0.4, 0.7, -0.25);
  var c2 = new point(-0.4, 0.7, 0.25);

  var d = new point(-0.4, -0.7, -0.25);
  var d2 = new point(-0.4, -0.7, 0.25);

  //Front
  var fr1 = new triangle(a, b, c);
  var fr2 = new triangle(a, c, d);

  //Back
  var ba1 = new triangle(a2, b2, c2);
  var ba2 = new triangle(a2, c2, d2);

  //Up
  var up1 = new triangle(a, a2, d2);
  var up2 = new triangle(a, d2, d);

  //Down
  var do1 = new triangle(b, b2, c2);
  var do2 = new triangle(b, c2, c2);

  //Left side
  var le1 = new triangle(a, a2, b);
  var le2 = new triangle(b, b2, a2);

  //Right side
  var ri1 = new triangle(c, c2, d);
  var ri2 = new triangle(d, d2, c2);

  //Add
  var rectangleObj = new mesh(fr1, fr2, ba1, ba2, up1, up2, do1, do2, le1, le2, ri1, ri2);

  //Allocate space
  objArray.push(rectangleObj);


  var a = new point(-0.25, -0.5, -0.25);
  var a2 = new point(-0.25, -0.5, 0.25);

  var b = new point(-0.25, 0.7, -0.25);
  var b2 = new point(-0.25, 0.7, 0.25);

  var c = new point(0.25, 0.7, -0.25);
  var c2 = new point(0.25, 0.7, 0.25);

  var d = new point(0.25, -0.5, -0.25);
  var d2 = new point(0.25, -0.5, 0.25);

  //Front
  var fr1 = new triangle(a, b, c);
  var fr2 = new triangle(a, c, d);

  //Back
  var ba1 = new triangle(a2, b2, c2);
  var ba2 = new triangle(a2, c2, d2);

  //Up
  var up1 = new triangle(a, a2, d2);
  var up2 = new triangle(a, d2, d);

  //Down
  var do1 = new triangle(b, b2, c2);
  var do2 = new triangle(b, c2, c2);

  //Left side
  var le1 = new triangle(a, a2, b);
  var le2 = new triangle(b, b2, a2);

  //Right side
  var ri1 = new triangle(c, c2, d);
  var ri2 = new triangle(d, d2, c2);

  //Add
  var rectangleObj2 = new mesh(fr1, fr2, ba1, ba2, up1, up2, do1, do2, le1, le2, ri1, ri2);

  //Allocate space
  objArray.push(rectangleObj2);


  var a = new point(0.9, -0.3, -0.25);
  var a2 = new point(0.9, -0.3, 0.25);

  var b = new point(0.9, 0.7, -0.25);
  var b2 = new point(0.9, 0.7, 0.25);

  var c = new point(0.4, 0.7, -0.25);
  var c2 = new point(0.4, 0.7, 0.25);

  var d = new point(0.4, -0.3, -0.25);
  var d2 = new point(0.4, -0.3, 0.25);

  //Front
  var fr1 = new triangle(a, b, c);
  var fr2 = new triangle(a, c, d);

  //Back
  var ba1 = new triangle(a2, b2, c2);
  var ba2 = new triangle(a2, c2, d2);

  //Up
  var up1 = new triangle(a, a2, d2);
  var up2 = new triangle(a, d2, d);

  //Down
  var do1 = new triangle(b, b2, c2);
  var do2 = new triangle(b, c2, c2);

  //Left side
  var le1 = new triangle(a, a2, b);
  var le2 = new triangle(b, b2, a2);

  //Right side
  var ri1 = new triangle(c, c2, d);
  var ri2 = new triangle(d, d2, c2);

  //Add
  var rectangleObj = new mesh(fr1, fr2, ba1, ba2, up1, up2, do1, do2, le1, le2, ri1, ri2);

  //Allocate space
  objArray.push(rectangleObj);
}


function buildCubeMesh()
{
  var a = new point(-1, -1, -1);
  var a2 = new point(-1, -1, 1);

  var b = new point(-1, 1, -1);
  var b2 = new point(-1, 1, 1);

  var c = new point(1, 1, -1);
  var c2 = new point(1, 1, 1);

  var d = new point(1, -1, -1);
  var d2 = new point(1, -1, 1);

  //Front
  var fr1 = new triangle(a, b, c);
  var fr2 = new triangle(a, c, d);

  //Back
  var ba1 = new triangle(a2, b2, c2);
  var ba2 = new triangle(a2, c2, d2);

  //Up
  var up1 = new triangle(a, a2, d2);
  var up2 = new triangle(a, d2, d);

  //Down
  var do1 = new triangle(b, b2, c2);
  var do2 = new triangle(b, c2, c2);

  //Left side
  var le1 = new triangle(a, a2, b);
  var le2 = new triangle(b, b2, a2);

  //Right side
  var ri1 = new triangle(c, c2, d);
  var ri2 = new triangle(d, d2, c2);

  //Cube
  var cubeObj = new mesh(fr1, fr2, ba1, ba2, up1, up2, do1, do2, le1, le2, ri1, ri2);

  //Allocate space
  objArray.push(cubeObj);
}

var counter = 0;

function animateTris(timestamp)
{
  eraseTri();
  
  for (var i = 0; i < objArray.length; i += 1)
  {

    for (var j = 0; j < objArray[i].tris.length; j += 1)
    {
      //Apply rotations
      var translatedTri = rotateY(objArray[i].tris[j], 0.03);
      var translatedTri = rotateX(translatedTri, 0);

      //Project onto 2 dimensional plane
      projectTri(translatedTri);

      //Normalize to scale to width and height of canvas
      normalize(translatedTri);

      //Draw on the screen
      drawTri(translatedTri);
    }
  }

  window.requestAnimationFrame(animateTris);
}

function normalize(tri)
{
  normalizeFormula(tri.p1);
  normalizeFormula(tri.p2);
  normalizeFormula(tri.p3);
}


function normalizeFormula(p)
{
  p.x = (canvas.width / 2) * (p.x / 2) + (canvas.width / 2);
  p.y = (canvas.height / 2) * (p.y / 2) + (canvas.height / 2);
  p.z = (canvas.height) * (p.z / 2) + (canvas.height / 2);
}

function reverseNormalizeObj(mesh)
{
  var slope = (2 / maxMesh(mesh));
  for (var i = 0; i < mesh.tris.length; i += 1) { reversenNormalize(mesh.tris[i], slope); }
}

function maxMesh(mesh)
{
  var max = tri.p1.x;

  for (var i = 0; i < mesh.tris.length; i += 1)
  {
    if (mesh.tris[i].x > max) { max = mesh.tris[i].x; }
    if (mesh.tris[i].y > max) { max = mesh.tris[i].y; }
    if (mesh.tris[i].z > max) { max = mesh.tris[i].z; }
  }

  return max;
}

function reversenNormalize(tri, slope)
{
  reverseNormalizeFormula(tri.p1, slope);
  reverseNormalizeFormula(tri.p2, slope);
  reverseNormalizeFormula(tri.p3, slope);
}

function reverseNormalizeFormula(p, slope)
{
  p.x = (slope * p.x) - 1;
  p.y = (slope * p.y) - 1;
  p.z = (slope * p.z) - 1;
}


function rotateZ(tri, ang)
{
  angleZ = (ang / 180 * Math.PI);

  rotateZMatrix = [[Math.cos(angleZ), -Math.sin(angleZ), 0], [Math.sin(angleZ), Math.cos(angleZ), 0], [0, 0, 1]];

  tri.p1 = matrixMulti(rotateZMatrix, tri.p1);
  tri.p2 = matrixMulti(rotateZMatrix, tri.p2);
  tri.p3 = matrixMulti(rotateZMatrix, tri.p3);

  return tri;
}


function rotateY(tri, ang)
{
  var translatedTri = new triangle(tri.p1, tri.p2, tri.p3);

  angleY += (ang / 180 * Math.PI);

  rotateYMatrix = [[Math.cos(angleY), 0, Math.sin(angleY)], [0, 1, 0], [-Math.sin(angleY), 0, Math.cos(angleY)]];

  translatedTri.p1 = matrixMulti(rotateYMatrix, tri.p1);
  translatedTri.p2 = matrixMulti(rotateYMatrix, tri.p2);
  translatedTri.p3 = matrixMulti(rotateYMatrix, tri.p3);

  return translatedTri;
}

function rotateX(tri, ang)
{
  var translatedTri = new triangle(tri.p1, tri.p2, tri.p3);

  angleX += (ang / 180 * Math.PI);

  rotateXMatrix = [[1, 0, 0], [0, Math.cos(angleX), -Math.sin(angleX)], [0, Math.sin(angleX), Math.cos(angleX)]];

  translatedTri.p1 = matrixMulti(rotateXMatrix, tri.p1);
  translatedTri.p2 = matrixMulti(rotateXMatrix, tri.p2);
  translatedTri.p3 = matrixMulti(rotateXMatrix, tri.p3);

  return translatedTri; 
}

function projectTri(tri)
{
  tri.p1 = matrixMulti(projectorMatrix, tri.p1);
  tri.p2 = matrixMulti(projectorMatrix, tri.p2);
  tri.p3 = matrixMulti(projectorMatrix, tri.p3);
}

function matrixMulti(matrix, p)
{
  var duplicate = new point(p.x, p.y, p.z);

  duplicate.x = matrix[0][0] * p.x + matrix[0][1] * p.y + matrix[0][2] * p.z;
  duplicate.y = matrix[1][0] * p.x + matrix[1][1] * p.y + matrix[1][2] * p.z;
  duplicate.z = matrix[2][0] * p.x + matrix[2][1] * p.y + matrix[2][2] * p.z;

  return duplicate;
}

function drawTri(tri)
{
  draw.beginPath();

  draw.lineWidth = 0.7;

  draw.moveTo(tri.p1.x, tri.p1.y);
  draw.lineTo(tri.p2.x, tri.p2.y);
  draw.lineTo(tri.p3.x, tri.p3.y);
  draw.lineTo(tri.p1.x, tri.p1.y);

  draw.stroke();

  draw.closePath();
}

function printTri(tri)
{
  console.log("tri point 1: (x) " + tri.p1.x + " (y) " + tri.p1.y + " (z) " + tri.p1.z);
  console.log("tri point 2: (x) " + tri.p2.x + " (y) " + tri.p2.y + " (z) " + tri.p2.z);
  console.log("tri point 3: (x) " + tri.p3.x + " (y) " + tri.p3.y + " (z) " + tri.p3.z);
}

function eraseTri()
{
  draw.clearRect(0,0, canvas.width, canvas.height);
}

window.onload = init();