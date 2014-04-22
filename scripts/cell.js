define(function () {
    var Cell = function(row, col, alive) {

    	//Public variables
    	this.alive = alive;

    	//Private variables
    	var row = row;
    	var col = col;

    	this.getRow = function() {
    		return row;
    	};

    	this.getCol = function() {
    		return col;
    	};
    }

    Cell.prototype.equals = function(otherCell) {
    	return this.getRow() === otherCell.getRow() && this.getCol() === otherCell.getCol() && this.alive === otherCell.alive;
    };

    return Cell;
});