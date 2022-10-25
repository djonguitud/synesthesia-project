
var lyricsUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=49403957&apikey=9ffbe6147c3d611e3a0048e57074efe8";

var trackUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=9ffbe6147c3d611e3a0048e57074efe8&q_track=hotel california&f_has_lyrics=1"

var trackIdMusix ;
var lyricsBody;


function getlirycs (trackName)
{
    var trackUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=9ffbe6147c3d611e3a0048e57074efe8&q_track="+trackName+"&f_has_lyrics=1";

    fetch(trackUrl)
    .then(function (response)  {
    return response.json();
    }).then (function(data){ 
        console.log(data);
        console.log(data.message.body.track_list[0].track.track_id);
        trackIdMusix = data.message.body.track_list[0].track.track_id;

    }).then(function(){
        var lyricsUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+trackIdMusix+"&apikey=9ffbe6147c3d611e3a0048e57074efe8";

        console.log(lyricsUrl);
        fetch(lyricsUrl)
        .then(function (response)  {
        return response.json();
        }).then (function(data){ 
            console.log(data);
            lyricsBody = data.message.body.lyrics.lyrics_body;
            console.log(lyricsBody);

        });

    } );

    return lyricsBody;
}


getLirycs("lamento boliviano");
//lirycsdisplay



    
