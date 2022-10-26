var cors = "https://cors-anywhere.herokuapp.com/";
var apikey = "9ffbe6147c3d611e3a0048e57074efe8";

var trackUrlMusix = cors + "https://api.musixmatch.com/ws/1.1/track.search?apikey="+apikey+"&f_has_lyrics=1&q_track="

var lyricsUrlMusix = cors +"https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey="+apikey+"&track_id=";


var trackIdMusix ;
var lyricsBody;


function getLirycs(trackName)
{
    var trackUrl = trackUrlMusix +trackName;

    fetch(trackUrl)
    .then(function (response)  {
    return response.json();
    }).then (function(data){ 
        console.log(data);
        console.log(data.message.body.track_list[0].track.track_id);
        trackIdMusix = data.message.body.track_list[0].track.track_id;

    }).then(function(){
        var lyricsUrl =  lyricsUrlMusix + trackIdMusix;

        console.log(lyricsUrl);
        fetch(lyricsUrl)
        .then(function (response)  {
        return response.json();
        }).then (function(data){ 
            console.log(data);
            lyricsBody = data.message.body.lyrics.lyrics_body;
            console.log(lyricsBody);

            console.log(lyricsMusixmatch);
            $("#lyricsMusixmatch").text(lyricsBody);

        });

    } );

    return lyricsBody;
}


function init()
{
        //lirycsdisplay
        getLirycs("lamento boliviano");
}

//init ();