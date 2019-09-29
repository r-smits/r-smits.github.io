//canvas properties
let c1 = document.getElementById("canvas1");
let drawc1 = c1.getContext('2d');

//Size and width of the canvas
c1.width = 200;
c1.height = 90;

//canvas properties
let c2 = document.getElementById("canvas2");
let drawc2 = c2.getContext('2d');

//Size and width of the canvas
c2.width = 200;
c2.height = 90;

c1.style.left = "0%";
c1.style.top = "0%";

//Append to the right div
let div = document.getElementById("wrapperchild");

var cube1;
var cube2;

var theta = 0;


var rotationMatrix =  [
                        [Math.cos(theta / 180 * Math.PI), -Math.sin(theta / 180 * Math.PI),0],
                        [Math.sin(theta / 180 * Math.PI), Math.cos(theta / 180 * Math.PI),0],
                        [0,0,1]
                      ];


var projectionMatrix =  [
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1]
                        ];


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
  constructor(point1, point2, point3)
  {
    this.points = [point1, point2, point3];
  }

  draw()
  {
    //Begin drawing
    drawc2.beginPath();

    //Draw the rectangle
    drawc2.moveTo(this.points[0].x, this.points[0].y);

    drawc2.lineTo(this.points[1].x, this.points[1].y);
    drawc2.lineTo(this.points[2].x, this.points[2].y);
    drawc2.lineTo(this.points[0].x, this.points[0].y);

    //Stroke
    drawc2.stroke();

    //Close
    drawc2.closePath();
  }

  erase() { drawc2.clearRect(0, 0, c2.width, c2.height); }
}


function matrixMultiply(tri, matrix)
{
  var np1 = new point(0, 0, 0);
  var np2 = new point(0, 0, 0);
  var np3 = new point(0, 0, 0);

  var resultTriangle = new triangle(np1, np2, np3);

  console.log("points: " + " " + resultTriangle.points[0].x + " " + resultTriangle.points[0].y + " " + resultTriangle.points[0].z);
  console.log("points: " + " " + resultTriangle.points[1].x + " " + resultTriangle.points[1].y + " " + resultTriangle.points[1].z);
  console.log("points: " + " " + resultTriangle.points[2].x + " " + resultTriangle.points[2].y + " " + resultTriangle.points[2].z);

  console.log("tri: " + tri.points[0].x);

  resultTriangle.points[0].x = ( tri.points[0].x * rotationMatrix[0][0] ) + ( tri.points[0].y * rotationMatrix[0][1] ) + ( tri.points[0].z * rotationMatrix[0][2] );
  resultTriangle.points[0].y = ( tri.points[0].x * rotationMatrix[1][0] ) + ( tri.points[0].y * rotationMatrix[1][1] ) + ( tri.points[0].z * rotationMatrix[1][2] );
  resultTriangle.points[0].z = ( tri.points[0].x * rotationMatrix[2][0] ) + ( tri.points[0].y * rotationMatrix[2][1] ) + ( tri.points[0].z * rotationMatrix[2][2] );
  
  resultTriangle.points[1].x = ( tri.points[1].x * rotationMatrix[0][0] ) + ( tri.points[1].y * rotationMatrix[0][1] ) + ( tri.points[1].z * rotationMatrix[0][2] );
  resultTriangle.points[1].y = ( tri.points[1].x * rotationMatrix[1][0] ) + ( tri.points[1].y * rotationMatrix[1][1] ) + ( tri.points[1].z * rotationMatrix[1][2] );
  resultTriangle.points[1].z = ( tri.points[1].x * rotationMatrix[2][0] ) + ( tri.points[1].y * rotationMatrix[2][1] ) + ( tri.points[1].z * rotationMatrix[2][2] );
  
  console.log("passed");

  resultTriangle.points[2].x = ( tri.points[2].x * rotationMatrix[0][0] ) + ( tri.points[2].y * rotationMatrix[0][1] ) + ( tri.points[2].z * rotationMatrix[0][2] );
  resultTriangle.points[2].y = ( tri.points[2].x * rotationMatrix[1][0] ) + ( tri.points[2].y * rotationMatrix[1][1] ) + ( tri.points[2].z * rotationMatrix[1][2] );
  resultTriangle.points[2].z = ( tri.points[2].x * rotationMatrix[2][0] ) + ( tri.points[2].y * rotationMatrix[2][1] ) + ( tri.points[2].z * rotationMatrix[2][2] );


  console.log("points: " + " " + resultTriangle.points[0].x + " " + resultTriangle.points[0].y + " " + resultTriangle.points[0].z);
  console.log("points: " + " " + resultTriangle.points[1].x + " " + resultTriangle.points[1].y + " " + resultTriangle.points[1].z);
  console.log("points: " + " " + resultTriangle.points[2].x + " " + resultTriangle.points[2].y + " " + resultTriangle.points[2].z);

  console.log("success");
}









