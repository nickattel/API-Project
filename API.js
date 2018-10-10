
const mapsEndpoint = `https://maps.googleapis.com/maps/api/staticmap?parameters&key=AIzaSyCgcDx6iigGOjg_AukchpQ75ghV0xQEEB8`;

const coordinates = {
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
		console.log('result was successful');
		console.dir(result.data);
		displayResults(result.data);
	});
}

function displayResults(data) {
	let results = '';
	for (let i = 0 ; i < data.length ; i++){
		let result = data[i];
		let resultHtml = `
		<div>
		<h3>${result.Name}</h3>
		<p>${result.Desc}</p>
		</div>
		`;
		results = results.concat(resultHtml);
	}
	console.log(results);
  $('#resultsContainer').empty().html(results).removeClass('hidden');
}

function initMap(lat, lng) {
	let centerCoordinates = `{lat: ${lat}, lng: ${lng}}`;
	console.log(centerCoordinates);
   map = new google.maps.Map(
      document.getElementById("map"), {
      	center: centerCoordinates,
      	zoom: 6
      });

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