
const mapsEndpoint = `https://maps.googleapis.com/maps/api/staticmap?parameters&key=AIzaSyCgcDx6iigGOjg_AukchpQ75ghV0xQEEB8`;

const coordinates = {
	'Select a state!': {lat:33.4484, lng:-112.0740},
	'arizona': {lat:32.6847145, lng:-114.4303838},
	'california': {lat:37.1931243, lng:-123.796161},
	'colorado': {lat:40.0234735, lng:-105.2683086}
}

function stateResults(){
	$('#stateSelect').change(function (event) {
		console.log("selectedState", event);
		let currentState = $(event.currentTarget).val();
		let location = coordinates[currentState];
		/*console.log(location);*/
		console.log(location.lng);
		getParks(location.lat, location.lng);
		initMap(location.lat, location.lng);
	});
}

function getParks(lat, lng) {
	let endpoint = `https://brappdbv2.p.mashape.com/Parks?lat=${lat}&lng=${lng}`;
	console.log(endpoint);
	const apiKey = "iBuNlfS0WQE0llxo4VuGWsHuJBXMEVhlCUhD1YIC9xQ";
	const mashapeKey = "GssC35GpK1mshqenE8zsZgU624c4p1YCc6ujsnOkHslujvfISE";
	return fetch(endpoint, {
		headers: {
			"braapDB-Key": apiKey,
			"X-Mashape-Key": mashapeKey,
			"Content-Type": "application/json"
		}
	}).then(rawResult => {
		return rawResult.json();
	}).then(result => {
		const trails = result.data;
		console.log('result was successful');
		console.dir(trails);
		displayResults(trails);
		markerLocations(trails);
	});
}

function displayResults(data) {

	let results = '';
	for (let i = 0 ; i < data.length ; i++){
		let result = data[i];
		let resultHtml = `
		<div>
		<ol type='A'>
		<li><h3>${result.Name}</h3></li>
		<p>${result.Desc}</p>
		</ol>
		</div>
		`;
		results = results.concat(resultHtml);
	}
	console.log(results);
  $('#resultsContainer').empty().html(results).removeClass('hidden');
}

function initMap(lat, lng) {
	let centerCoordinatesLat = parseFloat(`${lat}`);
	let centerCoordinatesLng = parseFloat(`${lng}`);
	console.log(centerCoordinatesLat);
   map = new google.maps.Map(
      document.getElementById("map"), {
      	center: {
      		lat: centerCoordinatesLat, 
      		lng: centerCoordinatesLng
      	},
      	zoom: 8
      });
	}

function markerLocations(data) {
	let results = [];
	for (let i = 0 ; i < data.length ; ++i){
		let result = data[i];
		let resultHtml = `{lat: ${result.Lat}, lng: ${result.Lng}},`
		// results = results.concat(resultHtml);
		results.push({ 
			lat: parseFloat(result.Lat),
			lng: parseFloat(result.Lng)
		});
	}
	let locations = results;
	
	console.log(locations);

	let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let labelIndex = 0;

   let markers = locations.map(function(location, i){
   	return new google.maps.Marker({
   		position: location,
   		label: labels[labelIndex++ % labels.length]
   	});
   	console.log(markers)
   });

   let markerCluster = new MarkerClusterer(map, markers, 
   	{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

/*
function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.searchResults');
    let query = queryTarget.val();
    getParks(query);
  });
}

$(watchSubmit); */

function main(){
	stateResults();
}
$(main)