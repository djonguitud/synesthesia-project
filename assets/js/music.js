var lyricsurl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=9ffbe6147c3d611e3a0048e57074efe8";



fetch(lyricsurl)
    .then(function (response)  {
       return response.json();
    }).then (function(data){ console.log(data); });

    