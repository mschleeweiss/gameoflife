define(function () {

	function applyTo(cell, copy, neighbors) {
		if (copy.alive) {
			if (neighbors.length === 2 || neighbors.length === 3) {
    			cell.alive = true;
    		}
    		else {
    			cell.alive = false;
    		};
		}
		else {
			if (neighbors.length === 3) {
    			cell.alive = true;
    		};
		}
	}

    return {
        applyTo: applyTo
    }
});