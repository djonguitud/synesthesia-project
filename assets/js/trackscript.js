var Artist = 'Eagles';
var Track = 'Hotel California';
//var requesturl = "https://api.spotify.com/v1/search?q=Adele%2520track:HoldOn&type=track&limit=1";
var client_id = '71dddef0e17b4ade850d8fd3cf9599d3';
var client_secret = 'b545088d0642400cbb25a4ec53893875';
const urlauthorize = 'https://accounts.spotify.com/authorize';
var redirect_uri = 'http://127.0.0.1:5500/index.html';
var storedToken = [];
var array = [];
var access_token = '';

function onPageLoad() {
	storedToken = JSON.parse(localStorage.getItem('Token')); //Get the stored token
	var str = window.location.search;
	console.log('STRING');
	console.log(str);
	if (storedToken !== null) {
		//If there is something in the localStorage
		array = storedToken;
		access_token = array[0]; //Move the stored token to a variable
		console.log('Token ready');
	} else if (str.length > 0) {
		console.log('Extract the code needed to get a new token');
		var URLparameters = new URLSearchParams(str);
		code = URLparameters.get('code');
		body = 'grant_type=authorization_code';
		body += '&code=' + code;
		body += '&redirect_uri=' + encodeURI(redirect_uri);
		body += '&client_id=' + client_id;
		body += '&client_secret' + client_secret;
		callAuthorizationAPI(body);
	} else if (str.length === 0) {
		console.log('Start authorization process');
		getauthorization();
	}
}

function getauthorization() {
	let url = urlauthorize;
	url += '?client_id=' + client_id;
	url += '&response_type=code';
	url += '&redirect_uri=' + encodeURI(redirect_uri);
	url += '&show_dialog=false';
	url += '&scope=user-follow-read';
	console.log(url);
	window.location.href = url;
}

function callAuthorizationAPI(body) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret));
	xhr.send(body);
	xhr.onload = handleAuthResponse;
}

function handleAuthResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		console.log(data);
		var data = JSON.parse(this.responseText);
		if (data.access_token != undefined) {
			access_token = data.access_token;
			array[0] = access_token; //Add the city to the array
			var almacenar = JSON.stringify(array); //Stringify the modified array
			localStorage.setItem('Token', almacenar); //Store the stringified array in localStorage
			window.location.href = 'index.html';
		} else {
			console.log(this.responseText);
			alert(this.responseText);
		}
	}
}

function getTrack() {
	Artist = $('#ArtistInput').val();
	Track = $('#TrackInput').val();
	console.log('Button pressed');
	var requesturl = 'https://api.spotify.com/v1/search?q=' + Artist + '%2520track:' + Track + '&type=track&limit=1';
	console.log(requesturl);
	fetch(requesturl, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + access_token },
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(data.tracks.items[0].id);
			getAudioFeatures(data.tracks.items[0].id);
			displayEmbed(data.tracks.items[0].id);
		});
}

function getAudioFeatures(trackid) {
	var trackurl = 'https://api.spotify.com/v1/audio-features/' + trackid;
	fetch(trackurl, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + access_token },
	}).then((response) => {
		console.log(
			response.json().then((data) => {
				console.log(data);
			})
		);
	});
}

function displayEmbed(trackid) {
	var newembed = 'https://open.spotify.com/embed/track/' + trackid + '?utm_source=generator&theme=0';
	$('#embedded-iframe').attr('src', newembed);
}

$('#Search').on('click', getTrack);

/* */
