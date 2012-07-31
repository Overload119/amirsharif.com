$.fx.step.textShadowBlur = function(fx) {
  $(fx.elem).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px #999'});
};

var things = ['building web applications', 'designing interfaces', 'creating mockups', 'watching movies', 'testing methods', 'eating cereal', 'refactoring', 'reading', 'kissing girls', 'building systems', 'playing StarCraft 2'];
var things_index = 0;

function Shift() {
  if(things_index >= things.length-1) {
    things_index = 0;
  } else {
    things_index++;
  }  

  $('#shift').css({
    'textShadowBlur': 1,
    'opacity': 1
  });
  
  $('#shift').animate({
    'textShadowBlur': 40,
    'opacity': 0
  }, 500, function() {    
    $('#shift').html(things[things_index]);
    
    $('#spacer').html($('#shift').parent().text());  
    var new_width = $('#spacer').width();
    
    $('#shift').parent().css({
      'width': new_width + 'px'
    });  
  
    $('#shift').animate({
      'textShadowBlur': 0,
      'opacity': 1
    }, 500);
  });
  setTimeout(Shift, 3000);
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
        setTimeout(Shift, 8000);        
      });
      clearTimeout(t);
    }, 1000);
  });
}

$(document).ready(function() {
  $('.fake_container a').click(function() {
    alert('Nope!');
  });    
  
  setTimeout(Reveal, 12000);
});