class cube
{
  constructor(length, color)
  {
    this.width = length;
    this.height = length;

    this.halfwidth = length / 2;
    this.halfheight = length / 2;

    this.midpoint = [c1.width / 2, c1.height / 2];

    this.radius = Math.sqrt(Math.pow(this.halfwidth, 2) + Math.pow(this.halfheight, 2));

    this.points = [
                      [this.midpoint[0] + this.halfwidth, this.midpoint[1] + this.halfheight],
                      [this.midpoint[0] + this.halfwidth, this.midpoint[1] - this.halfheight],
                      [this.midpoint[0] - this.halfwidth, this.midpoint[1] - this.halfheight],
                      [this.midpoint[0] - this.halfwidth, this.midpoint[1] + this.halfheight]
                  ];

    this.radians = [
                      45  / 180 * Math.PI,
                      135 / 180 * Math.PI,
                      225 / 180 * Math.PI,
                      315 / 180 * Math.PI
                  ];

    this.color = color;
  }

  draw()
  {
    //Begin drawing
    drawc1.beginPath();

    //Draw the rectangle
    drawc1.moveTo(this.points[0][0], this.points[0][1]);
    drawc1.lineTo(this.points[1][0], this.points[1][1]);
    drawc1.lineTo(this.points[2][0], this.points[2][1]);
    drawc1.lineTo(this.points[3][0], this.points[3][1]);
    drawc1.lineTo(this.points[0][0], this.points[0][1]);

    //Stroke
    drawc1.stroke();

    //drawc1.fillStyle = this.color   // Greenish
    //drawc1.fill();

    drawc1.closePath();
  }

  erase() { drawc1.clearRect(0, 0, c1.width, c1.height); }

  rotate(angle)
  {
    //var
    var iterate = angle / 180 * Math.PI;

    console.log("iterate: " + iterate);

    //Iterate through points
    for (var i = 0; i < this.points.length; i += 1)
    {
      //Get radians of point
      this.radians[i] += iterate;
      var rad = this.radians[i];

      console.log("rad: " + rad * 180 / Math.PI);

      //Sin relates to X, Cos relates to Y (even though sin calculates opposite, cos relates to adjacent)
      var rx = Math.cos(rad) * this.radius + this.midpoint[0];
      var ry = Math.sin(rad) * this.radius + this.midpoint[1];

      //Save
      this.points[i][0] = rx;
      this.points[i][1] = ry;
    }
  }

  setmidpoint(x, y)
  {
    this.midpoint = [x, y];
  }

}

function init()
{
  square1 = new cube(40   , "#FFFFFF");
  square2 = new cube(40   , "#1ABC9C");

  p1 = new point(c2.width / 2 - 10, c2.height / 2 + 20, 0);
  p2 = new point(c2.width / 2 - 10, c2.height / 2 - 20, 0);
  p3 = new point(c2.width / 2 + 10, c2.height / 2 - 20, 0);

  triangle1 = new triangle(p1, p2, p3);

  console.log("points: " + " " + triangle1.points[0].x + " " + triangle1.points[0].y + " " + triangle1.points[0].z);
  console.log("points: " + " " + triangle1.points[1].x + " " + triangle1.points[1].y + " " + triangle1.points[1].z);
  console.log("points: " + " " + triangle1.points[2].x + " " + triangle1.points[2].y + " " + triangle1.points[2].z);


  triangle1.draw();

  theta += 100;

  matrixMultiply(triangle1, projectionMatrix);
  matrixMultiply(triangle1, rotationMatrix);
  

  triangle1.erase();

  triangle1.draw();

  return;

  square1.setmidpoint(c1.width / 2, c1.height / 2 + (0.35 * square1.width));
  square2.setmidpoint(c1.width / 2, c1.height / 2 - (0.35 * square2.width));


  window.requestAnimationFrame(animateCube);
}

function animateCube(timestamp)
{

  square1.rotate(1.5);
  square2.rotate(1.5);

  square2.erase();

  square1.draw();
  square2.draw();

  //Begin
  drawc1.beginPath();

  //Lines between squares
  drawc1.moveTo(square1.points[0][0], square1.points[0][1]);
  drawc1.lineTo(square2.points[0][0], square2.points[0][1]);

  drawc1.moveTo(square1.points[1][0], square1.points[1][1]);
  drawc1.lineTo(square2.points[1][0], square2.points[1][1]);

  drawc1.moveTo(square1.points[2][0], square1.points[2][1]);
  drawc1.lineTo(square2.points[2][0], square2.points[2][1]);


  drawc1.moveTo(square1.points[3][0], square1.points[3][1]);
  drawc1.lineTo(square2.points[3][0], square2.points[3][1]);

  //Stroke
  drawc1.stroke();
  
  //End
  drawc1.closePath();

  window.requestAnimationFrame(animateCube);
}


window.onload = init();