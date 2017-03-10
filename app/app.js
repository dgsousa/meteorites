import * as d3 from 'd3';
import * as topojson from 'topojson';



(function() {
	var width = 1700;
	var height = 835;
	

	var projection = d3.geoEquirectangular()
					   .center([-77, 35])
					   .scale(273)
					   .rotate([0, 0])

	var svg = d3.select("#map")
				.append("svg")
				.attr("width", width)
				.attr("height", height)



	var path = d3.geoPath()
				 .projection(projection);

	var canvas = svg.append("g")

	var yScale = d3.scaleLinear()
				   .range([height, 0])
				   .domain([-90, 90])

	var xScale = d3.scaleLinear()
				   .range([0, width])
				   .domain([-180, 180])

	var rScale = d3.scaleLinear()
				   .range([1, 40])

	var yAxis = d3.axisLeft(yScale);

	var xAxis = d3.axisBottom(xScale);


	d3.json("https://gist.githubusercontent.com/abenrob/787723ca91772591b47e/raw/8a7f176072d508218e120773943b595c998991be/world-50m.json", function(err, topology) {

		
		var geoJson = topojson.feature(topology, topology.objects.countries);

	 
	    canvas.selectAll("path")
			  .data(geoJson.features)
			  .enter()
			  .append("path")
			  .attr("d", path) 


		var zoom = d3.zoom()
					 .scaleExtent([1, 10])
					 .on("zoom", function() {
					  	canvas.attr("transform", "translate(" + 
					  		d3.event.transform.x + "," + d3.event.transform.y + ")scale(" + d3.event.transform.k + ")")
					  	 .selectAll("path")
					  	 .attr("d", path.projection(projection));
					})

		svg.call(zoom);


		d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(data) {


				var rMax = d3.max(data.features, function(d) {
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



				var tooltip = d3.select("body")
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