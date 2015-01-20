$(document).ready(function(){
  "use strict";

  $.getJSON('/data.json', function(data) {
    var $tmpl = $('.tmpl').html();
    var html = Mustache.to_html($tmpl, data);
    var $songsQueue = $('.songs-queue');

    $songsQueue.html(html);

    var actions = {
        play: function(current) {
          var id = $(current).data('id'),
           title = $(current).data('title'),
            song = document.getElementById(id);

          $('.song-select').empty().append('<h1> Now Playing: ' + title + '</h1>');
          $('.fa-stop').addClass('fa-play').removeClass('fa-stop');
          $('audio').addClass('stop');
          $(current).removeClass('fa-play').addClass('fa-stop');
          song.play();
        },
        stop: function(current) {
          var id = $(current).data('id'),
            song = document.getElementById(id);

            $('.song-select').empty().append('<h1>Select a Song</h1>');
          $(current).removeClass('fa-stop').addClass('fa-play');
          $(current).next().removeClass('stop');
          var oldSrc = song.src;
          song.src = "";
          song.src = oldSrc;
        },
        allSongs: function() {
          $('audio').each(function(x, song) {
            var oldSrc = song.src;
            song.src = "";
            song.src = oldSrc;
          });
        }
    };

    $('.songs-queue').on('click', '.fa-play', function() {
      actions.allSongs();
      actions.play(this);
    });

    $('.songs-queue').on('click', '.fa-stop', function() {
      actions.stop(this);
    });
  });
});
