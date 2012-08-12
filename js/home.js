$.fx.step.textShadowBlur = function(fx) {
  $(fx.elem).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px #999'});
};

var things = ['building web applications', 'designing interfaces', 'creating mockups', 'watching movies', 'testing methods', 'eating cereal', 'refactoring', 'reading', 'proving theorems', 'kissing girls', 'building systems', 'playing StarCraft 2', 'Redditing', 'learning'];
var things_index = 0;

function GetTextWidth(text) {
  $('#spacer').html(text);
  var width = $('#spacer').width();
  return width;
}

var _shift;
function Shift() {
  if(things_index >= things.length-1) {
    things_index = 0;
  } else {
    things_index++;
  }  
  var next_thing = things[things_index];
  
  // Get the width we have to change to accomodate the new thing
  var _temp = $('#shift').html();
  $('#shift').html(next_thing);
  var width = GetTextWidth($('#shift').parent().text());
  $('#shift').html(_temp);
  
  $('#shift').css({
    'textShadowBlur': 1,
    'opacity': 1
  });
  
  // Fade out
  $('#shift').stop().animate({
      'textShadowBlur': 40,
      'opacity': 0
    }, 500, function() {    
    // Adjust size
    $('#shift').parent().animate({
      'width': width + 'px'
    }, 200, function() {
      // Fade In
      $('#shift').html(next_thing);
    
      $('#shift').animate({
        'textShadowBlur': 0,
        'opacity': 1
      }, 500);
    });  
  });  

  if(_shift) {
    clearTimeout(_shift);
  }
  _shift = setTimeout(Shift, 3000);
}

function Reveal() {
  var height = $('.fake_container').height();
  $('.fake_container').animate({
    'top': '100px'
  }, 500, function() {
    var t = setTimeout(function() {
      $('.fake_container').animate({
        'top': height
      }, 2000, function() {
        $('.fake_container').hide();   
        setTimeout(Shift, 5000);
        $.cookie('show_front', 'no');
        $('#header').fadeIn(150);
      });
      clearTimeout(t);
    }, 1000);
  });
}

$(document).ready(function() {
  $('.fake_container a').click(function() {
    alert('Nope!');
  });    
  
  if($.cookie('show_front') === 'no') {
    $('.fake_container').hide();
    $('.welcome').hide();
    $('.welcome').next().hide();
  }
  
  setTimeout(Reveal, 4000);
});