webpackJsonp([0],{

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_topojson__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_topojson___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_topojson__);





(function() {
	var width = 1700;
	var height = 835;
	

	var projection = __WEBPACK_IMPORTED_MODULE_0_d3__["geoEquirectangular"]()
					   .center([-77, 35])
					   .scale(273)
					   .rotate([0, 0])

	var svg = __WEBPACK_IMPORTED_MODULE_0_d3__["select"]("#map")
				.append("svg")
				.attr("width", width)
				.attr("height", height)



	var path = __WEBPACK_IMPORTED_MODULE_0_d3__["geoPath"]()
				 .projection(projection);

	var canvas = svg.append("g")

	var yScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scaleLinear"]()
				   .range([height, 0])
				   .domain([-90, 90])

	var xScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scaleLinear"]()
				   .range([0, width])
				   .domain([-180, 180])

	var rScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scaleLinear"]()
				   .range([1, 40])

	var yAxis = __WEBPACK_IMPORTED_MODULE_0_d3__["axisLeft"](yScale);

	var xAxis = __WEBPACK_IMPORTED_MODULE_0_d3__["axisBottom"](xScale);


	__WEBPACK_IMPORTED_MODULE_0_d3__["json"]("https://gist.githubusercontent.com/abenrob/787723ca91772591b47e/raw/8a7f176072d508218e120773943b595c998991be/world-50m.json", function(err, topology) {

		
		var geoJson = __WEBPACK_IMPORTED_MODULE_1_topojson__["feature"](topology, topology.objects.countries);

	 
	    canvas.selectAll("path")
			  .data(geoJson.features)
			  .enter()
			  .append("path")
			  .attr("d", path) 


		var zoom = __WEBPACK_IMPORTED_MODULE_0_d3__["zoom"]()
					 .scaleExtent([1, 10])
					 .on("zoom", function() {
					  	canvas.attr("transform", "translate(" + 
					  		__WEBPACK_IMPORTED_MODULE_0_d3__["event"].transform.x + "," + __WEBPACK_IMPORTED_MODULE_0_d3__["event"].transform.y + ")scale(" + __WEBPACK_IMPORTED_MODULE_0_d3__["event"].transform.k + ")")
					  	 .selectAll("path")
					  	 .attr("d", path.projection(projection));
					})

		svg.call(zoom);


		__WEBPACK_IMPORTED_MODULE_0_d3__["json"]("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(data) {


				var rMax = __WEBPACK_IMPORTED_MODULE_0_d3__["max"](data.features, function(d) {
					var Area = d.properties.mass;
					var radius = Math.sqrt(Area)
					return radius;

				})

				rScale.domain([0, rMax]);
				

				var circles = canvas.selectAll("circle")
						   		    .data(data.features)
						   		    .enter()
						   		    .append("circle")
						   		    .attr("cx", function(d, i) { 
						   		    	if(d.geometry !== null) {
						   		    		return xScale(d.geometry.coordinates[0]);
						   		    	} else {
						   		    		return undefined
						   		    	}
						   		    	
						   		    })
						   		    .attr("cy", function(d, i) { 
						   		    	if(d.geometry !== null) {
						   		    		return yScale(d.geometry.coordinates[1]);
						   		    	} else {
						   		    		return undefined
						   		    	}
						   		    	
						   		    })
						   		    .attr("r", function(d) {
						   		    	var Area = d.properties.mass
						   		    	var radius = Math.sqrt(Area)
						   		   		return rScale(radius);
						   		    })
						   		    .attr("fill", "rgba(255, 0, 0, .6)")
						   		    .on("mouseover", function() {
						   		    	return tooltip.style("visibility", "visible")
						   		    })
						   		    .on("mouseout", function() {
						   		    	return tooltip.style("visibility", "hidden")
						   		    })
						   		    .on("mousemove", function(d) {
						   		    	return tooltip.style("top", (event.pageY - 60) + "px").style("left", (   event.pageX - 230) + "px")
						   		    				  .html("<h3>Name: " + d.properties.name + "</h3><br><h3>Mass: " + d.properties.mass + " Kg</h3><br><h3>Year: "  + d.properties.year +"</h3>")
						   		    				  			  
						   		    })



				var tooltip = __WEBPACK_IMPORTED_MODULE_0_d3__["select"]("body")
						.append("div")
						.style("position", "absolute")
						.style("z-index", 10)
						.style("visibility", "hidden")
						.style("background", "rgba(255,255,255,.9)")
						.style("width", "200px")
						.style("height", "150px")
						.style("border-radius", "5px")
						.style("border", "2px solid black")
						.style("padding-left", "10px")


		})
		 
	})


}())

/***/ })

},[191]);