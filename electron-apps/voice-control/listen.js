var url = '';
var http=require('https');

var songs = ['beethoven.mp3', 'mozart.mp3', 'chopin.mp3'];

var songIndex = 0;

if(annyang) {
    var play = function() {
        document.getElementById("music").play();
    };

    var pause = function() {
        document.getElementById("music").pause();
    };

    var nextSong = function() {
        document.getElementById("music").setAttribute('src', songs[songIndex++]);
        document.getElementById("music").setAttribute('autoplay', true);
    };

    var prevSong = function() {
        document.getElementById("music").setAttribute('src', songs[songIndex--]);
        document.getElementById("music").setAttribute('autoplay', true);
    };

    var request = function() {
        http.get('https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem', function(res){
            var str = '';
            console.log('Response is '+res.statusCode);

            res.on('data', function (chunk) {
                  //console.log('BODY: ' + chunk);
                   str += chunk;
             });

            res.on('end', function () {
                url = JSON.parse(str).preview_url;
                console.log(str);
            });
        });
        
        document.getElementById("music").setAttribute('src', url);
    }

    // Define commands.
    var commands = {
        'play': play,
        'pause': pause,
        'next': nextSong,
        'previous': prevSong,
        'test': request,
    };

    // Initialize annyang with our commands
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();

    //Auto start next song on song end
    //document.getElementById("music").bind('ended', nextSong);
}