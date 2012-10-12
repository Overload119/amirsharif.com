$.fx.step.textShadowBlur = function(fx) {
  $(fx.elem).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px #999'});
};

var things = ['building web applications', 'designing interfaces', 'creating mockups', 'watching movies', 'testing methods', 'eating cereal', 'refactoring', 'reading', 'proving theorems', 'chasing girls', 'building systems', 'playing StarCraft 2', 'Redditing', 'learning'];
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

var hiddenTagDrag = false;
$(document).ready(function() {
  $('.fake_container a').click(function() {
    alert('Nope!');
  });    

  
  if($.cookie('show_front') === 'no' || $.browser.msie ) {
    $('.fake_container').hide();
    $('.hidden_tag').hide();
    $('.welcome').hide();
    $('.welcome').next().hide();
  } else {    
    $('.hidden_tag').mousedown(function(evt) {
      window.scrollTo(0,0);

      $('.hidden_tag').css('box-shadow', 'white 0 0 25px');

      var dy = evt.clientY - $('.hidden_tag').height();

      var mouseMove = function(e) {
        if(document.selection) {
          document.selection.empty();
        } else {
          window.getSelection().removeAllRanges();
        }
        var y = dy + e.clientY;
        $('.hidden_tag').css('top', y + 'px');
        $('.fake_container').css('top', y + 'px');
      };

      hiddenTagDrag = true;
      $(document).on('mousemove', mouseMove);
    });

    $(document).mouseup(function(e) {
      var y = e.clientY;

      if(!hiddenTagDrag) { return; }
      hiddenTagDrag = false;

      if( y > 200 ) {
        var height = $('.fake_container').height();
        $('.fake_container').animate({'top': height + 'px'});
        $('.hidden_tag').animate({'top': height + 'px'});
        $.cookie('show_front', 'no');
      } else {
        $('.fake_container').animate({'top': '0px'});
        $('.hidden_tag').animate({'top': '0px'});
      }

      $('.hidden_tag').css('box-shadow', 'inset #8C0000 0 0 50px');
      $(document).off('mousemove');
    });

    var dropTag = function() {
      $('.hidden_tag').show().animate({
        top: '0px'
      }).animate({
        top: '-5px'
      });
    }

    setTimeout(dropTag, 3000);
  }
});