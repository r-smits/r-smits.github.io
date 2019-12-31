//This will look at whether a point is inside a polygon or not.
//First; intersection

var geometries = [];

function getCoordinate(event) {

  let x = event.clientX - canvas.getBoundingClientRect().left;
  let y = event.clientY - canvas.getBoundingClientRect().top;
  return [x, y];
}


function findIntersect(point) {

    geometries.forEach( function (polygon) {

        var inter = 0;

        polygon.arcs.forEach( function(arc) {

            arc.forEach( function(indices) {
                (indices.length) ? indices.forEach( function(index) { (index >= 0) ? inter += positive(index, point) : inter += negative(index, point) }) : (indices >= 0) ? inter += positive(indices, point) : inter += negative(indices, point);
            })})

        if (inter % 2 != 0) {
            let country = polygon.properties.name;
            displayInfo(country);
        }

    });

    function positive(index, point) { 
        return windingNumber(object.translate[index], point);
    }

    function negative(index, point) { 
        return windingNumber(object.translate[Math.abs(index)-1].reverse(), point);
    }
}

function windingNumber(array, point) {

    var result = 0;

    let n = array.length-1;

    let px = point[0];
    let py = point[1];

    for (var i = 0; i < n; i ++) {

        let nx = array[i][0];
        let ny = array[i][1];

        let n2x = array[i+1][0];
        let n2y = array[i+1][1];

        if (ny <= py) {
            if (n2y > py) {
                if (orientation( array[i], array[i+1], point ) > 0) ++result;
            }

        } else if (n2y <= py) {
            if (orientation( [nx, ny], [n2x, n2y], [px, py] ) < 0) --result;
        }
    }

    function orientation(p, q, a) { 
        // This works based on the cross product (a * d - b * c). 
        // It is actually not based on a comparison of angles.

        // It checks where i-hat is in comparison to j-hat.
        // If i hat is negative, it is clockwise. Otherwise it is counter-clockwise.
        
        return (q[1] - p[1]) * (a[0] - q[0]) - (a[1] - q[1]) * (q[0] - p[0]);
    }

    return result;
}


function displayInfo(country) {

    let cell1 = document.getElementById("c1r5");
    let cell2 = document.getElementById("c2r5");
    let cell3 = document.getElementById("c3r5");

    cell1.innerText = country;
    cell2.innerText = country + " is a beautiful country. This text is a placeholder.";
    cell3.innerText = "See the following links to learn more about " + country + "'s culture and places to visit.";


}



//Excellent piece of code to traverse all the points in every polygon
/*
 this.geometries.forEach( function (polygon) {
            polygon.arcs.forEach( function(arc) {
                arc.forEach( function(indices) {

                    (indices.length) ? indices.forEach( function(index) { (index >= 0) ? positive(index) : negative(index); }) : (indices >= 0) ? positive(indices) : negative(indices);
    })})});
        
    function positive(index) { 
        context.moveTo(data.translate[index][0][0], data.translate[index][0][1]);
        data.translate[index].forEach( function(element) { context.lineTo(element[0], element[1]); } );
    }

    function negative(index) {
        index = Math.abs(index)-1; let lastIndex = data.translate[index].length-1;
        context.moveTo(data.translate[index][lastIndex][0], data.translate[index][lastIndex][1]);
        for (var i = lastIndex; i >= 0; i --) { context.lineTo(data.translate[index][i][0], data.translate[index][i][1]); }
    }
*/

