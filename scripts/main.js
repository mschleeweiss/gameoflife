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

	Game.init();

	var canvas = document.getElementById('canvas');
	canvas.addEventListener('click', function(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		Game.handleClick(x, y);
	});

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

});