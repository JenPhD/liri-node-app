var fs = require('fs');

var twitter = require('twitter');
var request = require('request');

//Requiring the twitter keys
var keysTwitter = require('./keys.js');
console.log(keysTwitter);

// Take in the command line arguments
var nodeArgs = process.argv;
var command = nodeArgs[2];
var title = nodeArgs[3];

//Switches for the different commands
switch(command) {
	case 'my-tweets':
		myTwitter();
	break;

	case 'spotify-this-song':
		spotifySearch();
	break;

	case 'movie-this':
		movieSearch();
		break;

	case 'do-what-it-says':
		dothis();
	break;

	default:
	break;
}

//SPOTIFY SEARCH
function spotifySearch () {
	//require npm package
	var spotify = require('spotify');	
		spotify.search({ type: 'track', query: title || 'ace of base the sign' }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	} else {
    		// Do something with 'data' 
    		//console.log(JSON.stringify(data, null, 2));
    		//console.log(data);
    		//console.log("First result" + data.tracks.items[0]);
    		var spotifyResult = data.tracks.items[0];
    		//ARTIST
    		var artist = spotifyResult.artists[0].name;
    		console.log("Artist: " + artist);
    		//SONG
    		var song = spotifyResult.name;
    		console.log("Song: " + song);
    		//PREVIEW
    		var preview = spotifyResult.preview_url;
    		console.log("Preview link: " + preview);
    		//ALBUM
    		var album = spotifyResult.album.name;
    		console.log("Album: " + album);
    	}
		});
	}


