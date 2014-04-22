require.config({
    baseUrl: 'scripts',
    paths: {
    	'libs': 'libs'
    },
    shim: {
      	'libs/jquery': {
        	exports: '$'
      	}
    }
});

require(['game'], function(Game) {

	init();

	function initCanvas() {
		$(document).ready(function() {
			$('canvas').click(function(e) {
				var x = e.pageX - $(this).offset().left;
				var y = e.pageY - $(this).offset().top;
				Game.handleClick(x, y);
			});

			$('#hoverbar').hover(showBar, hideBar);

			function showBar() {
				$('#menubar').animate({
					top: "0px"
				});
			}

			function hideBar() {
				var height = $('#menubar').height();
				$('#menubar').animate({
					top: '-' + height + 'px'
				});
			}
		});
	}

	function initKeyListener() {
		$(document).keyup(function(e) {
			if (e.which === 83) {
				if (!Game.isRunning()) {
					Game.start();
				};
			}
			else if (e.which === 80) {
				Game.stop();
			}
		});
	}	

	function init() {
		Game.init();
		initCanvas();
		initKeyListener();
	}
});