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



// var data = [{"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":12.238926451198445,"altitude":102.59603881835938,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284258304},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":12.331235944828663,"altitude":101.99739074707031,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284257321},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":12.221427262430566,"altitude":101.88764953613281,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284256311},
// {"coords":{"speed":1.1961140632629395,"accuracy":10,"altitudeAccuracy":24,"altitude":100,"longitude":-0.7425996568060876,"heading":104.4140625,"latitude":51.99653576133027},"timestamp":1380284227275},
// {"coords":{"speed":1.2992976903915405,"accuracy":10,"altitudeAccuracy":24,"altitude":93,"longitude":-0.7426061108715297,"heading":104.4140625,"latitude":51.99659544048085},"timestamp":1380284226841},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":12.116064393517316,"altitude":101.55133056640625,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284255307},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":12.014775488324917,"altitude":100.79754638671875,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284254299},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.915131260615198,"altitude":100.34654235839844,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284253295},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.820247754211895,"altitude":99.42652893066406,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284252301},
// {"coords":{"speed":1.3750076293945312,"accuracy":10,"altitudeAccuracy":3,"altitude":95,"longitude":-0.7424740120775462,"heading":104.4140625,"latitude":51.9965472026281},"timestamp":1380284225743},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.730427709346902,"altitude":98.97500610351562,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284251302},
// {"coords":{"speed":1.2697930335998535,"accuracy":10,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7423728425062656,"heading":91.40625,"latitude":51.99649598919972},"timestamp":1380284224748},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.644524480106666,"altitude":98.95811462402344,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284250304},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.562742519934105,"altitude":99.17134094238281,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284249307},
// {"coords":{"speed":1.1158133745193481,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7424150872982502,"heading":82.96875,"latitude":51.99665214405581},"timestamp":1380284223742},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.482749059344226,"altitude":99.23358154296875,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284248302},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.39713182474826,"altitude":98.86222839355469,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284247301},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.319490669331545,"altitude":98.73347473144531,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284246299},
// {"coords":{"speed":0.9486051201820374,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7425636984414817,"heading":78.046875,"latitude":51.996505167383695},"timestamp":1380284222747},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":11.252733356254303,"altitude":98.60260009765625,"longitude":-0.743281156105338,"heading":56.99632305428474,"latitude":51.996492551529954},"timestamp":1380284245305},
// {"coords":{"speed":1.341531395790594,"accuracy":10,"altitudeAccuracy":11.351256148206616,"altitude":98.71029663085938,"longitude":-0.743281156105338,"heading":51.557341595075926,"latitude":51.996492551529954},"timestamp":1380284244296},
// {"coords":{"speed":1.4340712950223995,"accuracy":10,"altitudeAccuracy":11.498239253149565,"altitude":97.03060913085938,"longitude":-0.7432922530790297,"heading":44.893440237839734,"latitude":51.99648940475172},"timestamp":1380284243295},
// {"coords":{"speed":1.4781645313218652,"accuracy":10,"altitudeAccuracy":11.649899971085508,"altitude":96.24850463867188,"longitude":-0.7433062650020021,"heading":66.55511569219239,"latitude":51.99648174778596},"timestamp":1380284242295},
// {"coords":{"speed":1.4795405540010833,"accuracy":10,"altitudeAccuracy":11.803695988532471,"altitude":94.75813293457031,"longitude":-0.7433256369314472,"heading":62.67992563963937,"latitude":51.996476573814945},"timestamp":1380284241296},
// {"coords":{"speed":1.4548643529313479,"accuracy":10,"altitudeAccuracy":11.457162224157264,"altitude":95.65451049804688,"longitude":-0.7433489851650442,"heading":73.79606619192512,"latitude":51.9964688593592},"timestamp":1380284240300},
// {"coords":{"speed":1.4509194063829955,"accuracy":10,"altitudeAccuracy":11.207295082917598,"altitude":94.89111328125,"longitude":-0.7433726325294352,"heading":87.19799776469297,"latitude":51.9964629029953},"timestamp":1380284239296},
// {"coords":{"speed":1.3838584175657258,"accuracy":10,"altitudeAccuracy":11.040379581413736,"altitude":96.23231506347656,"longitude":-0.7433954413378063,"heading":null,"latitude":51.99645961420774},"timestamp":1380284238295},
// {"coords":{"speed":0.8399999737739563,"accuracy":10,"altitudeAccuracy":1,"altitude":94,"longitude":-0.7426525466151002,"heading":null,"latitude":51.996528133798385},"timestamp":1380284220750},
// {"coords":{"speed":1.300507195985857,"accuracy":5,"altitudeAccuracy":9.5,"altitude":97.348876953125,"longitude":-0.7434199701956239,"heading":null,"latitude":51.996458756025774},"timestamp":1380284237295},
// {"coords":{"speed":1.1670356313680736,"accuracy":10,"altitudeAccuracy":10.102734804800717,"altitude":94.75155639648438,"longitude":-0.7434530599583565,"heading":null,"latitude":51.99645456781879},"timestamp":1380284236296},
// {"coords":{"speed":0.8542569473544964,"accuracy":10,"altitudeAccuracy":9.202797671281171,"altitude":94.72354125976562,"longitude":-0.7434941506655873,"heading":null,"latitude":51.996452651916115},"timestamp":1380284235294},
// {"coords":{"speed":1.0455080446467633,"accuracy":5,"altitudeAccuracy":9.336053468914352,"altitude":95.23696899414062,"longitude":-0.7435137862489889,"heading":null,"latitude":51.99645334159674},"timestamp":1380284234304},
// {"coords":{"speed":null,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.742745669559336,"heading":null,"latitude":51.996483835440124},"timestamp":1380284219747},
// {"coords":{"speed":0.6347652782225662,"accuracy":5,"altitudeAccuracy":9.082692523239167,"altitude":94.74209594726562,"longitude":-0.7435546957232431,"heading":null,"latitude":51.99645834397768},"timestamp":1380284233293},
// {"coords":{"speed":0.4159641859465522,"accuracy":5,"altitudeAccuracy":9,"altitude":92.34977722167969,"longitude":-0.7435537720756561,"heading":null,"latitude":51.99645767976835},"timestamp":1380284232294},
// {"coords":{"speed":null,"accuracy":50,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7427959609783653,"heading":null,"latitude":51.99649184015765},"timestamp":1380284218882},
// {"coords":{"speed":0,"accuracy":5,"altitudeAccuracy":9,"altitude":93.69981384277344,"longitude":-0.7435448568454868,"heading":null,"latitude":51.996457946269764},"timestamp":1380284231295},
// {"coords":{"speed":0.9121804625868872,"accuracy":10,"altitudeAccuracy":9,"altitude":92.85850524902344,"longitude":-0.7435448568454868,"heading":null,"latitude":51.996457946269764},"timestamp":1380284230298},
// {"coords":{"speed":0.8996140226432912,"accuracy":10,"altitudeAccuracy":9,"altitude":93.5894775390625,"longitude":-0.7435355348425378,"heading":null,"latitude":51.99645162345966},"timestamp":1380284229293},
// {"coords":{"speed":1.0381562132015731,"accuracy":10,"altitudeAccuracy":9,"altitude":94.92514038085938,"longitude":-0.7435224238968513,"heading":null,"latitude":51.9964460473846},"timestamp":1380284228295},
// {"coords":{"speed":0.9789542568268094,"accuracy":10,"altitudeAccuracy":9.341698350274578,"altitude":99.06535339355469,"longitude":-0.7435096533372145,"heading":null,"latitude":51.99644216443519},"timestamp":1380284227296},
// {"coords":{"speed":0.8851877098868093,"accuracy":10,"altitudeAccuracy":9.912718943891887,"altitude":99.26544189453125,"longitude":-0.7435062649606934,"heading":null,"latitude":51.99644615260715},"timestamp":1380284226295},
// {"coords":{"speed":1.170140517769486,"accuracy":10,"altitudeAccuracy":9.950449935356234,"altitude":102.08341979980469,"longitude":-0.743507648578116,"heading":null,"latitude":51.996445889609305},"timestamp":1380284225294},
// {"coords":{"speed":0.6553267098371156,"accuracy":10,"altitudeAccuracy":9.665494253454494,"altitude":101.948974609375,"longitude":-0.7434858452095373,"heading":null,"latitude":51.996447863824955},"timestamp":1380284224295},
// {"coords":{"speed":0.8229477959092263,"accuracy":10,"altitudeAccuracy":9.50412236584304,"altitude":101.01579284667969,"longitude":-0.7434837454199602,"heading":null,"latitude":51.99644222986886},"timestamp":1380284223296},
// {"coords":{"speed":1.2118752496879384,"accuracy":10,"altitudeAccuracy":9.785536587032647,"altitude":99.68649291992188,"longitude":-0.7434824409075058,"heading":null,"latitude":51.9964347786352},"timestamp":1380284222296},
// {"coords":{"speed":1.5240492581985106,"accuracy":10,"altitudeAccuracy":11.470211666081397,"altitude":99.41471862792969,"longitude":-0.7434829783982503,"heading":null,"latitude":51.9964139944149},"timestamp":1380284221293},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":17.58699313762249,"altitude":108.52879333496094,"longitude":-0.7434785245379593,"heading":null,"latitude":51.99633664638896},"timestamp":1380284219924},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":18.082463246035587,"altitude":111.27853393554688,"longitude":-0.7434785245379593,"heading":null,"latitude":51.99633664638896},"timestamp":1380284218925},
// {"coords":{"speed":0.43388561842904055,"accuracy":200,"altitudeAccuracy":10,"altitude":94,"longitude":-0.7429970157405974,"heading":null,"latitude":51.99650986585501},"timestamp":1380284217750},
// {"coords":{"speed":0,"accuracy":10,"altitudeAccuracy":19,"altitude":109.07176208496094,"longitude":-0.7434610000967181,"heading":null,"latitude":51.99628983666615},"timestamp":1380284217925},
// {"coords":{"speed":0,"accuracy":30,"altitudeAccuracy":57,"altitude":126.67341613769531,"longitude":-0.7434610000967181,"heading":null,"latitude":51.99628983666615},"timestamp":1380284216927},
// {"coords":{"speed":0.37677613507835983,"accuracy":200,"altitudeAccuracy":10,"altitude":94,"longitude":-0.7430083980043365,"heading":null,"latitude":51.99650120154562},"timestamp":1380284216776},
// {"coords":{"speed":null,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7430159859366184,"heading":null,"latitude":51.996494354728604},"timestamp":1380284214825},
// {"coords":{"speed":null,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7430039998150831,"heading":null,"latitude":51.996501940350974},"timestamp":1380284213744},
// {"coords":{"speed":null,"accuracy":30,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7429988030351167,"heading":null,"latitude":51.99650969361141},"timestamp":1380284212755},
// {"coords":{"speed":0,"accuracy":30,"altitudeAccuracy":57,"altitude":126.67341613769531,"longitude":-0.7434610000967181,"heading":null,"latitude":51.99628983666615},"timestamp":1380284215926},
// {"coords":{"speed":null,"accuracy":10,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7429957855499749,"heading":null,"latitude":51.99650747240707},"timestamp":1380284211873},
// {"coords":{"speed":0,"accuracy":50,"altitudeAccuracy":95,"altitude":126.67341613769531,"longitude":-0.7434610000967181,"heading":null,"latitude":51.99628983666615},"timestamp":1380284214928},
// {"coords":{"speed":null,"accuracy":10,"altitudeAccuracy":2,"altitude":94,"longitude":-0.7429962884641652,"heading":null,"latitude":51.996510531801725},"timestamp":1380284211825},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.26676940917969,"longitude":-0.743148393911566,"heading":null,"latitude":51.99650425975385},"timestamp":1380284211155},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":91.53668975830078,"longitude":-0.7429961622250759,"heading":null,"latitude":51.99651404939478},"timestamp":1380284208932},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.5094223022461,"longitude":-0.7431552595106665,"heading":null,"latitude":51.99646987327719},"timestamp":1380284209823},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":89.53839111328125,"longitude":-0.743023330675004,"heading":null,"latitude":51.99649928070769},"timestamp":1380284207724},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.93733978271484,"longitude":-0.7431667706009433,"heading":null,"latitude":51.99651106761561},"timestamp":1380284203395},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.19242095947266,"longitude":-0.7431656628017294,"heading":null,"latitude":51.996488011820425},"timestamp":1380284201933},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":95.38571166992188,"longitude":-0.7431531879907456,"heading":null,"latitude":51.99648001686733},"timestamp":1380284200698},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":88.90398406982422,"longitude":-0.7431205391820002,"heading":null,"latitude":51.99643130479264},"timestamp":1380284201301},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.3817367553711,"longitude":-0.7431538534369464,"heading":null,"latitude":51.99653425180317},"timestamp":1380284194276},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.35769309247316,"altitude":84.05377197265625,"longitude":-0.7431699802974842,"heading":null,"latitude":51.99654735455691},"timestamp":1380284194979},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":10,"altitude":94.4638671875,"longitude":-0.7431484930829347,"heading":null,"latitude":51.996536644031394},"timestamp":1380284191684},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.672592692543317,"altitude":83,"longitude":-0.743202614916546,"heading":null,"latitude":51.9965432920624},"timestamp":1380284190456},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.636041463380062,"altitude":83,"longitude":-0.7431950569127812,"heading":null,"latitude":51.99646005144085},"timestamp":1380284187203},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":12.132227051433675,"altitude":83,"longitude":-0.7431598977035816,"heading":null,"latitude":51.99642803319497},"timestamp":1380284186014},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.406300165771533,"altitude":83,"longitude":-0.7431736537223256,"heading":null,"latitude":51.996613494326624},"timestamp":1380284179599},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.928774216023832,"altitude":83,"longitude":-0.7431349162599621,"heading":null,"latitude":51.99665639066441},"timestamp":1380284178725},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":12.479468612117277,"altitude":83,"longitude":-0.7430878696718849,"heading":null,"latitude":51.996715969351314},"timestamp":1380284177454},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":11.897115893238514,"altitude":83,"longitude":-0.7432232063055126,"heading":null,"latitude":51.996502719271454},"timestamp":1380284171024},
// {"coords":{"speed":null,"accuracy":65,"altitudeAccuracy":12.458120150746247,"altitude":83,"longitude":-0.7432107804678347,"heading":null,"latitude":51.99648116263119},"timestamp":1380284169827},
// {"timestamp":1380284168145,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":54,"altitude":null,"longitude":-0.7430753,"latitude":51.9966235}}]



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