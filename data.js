function set(input, mercator) {

	console.log(input);

	object.coordinates = input.arcs; 
	object.translate = [];

	//Only used to detect shape click events
	geometries = input.objects.countries.geometries;
	console.log("again: ", geometries);
	
	for (var i = 0; i < object.coordinates.length; i ++) { object.translate.push([]); }
	
	object.pitch = 0;
	object.yaw = 0;
	object.roll = 0;

	object.dx = 0;
	object.dy = 0;
	object.dz = 0;

	object.su = 0;
	object.cu = 0;
	object.sv = 0;
	object.cv = 0;
	object.sw = 0;
	object.cw = 0;

	object.r11 = 0;
	object.r12 = 0;
	object.r13 = 0;
	object.r21 = 0;
	object.r22 = 0;
	object.r23 = 0;
	object.r31 = 0;
	object.r32 = 0;
	object.r33 = 0; 

	object.animate = false;

	deltaReverse();
	normalise(mercator);
}


function deltaReverse() { 

	for (var i = 0; i < object.coordinates.length; i ++) {

		var x = 0;
		var y = 0;

		for (var ii = 0; ii < object.coordinates[i].length; ii ++) {

			x += object.coordinates[i][ii][0]; 
			y -= object.coordinates[i][ii][1]; 

			object.coordinates[i][ii] = [x, y];

}}}


function normalise(mercator) {

	//Setting initial values
	var maxX = maxY = -Infinity;
	var minX = minY = Infinity;

	//Find minX and maxX
	object.coordinates.forEach( function(arc) {
		arc.forEach( function(coordinate) {

			let x = coordinate[0];
			let y = coordinate[1];

			if (minX > x) minX = x;
			if (minY > y) minY = y;

			if (maxX < x) maxX = x;
			if (maxY < y) maxY = y;

		});
	});

	//Find the delta consisting of the smallest increment
	var dx = 4 / (maxX - minX);
  	var dy = 2 / (maxY - minY);

  	//Give the coordinates values based on the increments
	for (var i = 0; i < object.coordinates.length; i ++) {
		for (var ii = 0; ii < object.coordinates[i].length; ii ++) {
		  		
		  	let x = object.coordinates[i][ii][0];
		  	let y = object.coordinates[i][ii][1];

		  		object.coordinates[i][ii][0] = (x - minX) * dx - 2;
		  		object.coordinates[i][ii][1] = (y - minY) * dy - 1;

		  	if (mercator) mercatorproj();
		}
	}

	
	function mercatorproj() {
		let degreeX = (object.coordinates[i][ii][0] * 90) / 180 * Math.PI;
  		let degreeY = (object.coordinates[i][ii][1] * 90) / 180 * Math.PI;

		object.coordinates[i][ii][0] = Math.cos(degreeY) * Math.cos(degreeX);
  		object.coordinates[i][ii][1] = Math.cos(degreeY) * Math.sin(degreeX);
 		object.coordinates[i][ii].push(Math.sin(degreeY));
	}
}


function sumPoints() {

	var sum = 0;

	for (var i = 0, n = object.coordinates.length; i < n; i ++) {
		sum += object.coordinates[i].length - 1;
	}

	console.log("total amount of points: ",sum);
}

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