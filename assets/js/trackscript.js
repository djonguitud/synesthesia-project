var Artist = "Eagles";
var Track = "Hotel California";
var client_id = "71dddef0e17b4ade850d8fd3cf9599d3"; //Spotify client id
var client_secret = "b545088d0642400cbb25a4ec53893875"; //Spotify client secret
const urlauthorize = "https://accounts.spotify.com/authorize"; //Spotify URL to request authorization
// var redirect_uri = "http://127.0.0.1:5500/index.html"; //Redirect uri for Spotify authorization process
var redirect_uri = "https://djonguitud.github.io/synesthesia-project/index.html"; //Redirect uri for Spotify authorization process
var storedToken = []; //Token stored in localStorage
var array = []; //Clean variable
var access_token = ""; //Clean variable
var elementmessage = $("<p>"); //Creation of <p> text
var arraylast = []; //Clean variable
var last = []; //Clean variable

//Function executed when the <body> is loaded
function onPageLoad(){
    storedToken = JSON.parse(localStorage.getItem("Token")); //Get the stored token
    var str = window.location.search; //Find the text after "search" text in the page URL
    //console.log("STRING");
    //console.log(str);
    if (storedToken !== null) { //If there is something in the localStorage
        array = storedToken; //Move the stored Token to an array
        access_token = array[0]; //Move the stored token to a variable
        //console.log("Token ready 2");
        //console.log("Validate last search");
        last = JSON.parse(localStorage.getItem("Last")); //Get the stored last search 
        if (last !== null){ //If there is something in the stored last search
            //console.log(last[0]);
            //console.log("Search last artist/track");
            getTrack(); //Get track information
        }
    } else if (str.length > 0){ //If there wasn't a token in the localStorage and there was a text after "search" text in the page URL
        //console.log("Extract the code needed to get a new token");
        var URLparameters = new URLSearchParams(str); //Get the URL search parameters from the text
        code = URLparameters.get("code"); //Get the code from the URL search parameters
        //Build the body with the parameters for the authorization process call to get Token
        body = "grant_type=authorization_code"; //Grant type = authorization code
        body += "&code=" + code; //Include the code extracted from the URL search parameters
        body += "&redirect_uri=" + encodeURI(redirect_uri); //Place the redirect uri encoded
        body += "&client_id=" + client_id; //Include the Spotify client id
        body += "&client_secret" + client_secret; //Include the Spotify client secret
        callAuthorizationAPI(body); //Call the authorization process to get Token
    }else if (str.length === 0) { //If there wasn't a token in the localStorage and there wasn't any text after "search" text in the page URL
        //console.log("Start authorization process");
        getauthorization(); //Start authorization process to get authorization code
    }
}

//Function to get the authorization code from Spotify API
function getauthorization() { 
    //Build the url to get the authorization code
    let url = urlauthorize; //Use the URL https://accounts.spotify.com/authorize
    url += "?client_id=" + client_id; //Use the Spotify cliend id
    url += "&response_type=code"; //Ask response type = code
    url += "&redirect_uri=" + encodeURI(redirect_uri); //Place the redirect uri encoded
    url += "&show_dialog=false"; //Don't show the dialog
    url += "&scope=user-follow-read"; //Place a basic scope
    //console.log(url);
    window.location.href = url; //Go to the authorization url
}

//Function to request a token from Spotify API
function callAuthorizationAPI(body){
    let xhr = new XMLHttpRequest(); //New XMLHttpRequest
    xhr.open("POST", "https://accounts.spotify.com/api/token", true); //Use URL to get a token for Spotify API
    //Define header parameters for the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhr.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhr.send(body); //Send the body defined
    xhr.onload = handleAuthResponse; //When loaded handle authorization response
} 

//Handle authorization response to get the access token
function handleAuthResponse(){
    if ( this.status == 200 ){ //If response status is 200
        var data = JSON.parse(this.responseText); //parse the response into data
        //console.log(data);
        if ( data.access_token != undefined ){ //If the access token is different to undefined
            access_token = data.access_token; //Get the access token into a variable
            array[0] = access_token; //Add the access token to the array
            var almacenar = JSON.stringify(array); //Stringify the modified array
            localStorage.setItem("Token", almacenar); //Store the stringified array in localStorage
            window.location.href = "index.html" //Go to index.html
        }
        else { //The access token is undefined
            //console.log(this.responseText);
            //console.log("No token was generated");
            window.location.href = "index.html" //Go to index.html
        }
    }
}

