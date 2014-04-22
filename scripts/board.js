define(['cell', 'libs/jquery'], function (Cell, $) {
    var Board = function(rows, cols) {
    	
    	// Properties
    	this.rows = rows;
    	this.cols = cols;

    	//Private variables
    	var cells = [];

    	this.getCells = function() {
    		return cells;
    	};

    	this.setCells = function(value) {
    		cells = value;
    	};

    	(function() {
    		var i, j, colArray, cell;
	    	for (i = 0; i < rows; ++i) {
	    		colArray = [];
	    		for (j = 0; j < cols; ++j) {
	    			cell = new Cell(i, j, false);
	    			colArray.push(cell);
	    		}
	    		cells.push(colArray);
	    	}
    	}());
    }

    Board.prototype.getCellState = function(row, col) {
    	var cells = this.getCells();
    	if (0 <= row && row < this.rows) {
    		if (0 <= col && col < this.cols) {
    			return cells[row][col].alive;
    		}
    	}
    }

    Board.prototype.getCell = function(row, col) {
    	var cells = this.getCells();
    	if (0 <= row && row < this.rows) {
    		if (0 <= col && col < this.cols) {
    			return cells[row][col];
    		}
    	}
    };

    Board.prototype.setCellState = function(row, col, state) {
    	var cells = this.getCells();
    	if (0 <= row && row < this.rows) {
    		if (0 <= col && col < this.cols) {
    			cells[row][col].alive = state;
    		}
    	}
    }

    Board.prototype.livingNeighbors = function(cell) {
    	var i, j;
    	var neighbors = [];
    	var tempCell;

    	var x = cell.getRow() - 1;
    	var y = cell.getCol() - 1;
    	var xBackup = x;

    	for (i = 0; i < 3; ++i) {
    		for (j = 0; j < 3; ++j) {
    			tempCell = this.getCell(x, y);
    			if (tempCell && !cell.equals(tempCell) && tempCell.alive) {
    				neighbors.push(tempCell);
    			}
    			x++;
    		}
    		x = xBackup;
    		y++;
    	}
    	return neighbors;
    }

    Board.prototype.copy = function() {
    	var board = new Board(this.rows, this.cols);
    	var i, j;
    	for (i = 0; i < this.rows; ++i) {
    		for (j = 0; j < this.cols; ++j) {
    			board.setCellState(i, j, this.getCellState(i, j));
    		}
    	}
    	return board;
    };

    return Board;
});