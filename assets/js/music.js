/**
 * Este script busca la letra de las canciones utilizando el api de MusixMatch 
 * a partir del nombre de la cancion y artista.
 * Referencia https://developer.musixmatch.com/
 * @author Julio César Del Ángel
 * @version 1.0
 */

/**
 * Definicion de variables globales, Urls de api, y api keys.
 */
var cors            = "https://cors-anywhere.herokuapp.com/";
var apikey          = "9ffbe6147c3d611e3a0048e57074efe8";
var trackUrlMusix   = cors + "https://api.musixmatch.com/ws/1.1/track.search?apikey="+apikey+"&f_has_lyrics=1&q_track="
var lyricsUrlMusix  = cors +"https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey="+apikey+"&track_id=";
var trackIdMusix;
var lyricsBody;

/**
 * funcion que escribe el resultado de la busqueda en directamente en el pancel de mensajes de la pagina 
 * en el ID="lyricsMusixmatch"
 * @param {string del nombre de la cancion a buscar} trackName 
 * @param {string del nombre del artista a buscar} TrackArtistName 
 * @returns String- de la letra de la cancion encontrada o mensaje de error o de no encontrado segun el caso.
 *          
 */
function getLirycs(trackName, TrackArtistName){
    trackIdMusix= null;
    lyricsBody  = null;
    var trackUrl = trackUrlMusix +trackName+"&q_artist="+TrackArtistName;
    $("#lyricsMusixmatch").attr("style","color:white;");
    /**
     * Llamado a la busqueda de la cancion y artista
     */
    fetch(trackUrl, {
        headers: { "Access-Control-Allow-Origin": "*"} })
    .then(function (response)  {
    return response.json();
    }).then (function(data){ 
        
        if (data !== null && data.message.header.status_code == 200 && data.message.body.track_list.length > 0){
            trackIdMusix = data.message.body.track_list[0].track.track_id;
        }
        else{            
            $("#lyricsMusixmatch").text("No track found for : "  + trackName + "/"+TrackArtistName);
        }
        

    }).then(function(){
        var lyricsUrl =  lyricsUrlMusix + trackIdMusix;;
        /**
         * Llamado a la busqueda de la letra de la cancion segun el {track_id} devuelto de la busqueda de cancion y
         * artista
         */
        fetch(lyricsUrl)
        .then(function (response)  {
        return response.json();
        }).then (function(data){ 
            if (data !== null && data.message.header.status_code == 200 && data.message.body.lyrics.lyrics_body.trim().length > 0 ){
                lyricsBody = data.message.body.lyrics.lyrics_body;
                /**
                 * Escritura de la letra de la cancion
                 */
                $("#lyricsMusixmatch").text(lyricsBody);
            }
            else{
                /**
                 * Escritura del mensaje de que no encontro resultados
                 */
                $("#lyricsMusixmatch").text("No lyrics found for : "  + trackName + "/"+TrackArtistName);
            }
        });

    } );
    return;
}//cierre de la funcion