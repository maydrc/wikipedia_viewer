function callApi(search) {
  $('.button-positioning').addClass('up');
  $('.noReturn-formating').addClass('hidden');
  $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages%7Cinfo&generator=search&exsentences=1&exlimit=20&exintro=1&explaintext=1&piprop=original&pilimit=50&inprop=url&gsrsearch=' + search + '&callback=?', function(data) {
    console.log(data);
    if (data.query && data.query.pages) {

    } else {
      $('.noReturn-formating').removeClass('hidden');
    }
  });
}
$(document).ready(function() {
  $('#search-button').on('click', function() {
    var search = $('#search-input').val();
    if ($('#search-input').hasClass('open') && search === '') {
      $('#search-input').removeClass('open');
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
      $('#search-input').removeClass('open');
      $('#search-button').focus();
    }
  });
  $('#search-input').focusout(function() {
    setTimeout(function() {
      var search = $('#search-input').val();
      var hasFocus = $('#search-button').is(':focus');
      if (search === '' && !hasFocus) {
          $('#search-input').removeClass('open');
      }
    }, 100);
  });
});
