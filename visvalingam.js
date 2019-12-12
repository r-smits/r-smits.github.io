var visvalingam = [];

//Visvalingam-Whyatt
function visvalingamwhyatt() {

  var data = [];

  data.set = function(projection) {

    this.binaryTree = [];
    this.linkedList = [];
    this.original = [];


    //Populate lists and create triangles
    for (var i = 0, n = projection.length; i < n; i ++) {
      for (var ii = 1, m = projection[i].length-1; ii < m; ii ++) {

        let tri = [ projection[i][ii - 1], projection[i][ii], projection[i][ii + 1] ];

        addb(i, tri);
        addl(i, tri);
      }

      projection[i][0][3] = projection[i][m][3] = Infinity;

      if (this.linkedList[i]) {
        for (var iii = 0; iii < this.linkedList[i].length; iii ++) {
          var tri = this.linkedList[i][iii];
          tri.previous = this.linkedList[i][iii - 1];
          tri.next = this.linkedList[i][iii + 1];
        }
      }
    }

    //this.linkedList = this.linkedList.filter( x => x[0] );

    //Calculate the areas of the triangles after removing them
    for (var index = 0; index < this.linkedList.length; index += 1) {

      var scanline = 0, current;

      while (current = scalp(index)) {

        var previous = current.previous;
        var next = current.next;

        ( scanline < current[1][3] ) ? scanline = current[1][3] : current[1][3] = scanline;

        if (previous) {
          previous[2] = current[2];
          previous[1][3] = calcArea(previous);
          remove(index, previous[3]);
          addb(index, previous);
        }

        if (next) {
          next[0] = current[0];
          next[1][3] = calcArea(next);
          remove(index, next[3]);
          addb(index, next);
        }

    }}

    this.original = Array.from(projection);
  }

  data.execute = function(threshold) {
    for (var i = 0; i < this.original.length; i ++) { object.coordinates[i] = this.original[i].filter(x => (x[3] > threshold)); }
  }

  
  function addb(index, entry) {

    if (!data.binaryTree[index]) data.binaryTree[index] = [];
    let n = data.binaryTree[index].length;

    entry[1][3] = calcArea(entry);
    entry[3] = n;

    data.binaryTree[index][n] = entry;

    heapify_up(index, n);
  }


  function addl(index, entry) { 

    if (!data.linkedList[index]) data.linkedList[index] = [];
    let n = data.linkedList[index].length;

    data.linkedList[index][n] = entry;
  }


  function remove(i, ii) {

    if (data.binaryTree.length <= 0) return;

    var tri = data.binaryTree[i][ii];
    var lastTri = data.binaryTree[i].pop();

    if (ii != lastTri[3]) {
      lastTri[3] = ii;
      data.binaryTree[i][ii] = lastTri;
    }
    
    ( lastTri[1][3] < tri[1][3] ) ? heapify_up(i, ii) : heapify_down(i, ii);

    return tri;
  }


  function scalp(index, subsequent) {

    
    if (! data.binaryTree[index] || data.binaryTree[index].length == 1) return;
    //console.log(data.binaryTree[index].length);
    

    var tri = data.binaryTree[index][0];
    var lastTri = data.binaryTree[index].pop();

    lastTri[3] = 0;
    data.binaryTree[index][0] = lastTri;

    heapify_down(index, 0);

    return tri;
  }

  function calcArea(entry) {

    var ax = entry[0][0];
    var ay = entry[0][1];

    var a = entry[2][0] - ax;
    var b = entry[1][0] - ax;
    var c = entry[2][1] - ay;
    var d = entry[1][1] - ay;

    return area = 0.5 * Math.abs(a * d - b * c);
  }

  function heapify_down(index, entry) {

    var min = entry;

    var left  = 2 * entry + 1;
    var right = 2 * entry + 2;

    if (left < data.binaryTree[index].length && data.binaryTree[index][left][1][2] < data.binaryTree[index][min][1][2]) { min = left; }
    if (right < data.binaryTree[index].length && data.binaryTree[index][right][1][2] < data.binaryTree[index][min][1][2]) { min = right; }

    if (entry != min) {

      data.binaryTree[index][entry][3] = min;
      data.binaryTree[index][min][3] = entry;

      swap(index, entry, min);
      heapify_down(index, min);
  }}


  function heapify_up(index, entry) {

    var min = entry;
    var parent = ~~(entry / 2);

    if (parent >= 0 && data.binaryTree[index][entry][1][2] < data.binaryTree[index][parent][1][2]) { min = parent; }

    if (entry != min) {

      data.binaryTree[index][entry][3] = min;
      data.binaryTree[index][min][3] = entry;

      swap(index, entry, min);
      heapify_up(index, min);
  }}


  function swap(index, a, b) {

    var temp = data.binaryTree[index][a];
    data.binaryTree[index][a] = data.binaryTree[index][b];
    data.binaryTree[index][b] = temp;
  }

  return data;
}


function simplify(threshold) { visvalingam.execute(threshold); }