// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
var mustache_style = 0;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'RequestCancelAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function() {

  // Preload the image
  var canvas    = document.getElementById( 'mustache' );
  var c         = canvas.getContext( '2d' );

  var width     = canvas.width;
  var height    = canvas.height;

  var imageOne  = new Image();
  imageOne.src  = 'img/movember_1.jpg';
  var imageTwo  = new Image();
  imageTwo.src  = 'img/movember_2.jpg';

  c.font = "20pt Arial";
  c.fillText( 'Loading...', 64, 64 );
  
  imageOne.onload = function() {
    loadUpdate();
  }
  imageTwo.onload = function() {
    loadUpdate();
  }

  var loadCounter = 0;
  function loadUpdate() {
    loadCounter++;
    if(loadCounter === 2) {
      render();
    }
  }

  var mx = 0, my = 0, md = false;
  function onMouseMove( event ) {
    if(event.offsetX) {
      mx = event.offsetX;
      my = event.offsetY;
    }
    else if(event.layerX) {
      mx = event.layerX;
      my = event.layerY;
    }
  }

  function onMouseUp( event ) {
    md = false;
  }

  function onMouseDown( event ) {
    md = true;
  }

  canvas.addEventListener( 'mousemove', onMouseMove, false );
  canvas.addEventListener( 'mousedown', onMouseDown, false );
  canvas.addEventListener( 'mouseup', onMouseUp, false );
  canvas.onselectstart = function() { return false };

  function render() {
    c.clearRect( 0, 0, width, height );

    c.drawImage( imageTwo, 0, 0, width, height );

    c.save();

    c.beginPath();
    if( mustache_style === 0 ) {
      c.arc( mx, my, 75, 0, Math.PI * 2, true );
    }
    else if( mustache_style === 1 ) {
      c.moveTo( mx - 80, my );
      c.lineTo( mx + 80, my );
      c.lineTo( mx + 80, my + 60 );
      c.lineTo( mx - 80, my + 60 );
      c.lineTo( mx - 80, my );
    }
    else if( mustache_style === 2 ) {
      c.moveTo( mx - 10, my );
      c.lineTo( mx + 10, my );
      c.lineTo( mx + 10, my + 60 );
      c.lineTo( mx - 10, my + 60 );
      c.lineTo( mx - 10, my );

      var offset = 45;
      for( var i = 0; i<10; i++ ) {
        c.moveTo( mx - 10 + offset*i, my );
        c.lineTo( mx + 10 + offset*i, my );
        c.lineTo( mx + 10 + offset*i, my + 60 );
        c.lineTo( mx - 10 + offset*i, my + 60 );
        c.lineTo( mx - 10 + offset*i, my );
      }
    }
    else if( mustache_style === 3 ) {
      c.moveTo( mx - 40, my );
      c.lineTo( mx + 40, my );
      c.lineTo( mx + 40, my + 60 );
      c.lineTo( mx - 40, my + 60 );
      c.lineTo( mx - 40, my );

      var offset = 250;
      c.moveTo( mx - 40 + offset, my );
      c.lineTo( mx + 40 + offset, my );
      c.lineTo( mx + 40 + offset, my + 60 );
      c.lineTo( mx - 40 + offset, my + 60 );
      c.lineTo( mx - 40 + offset, my );
    }
    c.closePath();    

    c.clip();

    c.drawImage( imageOne, 0, 0, width, height );

    c.restore();

    window.requestAnimationFrame( render );
  }


})();