//Function to get the track
function getTrack(){
    $("p").remove(".message"); //Remove the <p> element with class "message"
    $("#lyricsMusixmatch").html(""); //Clean the element with id "lyricsMusixmatch"
    //console.log(last);
    if (last === null){ //If there is no data in the last search
        //console.log("Get data from inputs"); 
        Artist = $("#ArtistInput").val(); //Get Artist from the input
        Track = $("#TrackInput").val(); //Get the Track from the input
    }else{ //If there is data in the last search
        //console.log("Data in localStorage");
        Artist = last[0].Art; //Get the Artist from the array got from localStorage
        Track = last[0].Tck; //Get the Track from the array got from localStorage
    }

    //console.log("Search");
    //Comment
    if (Artist !== "" && Track !== ""){ //If the artist and track were provided
        //Generate the request URL using both parameters
        var requesturl = "https://api.spotify.com/v1/search?q=" + Artist + "%20artist:" + Artist + "%20track:" + Track + "&type=track&limit=1&include_external=audio";
    } else if (Artist !== "" && Track === ""){ //If only the artist was provided
        //Generate the request URL using only the artist
        var requesturl = "https://api.spotify.com/v1/search?q=" + Artist + "%20artist:" + Artist + "&type=track&limit=1&include_external=audio";
    } else if (Artist === "" && Track !== ""){ //If only the track was provided
        //Generate the request URL using only the track
        var requesturl = "https://api.spotify.com/v1/search?q=" + Track + "%20track:" + Track + "&type=track&limit=1&include_external=audio";
    }
    //Clean the item Last from localStorage
    localStorage.removeItem("Last");
    //console.log(requesturl);
    fetch(requesturl, { //Fetch the request URL
        method: 'GET', headers: { 'Authorization': "Bearer " + access_token} //Place the access token in the GET method header
            })
    .then( function (response) {
        //console.log(response.status);
        if (response.status === 401){ //If the token has expired
            localStorage.removeItem("Token"); //Remove the item Token from the localStorage
            var lastSearch = { //Create an object to store the last search made by the user
                Art: Artist,
                Tck: Track
            };
            arraylast[0] = lastSearch; //Change the arraylast with the new object created
            var almacenarlast = JSON.stringify(arraylast); //Stringify the modified arraylast
            localStorage.setItem("Last", almacenarlast); //Store the last search in the localStorage
            getauthorization(); //Start authorization process to get new token
        }
        return response.json(); 
    }).then( function (data) {
        //console.log(data);
        if (data.tracks.items.length > 0){ //If the response data contains a track
            //console.log(data.tracks.items[0].id); 
            Artist = data.tracks.items[0].artists[0].name; //Overwrite the Artist
            Track = data.tracks.items[0].name; //Overwrite the Track
            getAudioFeatures(data.tracks.items[0].id); //Get the audio features of the track using the track id
            displayEmbed(data.tracks.items[0].id); //Display the track as embedded using the track id
        } else {
            elementmessage.text("No tracks were found for your search, please try with different values"); //Define the text for the dynamic <p> element created
            elementmessage.attr("style", "color:white; text-align:center;"); //Define style for the dynamic <p> element created
            elementmessage.addClass("message"); //Add class "message" to the dynamic <p> element
            $("#lyricsMusixmatch").append(elementmessage); //Append dynamic <p> element to element with id "lyricsMusixmatch"
        }
    });

}

//Function to get audio features using the track id
function getAudioFeatures(trackid){
    var trackurl = "https://api.spotify.com/v1/audio-features/" + trackid; //Create the URL to request the audio features using the track id
    fetch(trackurl, {
        method: 'GET', headers: { 'Authorization': "Bearer " + access_token} //Place the access token in the GET method header
        })
        .then(function (response) {
            //console.log(response.status);
            if (response.status === 401){ //If the token has expired
                localStorage.removeItem("Token"); //Remove the item Token from the localStorage
                var lastSearch = { //Create an object to store the last search made by the user
                    Art: Artist,
                    Tck: Track
                };
                arraylast[0] = lastSearch; //Change the arraylast with the new object created
                var almacenarlast = JSON.stringify(arraylast); //Stringify the modified arraylast
                localStorage.setItem("Last", almacenarlast); //Store the last search in the localStorage
                getauthorization(); //Start authorization process to get new token
            }
            return response.json();
        }).then(function (data) { 
            //console.log(data);
            var valence = data.valence; //Get the valence parameter
            var energy = data.energy; //Get the energy parameter
            //console.log(valence);
            //console.log(energy);
            genColor(energy, valence); //Call function of color generation using energy and valence
            getLirycs(Track,Artist); //Get Lyrics using the Track and Artist
        });
}

//Function to display the track embedded
function displayEmbed(trackid) {
    var newembed = "https://open.spotify.com/embed/track/" + trackid + "?utm_source=generator&theme=0"; //Generate the URL for the embed using the track id
    $("#embedded-iframe").attr("src", newembed); //Place the url for the embed in the <iframe> element with id "embedded-iframe"
}


$('#Search').on('click', getTrack);


