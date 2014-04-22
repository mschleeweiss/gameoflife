define(['board', 'board_view', 'rules'], function (Board, BoardView, Rules) {
    var board;
    var boardView;
    var running = false;
    var cellSize = 10;
    var lineWidth = 1;

    function init() {
    	var browserWidth = window.innerWidth;
    	var browserHeight = window.innerHeight;

    	var rows = Math.floor((browserHeight - lineWidth) / (cellSize + lineWidth));
    	var cols = Math.floor((browserWidth - lineWidth) / (cellSize + lineWidth));

    	board = new Board(rows, cols);
    	boardView = new BoardView(rows, cols, cellSize, lineWidth, board);

    	
    }

    function handleClick(x, y) {
    	var row = Math.floor(y / (cellSize + lineWidth));
		var col = Math.floor(x / (cellSize + lineWidth));

		var state = board.getCellState(row, col);
		board.setCellState(row, col, !state);

		boardView.update();
    }

    function start() {
    	running = true;

    	generateNewGeneration();
    }

    function generateNewGeneration() {
    	var boardCopy = board.copy();
    	var i, j, cellCopy, neighbors, rule;

    	for (i = 0; i < board.rows; ++i) {
    		for (j = 0; j < board.cols; ++j) {
    			cell = board.getCell(i, j);
    			cellCopy = boardCopy.getCell(i, j);
    			neighbors = boardCopy.livingNeighbors(cell);

    			Rules.applyTo(cell, cellCopy, neighbors);
    		}
    	}

    	boardView.update();

    	if (running) {    	
    		window.setTimeout(generateNewGeneration, 100);
		};
    }



    function stop() {
    	running = false;
    }

    function isRunning() {
    	return running;
    }

    return {
    	init: init,
    	handleClick: handleClick,
    	isRunning: isRunning,
    	start: start,
    	stop: stop
    }
});