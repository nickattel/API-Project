 /*const braapEndpoint = `https://brappdbv2.p.mashape.com/Park`;
 const braapApiKey = "iBuNlfS0WQE0llxo4VuGWsHuJBXMEVhlCUhD1YIC9xQ";
 const mashapeKey = "GssC35GpK1mshqenE8zsZgU624c4p1YCc6ujsnOkHslujvfISE";

 function getBraapData(callback) {
	 const query = {
		 "braapDB-Key": braapApiKey,
		 "X-Mashape-Key": mashapeKey,
		 "Content-Type": "application/json"
		 }
	 $.getJSON(braapEndpoint, query, callback);
	}

	 function renderMapResult(result) {
	 	const layout = $(resultLayout);
	 	const trailInfo = `https://brappdbv2.p.mashape.com/Trail/0/InfoItems`;
	 	
	 }
*/
const mapsEndpoint = `https://maps.googleapis.com/maps/api/staticmap?parameters&key=AIzaSyCgcDx6iigGOjg_AukchpQ75ghV0xQEEB8`;


function getMapSearch(stateSelection, callback) {
	const query = {
		url: `https://maps.googleapis.com/maps/api/staticmap?center=${stateSelection}&zoom=14&size=400x400&key=AIzaSyCgcDx6iigGOjg_AukchpQ75ghV0xQEEB8`
	}
}
const coordinates = {
	'arizona': {lat:32.6847145, lng:-114.4303838},
	'california': {lat:37.1931243, lng:-123.796161}
}

function stateResults(){
	$('#stateSelect').change(function (event) {
		console.log("selectedState", event);
		let currentState = $(event.currentTarget).val();
		let location = coordinates[currentState];
		console.log(location);
	})
}

function initMap() {
   map = new google.maps.Map(
      document.getElementById("map"), {zoom: 12, center: $(stateResults)});
  renderMapResults(item);
  $('map').html(results);
}

function searchResults(){
  $('.searchResults').on('click', function(event) {
  $('.searchPage').hide();
  $('#resultsContainer').show();
  });
}

function renderSearchResults() {
	$('#resultsContainer').html(resultLayout())
}

function resultLayout() {
	return `<div><a class='' href=''>testing<img class='thumbnail' src="${map}"></a></div>`;
}

function main(){
  searchResults();
  renderSearchResults();
  stateResults();
  initMap();
}
$(main)