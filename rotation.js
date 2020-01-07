
//Object
var transparency = 1;
var object = [];

function received(x, y, z) {
  preRotation(-90, 0, 23);
  beginRotation(x, y, z);
}

function preRotation(x, y, z) {
    initAxis(x, y, z);
    object.rotate();
}

function beginRotation(x, y, z) {
    initAxis(x, y, z);
    requestFrame();
}

function initAxis(dx, dy, dz) {
    object.dx = toRadians(dx);
    object.dy = toRadians(dy);
    object.dz = toRadians(dz);
}

function adjustAxis(dx, dy, dz) {
    object.dx = dx;
    object.dy = dy;
    object.dz = dz;
}

function requestFrame() { object.animate = true; window.requestAnimationFrame(animation); }

function toRadians(input) { return input / 180 * Math.PI; }

function animation() {
    object.rotate(); 
    object.resize();
    object.erase();
    object.draw();
}

object.rotate = function() {

    this.pitch = this.wrapAngle(this.pitch + this.dy);
    this.yaw = this.wrapAngle(this.yaw + this.dz); 
    this.roll = this.wrapAngle(this.roll + this.dx);

    this.su = Math.sin(this.roll);
    this.cu = Math.cos(this.roll);
    this.sv = Math.sin(this.pitch);
    this.cv = Math.cos(this.pitch);
    this.sw = Math.sin(this.yaw);
    this.cw = Math.cos(this.yaw);

    let cuXsv = this.cu * this.sv;
    let suXsv = this.su * this.sv;
          
    this.r11 = this.cv * this.cw;
    this.r12 = suXsv * this.cw - this.cu * this.sw;
    this.r13 = this.su * this.sw + cuXsv * this.cw;

    this.r21 = this.cv * this.sw;
    this.r22 = this.cu * this.cw + suXsv * this.sw;
    this.r23 = cuXsv * this.sw - this.su * this.cw;

    this.r31 = -this.sv;
    this.r32 = this.su * this.cv;
    this.r33 = this.cu * this.cv;

    for (var i = 0, n = this.coordinates.length; i < n; i ++) {
        this.translate[i].length = 0;
        for (var ii = 0, m = this.coordinates[i].length; ii < m; ii ++) {

            let px = this.coordinates[i][ii][0];
            let py = this.coordinates[i][ii][1];
            let pz = this.coordinates[i][ii][2];

            let pxx = this.r11 * px + this.r12 * py + this.r13 * pz;
            let pyy = this.r21 * px + this.r22 * py + this.r23 * pz;
            let pzz = this.r31 * px + this.r32 * py + this.r33 * pz;

            if (transparency && pzz < 0) continue;
            this.translate[i][this.translate[i].length] = [pxx, pyy, pzz];
}}}

object.resize = function() {
    for (var i = 0, n = this.translate.length; i < n; i ++) {
      for (var ii = 0, m = this.translate[i].length; ii < m; ii ++) {
        this.translate[i][ii] = [ ~~(halfCanvas * (this.translate[i][ii][0] + 1)), ~~(halfCanvas * (this.translate[i][ii][1] + 1)), this.translate[i][ii][2] ]; 
}}}

object.wrapAngle = function(angle) {

    angle = angle % twoPI;
    return (angle > pi) ? angle -= twoPI : angle;
}

object.erase = function() { context.clearRect(0,0, canvas.width, canvas.height); }

object.draw = function() {

    context.beginPath();
    for (var i = 0, n = this.translate.length; i < n; i ++) {
        if (this.translate[i][0]) context.moveTo(this.translate[i][0][0], this.translate[i][0][1])
        for (var ii = 0, m = this.translate[i].length; ii < m; ii ++) {
          context.lineTo(this.translate[i][ii][0], this.translate[i][ii][1]);
    }}

    context.stroke();
    context.closePath();

    (object.animate) ? window.requestAnimationFrame(animation) : fillSelection(object.selected);
}