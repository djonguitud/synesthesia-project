var cors            = "https://cors-anywhere.herokuapp.com/";
var apikey          = "9ffbe6147c3d611e3a0048e57074efe8";
var trackUrlMusix   = cors + "https://api.musixmatch.com/ws/1.1/track.search?apikey="+apikey+"&f_has_lyrics=1&q_track="
var lyricsUrlMusix  = cors +"https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey="+apikey+"&track_id=";
var trackIdMusix;
var lyricsBody;


function getLirycs(trackName, TrackArtistName){
    //debugger
    trackIdMusix= null;
    lyricsBody  = null;

    var trackUrl = trackUrlMusix +trackName+"&q_artist="+TrackArtistName;
    $("#lyricsMusixmatch").attr("style","color:white;");
    fetch(trackUrl)
    .then(function (response)  {
    return response.json();
    }).then (function(data){ 
        console.log("---track---")
        console.log(data);
        
        if (data !== null && data.message.header.status_code == 200 && data.message.body.track_list.length > 0){
            trackIdMusix = data.message.body.track_list[0].track.track_id;
            console.log(data.message.body.track_list[0].track.track_id);
        }
        else{            
            $("#lyricsMusixmatch").text("No track found for : "  + trackName + "/"+TrackArtistName);
        }
        

    }).then(function(){
        var lyricsUrl =  lyricsUrlMusix + trackIdMusix;;
        console.log(lyricsUrl);
        fetch(lyricsUrl)
        .then(function (response)  {
        return response.json();
        }).then (function(data){ 
            console.log("---lyrics---")
            console.log(data);
            if (data !== null && data.message.header.status_code == 200 && data.message.body.lyrics.lyrics_body.trim().length > 0 ){
                lyricsBody = data.message.body.lyrics.lyrics_body;
                console.log(lyricsBody);
                $("#lyricsMusixmatch").text(lyricsBody);
            }
            else{
                $("#lyricsMusixmatch").text("No lyrics found for : "  + trackName + "/"+TrackArtistName);
            }
        });

    } );
    return;
}