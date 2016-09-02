var fs = require('fs');

// Take in the command line arguments
var nodeArgs = process.argv;
var command = nodeArgs[2];
var title = nodeArgs[3];

//Modify search to concatenate strings for songs and movies with multi-word titles
if(process.argv.length >= 4) {
	for(i = 4; i < nodeArgs.length; i++) {
		title += '+' + nodeArgs[i];
	}
}

//console.log(title);

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
		doThis();
	break;

	default:
	break;
}

  //APPEND EACH COMMAND IN LOG.TXT
  function myLog () {
    //APPEND COMMAND AND NEW LINE
    fs.appendFile('log.txt', command + "\n", function(err) {
      // If an error was experienced we say it.
      if(err){
        console.log(err);
        // If no error is experienced, we'll append the command to log.txt.   
      } else {
        console.log("Command added!");
      }
    }); 
    //APPEND TITLE IF THERE IS ONE IN LOG.TXT
    if (title != null) {
      //APPEND TITLE AND NEW LINE
      fs.appendFile('log.txt', title + "\n", function(err) {
        // If an error was experienced we say it.
        if(err){
          console.log(err);
          // If no error is experienced, we'll append the twitterFeed to log.txt.   
        } else {
          console.log("Title added!");
        }
      }); 
    }
  }

	//TWITTER FEED
	function myTwitter() {
		//APPEND NODE ARGUMENTS TO LOG.TXT
    myLog();
    //require npm package
    var Twitter = require('twitter');
    //Get twitter keys
		var keys = require('./keys.js');
		//Search for my twitter handle
    var params = {screen_name: 'DrJcode'};
    //console.log(params);
    var client = new Twitter({
      		consumer_key: keys.twitterKeys.consumer_key,
      		consumer_secret: keys.twitterKeys.consumer_secret,
      		access_token_key: keys.twitterKeys.access_token_key,
      		access_token_secret: keys.twitterKeys.access_token_secret
    	}); 
    	//console.log(client);
    	client.get('statuses/user_timeline', params, function(error, tweets, response) {
      		if (!error) {
        		for (var i = 0; i < tweets.length; i++) {
          		console.log(tweets[i].text);
              var twitterFeed = tweets[i].text;  
              //APPEND DATA TO LOG.TXT
                fs.appendFile('log.txt', twitterFeed + "\n", function(err) {
                  // If an error was experienced we say it.
                  if(err){
                    console.log(err);
                   // If no error is experienced, we'll append the twitterFeed to log.txt.   
                  } else {
                    //console.log("twitterFeed added!");
                  }
                });           
        		}
      		}
    	});      
    }

	//SPOTIFY SEARCH
	function spotifySearch () {
		//APPEND NODE ARGUMENTS TO LOG.TXT
    myLog();
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
      //APPEND DATA TO LOG.TXT
      fs.appendFile('log.txt',
        artist + "\n" +
        song + "\n" +
        preview + "\n" +
        album + "\n"
        , function(err) {
        // If an error was experienced we say it.
        if(err){
          console.log(err);
          // If no error is experienced, we'll append the twitterFeed to log.txt.   
        } else {
          console.log("song added!");
        }
      });      
		});
	}

	//MOVIE SEARCH
	function movieSearch () {
		//APPEND NODE ARGUMENTS TO LOG.TXT
    myLog();
    //npm package
		var request = require('request');
		//
		var movieUrl = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&tomatoes=true&r=json';
		var nobodyUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&tomatoes=true&r=json';
		//console.log(movieUrl);
		//If the user enters a title
		if (title != null) {
    		request(movieUrl, function (error, response, body) {	
          //MAKE VARIABLES TO STORE DATA
          var movieTitle = JSON.parse(body)["Title"];
          var movieYear = JSON.parse(body)["Year"];
          var imdbRating = JSON.parse(body)["imdbRating"];
          var movieCountry = JSON.parse(body)["Country"];
          var movieLanguage = JSON.parse(body)["Language"];
          var moviePlot = JSON.parse(body)["Plot"];
          var actors = JSON.parse(body)["Actors"];
          var rtRating = JSON.parse(body)["tomatoRating"];
          var rtUrl = JSON.parse(body)["tomatoURL"];
          //APPEND DATA TO LOG.TXT
            fs.appendFile('log.txt',
              movieTitle + "\n" +
              movieYear + "\n" +
              imdbRating + "\n" +
              movieCountry + "\n" +
              movieLanguage + "\n" +
              moviePlot + "\n" +
              actors + "\n" +
              rtRating + "\n" +
              rtUrl + "\n"
              , function(err) {
              // If an error was experienced we say it.
              if(err){
                console.log(err);
                // If no error is experienced, we'll append the twitterFeed to log.txt.   
              } else {
                console.log("movie added!");
              }
            });      
      			// If the request does not return an error, successful 200
      			if (!error && response.statusCode == 200) {
              		// Parse, get the output
              		//console.log(JSON.parse(body));
              		//MOVIE TITLE
              		console.log("Movie Title: " + movieTitle);
              		//YEAR
              		console.log("Year: " + movieYear);
              		//IMDB
              		console.log("IMDB Rating: " + imdbRating);
              		//COUNTRY
              		console.log("Country of Production: " + movieCountry);
              		//LANGUAGE
              		console.log("Language: " + movieLanguage);
              		//PLOT
              		console.log("Plot: " + moviePlot);
              		//ACTORS
              		console.log("Actors: " + actors);
              		//ROTTEN TOMATOES RATING
              		console.log("Rotten Tomatoes Rating: " + rtRating);
              		//ROTTEN TOMATOES URL
              		console.log("Rotten Tomatoes URL: " + rtUrl);
            	};              
      		});
			// if user doesn't enter a title, make title Mr. Nobody
    	} else {
      		request(nobodyUrl, function (error, response, body) {
            //MAKE VARIABLES TO STORE DATA
          var movieTitle = JSON.parse(body)["Title"];
          var movieYear = JSON.parse(body)["Year"];
          var imdbRating = JSON.parse(body)["imdbRating"];
          var movieCountry = JSON.parse(body)["Country"];
          var movieLanguage = JSON.parse(body)["Language"];
          var moviePlot = JSON.parse(body)["Plot"];
          var actors = JSON.parse(body)["Actors"];
          var rtRating = JSON.parse(body)["tomatoRating"];
          var rtUrl = JSON.parse(body)["tomatoURL"];
          //APPEND DATA TO LOG.TXT
            fs.appendFile('log.txt',
              movieTitle + "\n" +
              movieYear + "\n" +
              imdbRating + "\n" +
              movieCountry + "\n" +
              movieLanguage + "\n" +
              moviePlot + "\n" +
              actors + "\n" +
              rtRating + "\n" +
              rtUrl + "\n"
              , function(err) {
              // If an error was experienced we say it.
              if(err){
                console.log(err);
                // If no error is experienced, we'll append the twitterFeed to log.txt.   
              } else {
                console.log("movie added!");
              }
            });      
        		// If the request does not return an error, successful 200 
       			if (!error && response.statusCode == 200) {
              		//console.log(JSON.parse(body));
              		//MOVIE TITLE
              		console.log("Movie Title: " + movieTitle);
              		//YEAR
              		console.log("Year: " + movieYear);
              		//IMDB
              		console.log("IMDB Rating: " + imdbRating);
              		//COUNTRY
              		console.log("Country of Production: " + movieCountry);
              		//LANGUAGE
              		console.log("Language: " + movieLanguage);
              		//PLOT
              		console.log("Plot: " + moviePlot);
              		//ACTORS
              		console.log("Actors: " + actors);
              		//ROTTEN TOMATOES RATING
              		console.log("Rotten Tomatoes Rating: " + rtRating);
              		//ROTTEN TOMATOES URL
              		console.log("Rotten Tomatoes URL: " + rtUrl);
            	};
      		});
    	}            
  	}

  	//DO WHAT IT SAYS
  	function doThis (){
  		//APPEND NODE ARGUMENTS TO LOG.TXT
      myLog();
      //require spotify to search for song in text file
  		fs.readFile("random.txt", "utf8", function(error, data) {
  			//console.log(data);
        //remove quotation marks
  			randomString = data.replace(/["]+/g,'');
  			//split on comma
      	randomSplit = randomString.split(",");
      	//console.log(randomSplit);
        var stringTitle = randomSplit[1].trim(' ');
        //console.log(stringTitle);
        var title = stringTitle;
        //console.log(title);
        var spotify = require('spotify'); 
        spotify.search({ type: 'track', query: title || 'ace of base the sign' }, function(err, data) {
          if ( err ) {
            console.log('Error occurred: ' + err);
            return;
          } else {
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
          //APPEND DATA TO LOG.TXT
          fs.appendFile('log.txt',
            artist + "\n" +
            song + "\n" +
            preview + "\n" +
            album + "\n"
            , function(err) {
            // If an error was experienced we say it.
            if(err){
              console.log(err);
              // If no error is experienced, we'll append the twitterFeed to log.txt.   
            } else {
              console.log("song added!");
            }
          });      
        });      
      });   
  	}

