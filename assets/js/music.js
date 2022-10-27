var cors            = "https://cors-anywhere.herokuapp.com/";
var apikey          = "9ffbe6147c3d611e3a0048e57074efe8";
var trackUrlMusix   = cors + "https://api.musixmatch.com/ws/1.1/track.search?apikey="+apikey+"&f_has_lyrics=1&q_track="
var lyricsUrlMusix  = cors +"https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey="+apikey+"&track_id=";
var trackIdMusix;
var lyricsBody;

async function getTrackAsync (trackName, TrackArtistName){
    var requestUrl = trackUrlMusix +trackName+"&q_artist="+TrackArtistName;
    var response = await fetch(requestUrl);
    var data = await response.json();
    console.log("---trackAsync---");
    console.log(data);
    return data;
}

async function getDataLirycsAsyc (trackIdMusixParm){
    var requestUrl = lyricsUrlMusix + trackIdMusixParm;
    var response = await fetch(requestUrl);
    var data = response.json();
    console.log("---dataLyricAsync---");
    console.log(data);
    return data;
}

async function getLirycsAsyc(trackName, TrackArtistName){
    trackIdMusix = null;
    var dataTrack = await getTrackAsync(trackName, TrackArtistName);
    if (dataTrack !== null && dataTrack.message.header.status_code == 200 && dataTrack.message.body.track_list.length > 0){
        debugger
        trackIdMusix = dataTrack.message.body.track_list[0].track.track_id;        
        if (trackIdMusix !== null ){
            var dataLirycs = await getDataLirycsAsyc(trackIdMusix)
            if (dataLirycs !== null && dataLirycs.message.header.status_code == 200){
                lyricsBody = dataLirycs.message.body.lyrics.lyrics_body;
                console.log(lyricsBody);                
                $("#lyricsMusixmatch").text(lyricsBody);
            }
            else{
                $("#lyricsMusixmatch").text("No Track - Lyrics found for : "  + trackName + "/"+TrackArtistName);
            }
        }
        else{
            $("#lyricsMusixmatch").text("No Lyrics found for : "  + trackName + "/"+TrackArtistName);
        }
    }
    else{
        $("#lyricsMusixmatch").text("No Track found for : "  + trackName + "/"+TrackArtistName);
    }
}