var data = [];

var pubnub = PUBNUB.init({
	publish_key   : 'pub-c-0776ca68-c17d-4d5e-9955-72425215955d',
	subscribe_key : 'sub-c-4e3d33da-15a8-11e3-92f9-02ee2ddab7fe'
	// uuid          : id
});

var watchID;

bean.on(start_button, 'click', function(){
	if(watchID){
		navigator.geolocation.clearWatch(watchID);
	} else {
		watchID = navigator.geolocation.watchPosition(function(position) {
			position.id = document.getElementById('identifier').value;
			pubnub.publish({
				channel : "positions",
				message : position
			});
			counter.innerText = parseInt(counter.innerText) + 1;
		});
	}
});

var subscribed;

bean.on(view_button, 'click', function(){
	if(subscribed) return;
	subscribed = true;

	pubnub.subscribe({
		channel : "positions",
		callback : function(message){
			// prepend to the list
			positions_el.innerText = JSON.stringify(message) + "\n" + positions_el.innerText;

			data.push(message);

			draw();
		}
	});
});



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



// var odata = [{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.37913513183594,"longitude":-0.7431722946762027,"heading":null,"latitude":51.996535905403476},"timestamp":1380289087591},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.28006744384766,"longitude":-0.7431717577138736,"heading":null,"latitude":51.99653597372068},"timestamp":1380289087667},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.22550964355469,"longitude":-0.7431709540319106,"heading":null,"latitude":51.99650117614318},"timestamp":1380289097965},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.66448211669922,"longitude":-0.7431425657815776,"heading":null,"latitude":51.99649733155646},"timestamp":1380289105640},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.79874420166016,"longitude":-0.7429564296258825,"heading":null,"latitude":51.99660006329343},"timestamp":1380289112065},{"coords":{"speed":null,"accuracy":153.49339811504112,"altitudeAccuracy":10,"altitude":95.52580261230469,"longitude":-0.7427496496550104,"heading":null,"latitude":51.996625612481445},"timestamp":1380289118468},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.46987915039062,"longitude":-0.7425729810772733,"heading":null,"latitude":51.99657265438081},"timestamp":1380289128908},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.49281311035156,"longitude":-0.7426992992718011,"heading":null,"latitude":51.99675120163162},"timestamp":1380289135315},{"coords":{"speed":null,"accuracy":154.10460401175527,"altitudeAccuracy":10,"altitude":95.68707275390625,"longitude":-0.7427714750480622,"heading":null,"latitude":51.99684251921107},"timestamp":1380289141728},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.53549194335938,"longitude":-0.7427352692439972,"heading":null,"latitude":51.99678649054978},"timestamp":1380289148132},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.50630187988281,"longitude":-0.7427281178914018,"heading":null,"latitude":51.99677615689774},"timestamp":1380289154534},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.1188735961914,"longitude":-0.7428478099668546,"heading":null,"latitude":51.99678687534026},"timestamp":1380289159773},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.4931640625,"longitude":-0.743026571096615,"heading":null,"latitude":51.996934694655806},"timestamp":1380289166240},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":93.59867858886719,"longitude":-0.7431242444650157,"heading":null,"latitude":51.997024123216335},"timestamp":1380289172696},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":92.7066421508789,"longitude":-0.7432517178460188,"heading":null,"latitude":51.997007585223415},"timestamp":1380289179140},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10.608548701023727,"altitude":91.70352172851562,"longitude":-0.7432757936204573,"heading":null,"latitude":51.997101178614855},"timestamp":1380289185583},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.575615450025756,"altitude":90.63260650634766,"longitude":-0.7432670091570026,"heading":null,"latitude":51.997137161085895},"timestamp":1380289192024},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":12.25695292058597,"altitude":89.57965087890625,"longitude":-0.7431776196612772,"heading":null,"latitude":51.997168706835254},"timestamp":1380289198469},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.760774258407759,"altitude":89.37353515625,"longitude":-0.7432601954433965,"heading":null,"latitude":51.99677847906508},"timestamp":1380289204914},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.42849260030536,"altitude":89.25745391845703,"longitude":-0.7433086747258936,"heading":null,"latitude":51.99666553967867},"timestamp":1380289211356},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10.905915613158214,"altitude":89.39012145996094,"longitude":-0.7433442318521445,"heading":null,"latitude":51.99661275870566},"timestamp":1380289217808},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":91.43594360351562,"longitude":-0.7432670056803694,"heading":null,"latitude":51.99652734823898},"timestamp":1380289220722},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":92.6273422241211,"longitude":-0.7431480175862427,"heading":null,"latitude":51.99655613331229},"timestamp":1380289227161},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":93.25727844238281,"longitude":-0.7431255724113045,"heading":null,"latitude":51.99656955979535},"timestamp":1380289233597},{"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.26902770996094,"longitude":-0.7431450664712911,"heading":null,"latitude":51.99648209427419},"timestamp":1380289240029},{"coords":{"speed":null,"accuracy":65.95779145660117,"altitudeAccuracy":10,"altitude":95.20940399169922,"longitude":-0.7431486008919538,"heading":null,"latitude":51.9964806401222},"timestamp":1380289246432}];

// setInterval(function(){
// 	if(odata.length){
// 		data.push(odata.pop())
// 		draw();
// 	}
// }, 500)

var width = 600, height = 600;
var svg = d3.select('#positions').append('svg');

function min(arr){
	return Math.min.apply(Math,arr)
}
function max(arr){
	return Math.max.apply(Math,arr)
}


function draw(){

	var longs = data.map(function(d){return d.coords.longitude}).filter(function(d){return d})
	var lats  = data.map(function(d){return d.coords.latitude}).filter(function(d){return d});

	var maxdiff = max([max(longs) - min(longs),max(lats) - min(lats)])

	var longscale = d3.scale.linear().domain([min(longs), min(longs) + maxdiff]).range([10, width-10]);
	var latscale  = d3.scale.linear().domain([min(lats), min(lats) + maxdiff]).range([10, height-10]);

	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('r', 3)
		.attr('cx', function(d,i){return longscale(d.coords.longitude)})
		.attr('cy', function(d,i){return latscale(d.coords.latitude)})
	
	// also update for new ranges
	svg.selectAll('circle')
		.data(data)
		.transition()
		.attr('cx', function(d,i){return longscale(d.coords.longitude)})
		.attr('cy', function(d,i){return latscale(d.coords.latitude)})
		

}

draw();