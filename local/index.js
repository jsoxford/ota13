var data = [];

var watchID = navigator.geolocation.watchPosition(function(position) {
	counter.innerText = parseInt(counter.innerText) + 1;
	accuracy.innerText = position.coords.accuracy;
	// todo - add to map
	data.push(position)
	draw();
}, function() {}, {enableHighAccuracy: true, maximumAge: 30000, timeout: 27000})

bean.one(document.documentElement, 'touchstart', function(){
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
})

// bean.on(start_button, 'click', function(){
// 	if(watchID){
// 		navigator.geolocation.clearWatch(watchID);
// 	} else {
// 		watchID = navigator.geolocation.watchPosition(function(position) {
// 			position.id = document.getElementById('identifier').value || fallback_id;
// 			counter.innerText = parseInt(counter.innerText) + 1;
// 			accuracy.innerText = position.coords.accuracy;
// 		}
// 		/*, function(){
// 			alert("geolocation error")
// 		},{
// 			enableHighAccuracy: true,
// 			maximumAge        : 10000, // these
// 			timeout           : 27000 // could be tweaked
// 		}*/
// 		);


// 	}
// });

// var subscribed;

// bean.on(view_button, 'click', function(){
// 	if(subscribed) return;
// 	subscribed = true;

// 	pubnub.subscribe({
// 		channel : "positions",
// 		callback : function(message){
// 			// prepend to the list
// 			// positions_el.innerText = JSON.stringify(message) + "\n" + positions_el.innerText;

// 			data.push(message);

// 			draw();
// 		}
// 	});
// });



// not sure if this is a great idea

// bean.on(document.getElementById('fullscreen'), 'click', function(e){

// 	if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen();
//     } else if (document.documentElement.mozRequestFullScreen) {
//       document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullscreen) {
//       document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//     }

// });


var width = 500, height = 500;
var svg = d3.select('#positions').append('svg').attr('width', width).attr('height', height);

function min(arr){
	return Math.min.apply(Math,arr)
}
function max(arr){
	return Math.max.apply(Math,arr)
}


function draw(){

	// data = data.filter(function(d){return parseInt(d.coords.accuracy) < 20});

	var longs = data.map(function(d){return d.coords.longitude}).filter(function(d){return d})
	var lats  = data.map(function(d){return d.coords.latitude}).filter(function(d){return d});
	var accuracies = data.map(function(d){return d.coords.accuracy}).filter(function(d){return d});

	// working
	// var longscale = d3.scale.linear().domain([min(longs), max(longs)]).range([0, width]);
	// var latscale  = d3.scale.linear().domain([min(lats),  max(lats)]) .range([0, height]);

	// alternate (fixed ratio)
	var maxdiff = max([max(longs) - min(longs),max(lats) - min(lats)])
	var longscale = d3.scale.linear().domain([min(longs), min(longs) + maxdiff]).range([10, width - 10]);
	var latscale  = d3.scale.linear().domain([min(lats),  min(lats) + maxdiff]) .range([10, height - 10]);

	// accuracy 0.4 -> 1, for opacity
	var accuracyscale  = d3.scale.linear().domain([min(accuracies),  max(accuracies)]) .range([0.4, 1]);

	// svg.selectAll('circle')
	// 	.data(data)
	// 	.enter()
	// 	.append('circle')
	// 	.attr('r', 3)
	// 	.style('fill', function(d,i){return setColour(d.id)})

	// // also update for new ranges
	// svg.selectAll('circle')
	// 	.data(data)
	// 	.attr('cx', function(d,i){return longscale(d.coords.longitude)})
	// 	.attr('cy', function(d,i){return latscale(d.coords.latitude)})
	// 	.style('opacity', function(d,i){return accuracyscale(d.coords.accuracy)})
	// 	// .style('fill', function(d,i){return setColour(d.id)})

	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return longscale(d.coords.longitude); })
	    .y(function(d) { return 0.8 * latscale(d.coords.latitude); });

	svg.selectAll(".line").remove()
	svg.selectAll("line")
	    .data([data])
	  .enter().append("path")
	    .attr("class", "line")
	    .attr("d", line)
	    .style('fill', 'none')
	    .style('stroke', '#3f98cb')
	    .style('stroke-width', 3)
}

draw();


// uncomment this to run dump

// dump1 = dump1.slice(30);

// setInterval(function(){
// 	if(dump1.length){
// 		data.push(dump1.shift())
// 		draw();
// 	}
// }, 10)


// hacky random deterministic colours
function setColour(uuid){
	var colours = 'red blue green teal hotpink yellow'.split(' ');//#1f77b4 #ff7f0e #2ca02c #d62728 #9467bd #8c564b #e377c2 #7f7f7f #bcbd22 #17becf'.split(' ');
	var n = 0;
	for(var i in uuid){
		n = (n + uuid.charCodeAt(i)) % colours.length;
	}
	return colours[n];
}
