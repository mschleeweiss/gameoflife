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

	var lastUsedButton;

	init();

	function initCanvas() {
		$('canvas').click(function(e) {
			var x = e.pageX - $(this).offset().left;
			var y = e.pageY - $(this).offset().top;
			Game.handleClick(x, y);
		});
	}

	function initMenubar() {
		$('#btn_play').click(function() {
			start();
		}).hover(larger, smaller);

		$('#btn_pause').click(function() {
			pause();
		}).hover(larger, smaller);

		$('#btn_reset').click(function() {
			reset();
		}).hover(larger, smaller).css({
			opacity: 1
		});

		function larger() {
			$(this).animate({
				opacity: '1'
			});
		}

		function smaller() {
			if ($(this)[0] !== lastUsedButton[0]) {
				$(this).animate({
					opacity: '0.5'
				});
			};
		}
	}

	function initKeyListener() {
		$(document).keyup(function(e) {
			if (e.which === 83) {
				start();
			}
			else if (e.which === 80) {
				pause();
			}
			else if (e.which === 82) {
				reset();
			}
		});
	}

	function start() {
		if (!Game.isRunning()) {
			Game.start();
		};
		toggleOpacity($('#btn_play'));
	}

	function pause() {
		Game.stop();
		toggleOpacity($('#btn_pause'));
	}

	function reset() {
		Game.init();
		toggleOpacity($('#btn_reset'));
	}

	function toggleOpacity(button) {
		var i, tempButton;
		var buttons = [$('#btn_play'), $('#btn_pause'), $('#btn_reset')];

		lastUsedButton = button;

		for (i = 0; i < buttons.length; ++i) {
			tempButton = buttons[i];
			if (tempButton[0] === button[0]) {
				tempButton.css({
					opacity: 1
				});
			}
			else {
				tempButton.css({
					opacity: 0.5
				});
			}
		}
	}

	function init() {
		lastUsedButton = $('#btn_reset');
		Game.init();
		initCanvas();
		initMenubar();
		initKeyListener();
	}
});