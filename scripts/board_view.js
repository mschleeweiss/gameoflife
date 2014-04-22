define(function () {

    var BoardView = function(rows, cols, cellSize, lineWidth, board) {

    	//Private variables
    	var cols = cols;
    	var rows = rows;
    	var cellSize = cellSize;
    	var lineWidth = lineWidth;
    	var board = board;
    	var canvas = document.getElementById('canvas');

    	this.getCols = function() {
    		return cols;
    	};

    	this.getRows = function() {
    		return rows;
    	};

    	this.getCellSize = function() {
    		return cellSize;
    	};

    	this.getBoard = function() {
    		return board;
    	};
    	
    	this.getCanvas = function() {
    		return canvas;
    	};
    	
    	this.getLineWidth = function() {
    		return lineWidth;
    	};

    	// Init
    	(function() {
	    	var ctx;
	    	var i, j, x, y;

	    	canvas.width = cols * (cellSize + lineWidth) + lineWidth;
			canvas.height = rows * (cellSize + lineWidth) + lineWidth;

	    	ctx = canvas.getContext('2d');
	    	ctx.beginPath();

	    	for (var i = 0; i <= rows; ++i) {
	    		y = Math.floor(i * (lineWidth + cellSize)) + 0.5;
	    		ctx.moveTo(0, y);
	    		ctx.lineTo(canvas.width, y)
	    	}

	    	for (var j = 0; j <= cols; ++j) {
	    		x = Math.floor(j * (lineWidth + cellSize)) + 0.5;
	    		ctx.moveTo(x, 0);
	    		ctx.lineTo(x, canvas.height);
	    	}

		    ctx.closePath();
		    ctx.stroke();
	    }());

	    this.update();
    }

    BoardView.prototype.update = function() {
    	var i, j, x, y, state;
    	var ctx = this.getCanvas().getContext('2d');
    	var board = this.getBoard();
    	var size = this.getCellSize();
    	var rows = this.getRows();
    	var cols = this.getCols();
    	var lineWidth = this.getLineWidth();

    	var colorDead = 'rgb(44, 53, 57)';
    	var colorAlive = 'rgb(92, 179, 255)';

    	for (i = 0; i < rows; ++i) {
    		for (j = 0; j < cols; ++j) {
    			state = board.getCellState(i, j);

				y = lineWidth + i * (lineWidth + size);
				x = lineWidth + j * (lineWidth + size);

				ctx.fillStyle = state ? colorAlive : colorDead;
				ctx.fillRect(x, y, size, size);
    		}
    	}
    }

    return BoardView;
});