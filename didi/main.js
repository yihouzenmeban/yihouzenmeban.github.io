var board = new Array(),
	score = 0,
	startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;


$(document).ready(function() {
	prepareForMobile(); 
	//初始化
	init();
});


function prepareForMobile() {
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	};
	$('.grid-container').css({
		'width': gridContainerWidth - 2 * cellSpace,
		'height': gridContainerWidth - 2 * cellSpace,
		'padding': cellSpace,
		'border-radius': 0.02 * gridContainerWidth
	});
	$('.grid-cell').css({
		'width': cellSideLength,
		'height': cellSideLength,
		'border-radius': 0.02 * cellSideLength
	});
}


function init() {
	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		for(var j = 0; j < 4; j++){
			var gridCell = $('#grid-cell-' + i + '-' + j);
			board[i][j] = 0;
			gridCell.css({
				'top': getTop(i, j),
				'left': getLeft(i, j)
			});
		}
	}
	addOneNum();
	addOneNum();
	updateBoardView();

	score = 0;
	updateScore(score);
}


function updateBoardView() {
	$('.number-cell').remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('.grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j +'"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j),
				myNum;
			if ( board[i][j] === 0) {
				theNumberCell.css({
					'width': 0,
					'height': 0,
					'top': getTop(i, j) + cellSideLength / 2,
					'left': getLeft(i, j) + cellSideLength / 2
				});
			} else {
				if (board[i][j] < 100) {
					myNum = 0.5;
				} else if (board[i][j] < 1000) {
					myNum = 0.4;
				} else if (board[i][j] < 10000) {
					myNum = 0.3;
				} else {
					myNum = 0.2;
				}

				theNumberCell.css({
					'width': cellSideLength,
					'height': cellSideLength,
					'top': getTop(i, j),
					'left': getLeft(i, j),
					'background-color': getNumBackColor(board[i][j]),
					'color': getNumColor(board[i][j]),
					'font-size': myNum * cellSideLength
				});
				theNumberCell.text(board[i][j]);
			}
		}
	}
	$('.number-cell').css({
		'line-height': cellSideLength + 'px'
	});
}


function addOneNum() {
	if (noSpace(board)) {
		return false;
	};

	//随机选择一个空格子
	var count = 0,
		voidGrid = new Array();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if (board[i][j] === 0) {
				voidGrid[count] = i * 4 + j;
				count++;
			};
		}
	}
	var pos = parseInt(Math.floor(Math.random()*count));
	randX = Math.floor(voidGrid[pos] / 4);
	randY = Math.floor(voidGrid[pos] % 4);
	//随机一个数字并显示在格子里
	var randNum = Math.random() < 0.5 ? 2 : 4;
	board[randX][randY] = randNum;
	showNumAnimation(randX, randY, randNum);
}


$(document).keydown(function(event) {
	switch(event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (moveLeft()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()', 300);
			};
			break;
		case 38: //up
			event.preventDefault();
			if (moveUp()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()',300);
			};
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()',300);
			};
			break;
		case 40: //down
			event.preventDefault();
			if (moveDown()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()',300);
			};
			break;
		default: //other
			break;
	}
});


document.addEventListener('touchstart', function(event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});


document.addEventListener('touchemove', function(event) {
	event.preventDefault();
});


document.addEventListener('touchend', function(event) {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltaX = endX - startX,
		deltaY = endY - startY,
		containerY = $('.grid-container').offset().top;
		console.log(containerY);

    if(containerY >= startY) {
        return;
    }

	if (Math.abs(deltaX) < 0.1 * documentWidth && Math.abs(deltaY) < 0.1 * documentWidth) {
		return;
	};

	//move in x
	if (Math.abs(deltaX) >= Math.abs(deltaY)) {
		if (deltaX > 0) {
			//move right
			if (moveRight()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()', 300);
			};
		} else {
			//move left
			if (moveLeft()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()', 300);
			};
		}
	}
	//move in y 
	else {
		if (deltaY > 0) {
			//move down
			if (moveDown()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()', 300);
			};
		} else {
			//move up
			if (moveUp()) {
				setTimeout('addOneNum()', 210);
				setTimeout('isGameOver()', 300);
			};
		}
	}
})


function isGameOver() {
	if (noSpace(board) && noMove(board)) {
		alert('Game Over!');
	};
}


function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	} else {
		for(var i = 0; i < 4; i++){
			for(var j = 1; j < 4; j++){
				if (board[i][j] !== 0) {
					for(var k = 0; k < j; k++){
						if ((board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) || (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board))){
							//move
							showMoveAnimation(i, j, i, k);
							//add
							board[i][k] += board[i][j];
							board[i][j] = 0;
							//add score
							score += board[i][k];
							updateScore(score);
							continue;
						}
					}
				};
			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	}
}


function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	} else {
		for(var i = 0; i < 4; i++){
			for(var j = 2; j >= 0; j--){
				if (board[i][j] !== 0) {
					for(var k = 3; k > j; k--){
						if ((board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) || (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board))){
							//move
							showMoveAnimation(i, j, i, k);
							//add
							board[i][k] += board[i][j];
							board[i][j] = 0;
							//add score
							score += board[i][k];
							updateScore(score);
							continue;
						}
					}
				};
			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	}
}


function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	} else {
		for(var j = 0; j < 4; j++){
			for(var i = 1; i < 4; i++){
				if (board[i][j] !== 0) {
					for(var k = 0; k < i; k++){
						if ((board[k][j] === 0 && noBlockVertical(j, k, i, board)) || (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board))){
							//move
							showMoveAnimation(i, j, k, j);
							//add
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//add score
							score += board[k][j];
							updateScore(score);
							continue;
						}
					}
				};
			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	}
}


function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	} else {
		for(var j = 0; j < 4; j++){
			for(var i = 2; i >= 0; i--){
				if (board[i][j] !== 0) {
					for(var k = 3; k > i; k--){
						if ((board[k][j] === 0 && noBlockVertical(j, k, i, board)) || (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board))){
							//move
							showMoveAnimation(i, j, k, j);
							//add
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//add score
							score += board[k][j];
							updateScore(score);
							continue;
						}
					}
				};
			}
		}
		setTimeout('updateBoardView()', 200);
		return true;
	}
}