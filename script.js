var originalCard = $('.card').clone();

function callApi(search) {
  $('#wiki-results').empty();
  $('.button-positioning').addClass('up');
  $('.noReturn-formating').addClass('hidden');
  $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages%7Cinfo&generator=search&exsentences=1&exlimit=20&exintro=1&explaintext=1&piprop=original&pilimit=50&inprop=url&gsrsearch=' + encodeURIComponent(search) + '&callback=?', function(data) {
    console.log(data);
    if (data.query && data.query.pages) {
      $('.overlayOff').addClass('overlayOn');
      for (var key in data.query.pages) {
        if (data.query.pages.hasOwnProperty(key)) {
          var obj = data.query.pages[key];
          var copiedCard = originalCard.clone();
          $(copiedCard).attr('href', obj.fullurl);
          $(copiedCard).find('.cardTitle').text(obj.title);
          $(copiedCard).removeClass('hidden');
          $(copiedCard).appendTo('#wiki-results');
          $(copiedCard).on('mouseover', { // Passing data to the handler (closure)
            extract: obj.extract
          }, function(event) {
            if (event.data.extract) {
              $(this).find('.cardTitle').addClass('extracted-text').text(event.data.extract);
            }
            $('.card').addClass('opacityCard');
            $(this).removeClass('opacityCard');
          });
          $(copiedCard).on('mouseleave', {
            title: obj.title
          }, function(event) {
            $(this).find('.cardTitle').removeClass('extracted-text').text(event.data.title);
            $('.card').removeClass('opacityCard');
          });
        }
      }
    } else {
      $('.overlayOff').addClass('overlayOn');
      $('.noReturn-formating').removeClass('hidden');
    }
  });
}
function clear() {
  $('#search-button').focus();
  $('#search-input').removeClass('open');
  $('#wiki-results').empty();
  $('.overlayOff').removeClass('overlayOn');
  $('body').addClass('webpage-background');
  $('.noReturn-formating').addClass('hidden');
}
$(document).ready(function() {
  $('#search-button').on('click', function() {
    var search = $('#search-input').val();
    if ($('#search-input').hasClass('open') && search === '') {
      clear();
    } else if ($('#search-input').hasClass('open') && search !== '') {
      callApi(search);
    } else {
      $('#search-input').addClass('open').focus();
    }
  });
  $('#search-input').keyup(function(event) {
    var search = $('#search-input').val();
    if (event.keyCode === 13 && search !== '') {
      callApi(search);
    }
    if (event.keyCode === 13 && search === '') {
      clear();
    }
  });
  $('#search-input').focusout(function() {
    setTimeout(function() {
      var search = $('#search-input').val();
      var hasFocus = $('#search-button').is(':focus');
      if (search === '' && !hasFocus) {
        clear();
      }
    }, 100);
  });
});
