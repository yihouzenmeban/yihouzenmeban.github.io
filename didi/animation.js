function showNumAnimation(i, j, num) {

	var numberCell = $('#number-cell-' + i + '-' + j);

	numberCell.css({
		'background-color': getNumBackColor(num),
		'color': getNumColor(num),
		'font-size': 0.5 * cellSideLength
	});
	numberCell.text(num);

	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getTop(i, j),
		left: getLeft(i, j)
	}, 200);
}


function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
	numberCell.animate({
		top: getTop(toX, toY),
		left: getLeft(toX, toY)
	}, 200);
}


function updateScore(score) {
	$('#score').text(score);
}