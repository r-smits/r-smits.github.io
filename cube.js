//canvas properties
let c1 = document.getElementById("canvas1");
let drawc1 = c1.getContext('2d');

//Size and width of the canvas
c1.width = window.innerWidth - 50;
c1.height = 150;

c1.style.left = "0%";
c1.style.top = "0%";

var cube1;
var cube2;

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

    drawc1.fillStyle = this.color   // Greenish
    drawc1.fill();

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
}

function init()
{
  cube1 = new cube(40   , "#FFFFFF");
  cube2 = new cube(100  , "#1ABC9C");

  window.requestAnimationFrame(animateCube);
}

function animateCube(timestamp)
{

  cube1.rotate(-5);
  cube2.rotate(1);

  cube2.erase();
  cube2.draw();
  cube1.draw();

  

  window.requestAnimationFrame(animateCube);
}


window.onload = init();