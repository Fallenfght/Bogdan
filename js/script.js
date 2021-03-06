document.addEventListener('DOMContentLoaded', function() {
	const svgBomb = '<svg width="83" height="78" viewBox="0 0 83 78" fill="none" class="bomb-svg" xmlns="http://www.w3.org/2000/svg"><path d="M63.8473 55.2168L68.3163 59.0636" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M14.6557 58.9402L19.3263 55.3403" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M63.8473 20.2379L68.3163 16.3911" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M14.6557 16.5146L19.3263 20.1145" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M41.5364 72.6646V67.7622" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M5.53641 38.3475H12.0819" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M70.991 38.3475H77.5364" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M41.5364 10.5671V5.66464" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><ellipse cx="41.5364" cy="38.3475" rx="26.1818" ry="26.1463" fill="#141414" stroke="black" stroke-width="6.55487"/></svg><svg width="78" height="76" viewBox="0 0 78 76" class="boom-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.5274 59.4282L24.3365 63.3724V57.1037C24.3365 55.2114 22.8025 53.6773 20.9101 53.6773H13.1372L16.6273 47.2716C17.5137 45.6447 16.9463 43.6078 15.3464 42.6735L7.91285 38.3323L15.3464 33.9911C16.1504 33.5215 16.7288 32.745 16.9483 31.8401C17.1678 30.9353 17.0096 29.98 16.5101 29.1942L12.5648 22.9873H19.8685C21.659 22.9873 23.1476 21.6086 23.2848 19.8234L23.9015 11.7976L29.5624 15.1981C31.1057 16.1251 33.1033 15.6997 34.1349 14.2243L38.3972 8.12835L41.9295 14.0223C42.8505 15.5591 44.8 16.1268 46.4022 15.3248L53.9421 11.5506V19.5609C53.9421 21.4532 55.4761 22.9873 57.3685 22.9873H64.0997L60.6096 29.393C59.7232 31.0199 60.2906 33.0568 61.8905 33.9911L69.3241 38.3323L61.8905 42.6735C61.0865 43.1431 60.5082 43.9196 60.2886 44.8245C60.0691 45.7293 60.2273 46.6846 60.7268 47.4704L64.6722 53.6773H57.3685C55.5863 53.6773 54.1017 55.0435 53.9539 56.8195L53.3691 63.8443L47.6745 60.4236C46.0812 59.4666 44.0155 59.9543 43.0185 61.5228L38.9768 67.8812L35.4338 60.7871C35.0001 59.9187 34.2185 59.275 33.283 59.0159C32.3475 58.7568 31.3461 58.9067 30.5274 59.4282Z" fill="#FF9801" stroke="#F44335" stroke-width="6.85282" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.3521 62.318L38.5859 74.8323L45.8586 63.3609L56.2482 69.618L57.2872 57.1037H70.7937L63.521 45.6323L75.9885 38.3323L63.521 31.0323L69.7547 19.5609H57.2872V6.00372L44.8197 12.2609L38.5859 1.83229L31.3132 12.2609L20.9236 6.00372L19.8846 19.5609H6.37811L13.6508 31.0323L1.1833 38.3323L13.6508 45.6323L7.41707 57.1037H20.9236V69.618L32.3521 62.318Z" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.8456 26.8609C26.2733 26.2828 27.2913 23.6358 27.1573 17.4752C34.1666 20.6446 36.1583 19.0785 38.5859 14.3466C42.0185 20.2796 44.4203 21.4177 50.0145 17.4752C50.5796 24.6887 52.7512 26.2787 58.3262 26.8609" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.8847 49.8037C27.3123 50.3818 27.2914 51.986 27.1574 58.1466C34.1666 54.9772 36.1583 56.5432 38.586 61.2752C42.0186 55.3421 45.4593 55.2469 51.0535 59.1894C51.6186 51.9759 53.7903 50.3859 59.3652 49.8037" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	const gameContainer = document.querySelector('.game__container');
	const startButton = document.querySelector('.button-start');
	let row = '<div class="game__row"></div>';
	let cell = '<div class="game__cell"></div>';
	let pointsToWin = {};
	startButton.addEventListener('click', function () {
		const rows = document.querySelector('.game__input-rows>input').value;
		const bombs = document.querySelector('.game__input-bombs>input').value;
		const cellsVal = document.querySelector('.game__input-cells>input').value;
		gameContainer.innerHTML = '';
		gameContainer.className = 'game__container';
		//rows
		for (let index = 0; index < rows; index++) {
			gameContainer.insertAdjacentHTML('afterbegin', row);
		}
		//cells
		let newRow = gameContainer.querySelectorAll('.game__row');
		for (let index = 0; index < newRow.length; index++) {
			const element = newRow[index];
				for (let index = 0; index < cellsVal; index++) {
					cell = '<div class="game__cell" data-number="'+ (String(index)) + '"></div>';
					element.insertAdjacentHTML('afterbegin', cell);
				}
		}
		//set bombs
		for (let index = 0; index < bombs; index++) {
			let randomRow = getRandomInt(newRow.length);
			let newCell  = newRow[randomRow].querySelectorAll('.game__cell');
			let randomCell = newCell[getRandomInt(newCell.length)];
			if (randomCell.bomb == 1) {
				index--;
			} else {
				randomCell.bomb = 1;
			}
		}
		let allCells = document.querySelectorAll('.game__cell');
		let bombsCells = Array.prototype.slice.call(allCells);
		for (let index = 0; index < bombsCells.length; index++) {
			const element = bombsCells[index];
			element.bombSum = 0;
			element.open = 0;
			if (element.bomb != 1) {
				bombsCells.splice(index, 1);
				index--;
			}
		}
		for (let index = 0; index < bombsCells.length; index++) {
			const element = bombsCells[index];
			let activeCells = collectActiveCells(element);
			setPoints(activeCells);
		}
		pointsToWin = Array.prototype.slice.call(allCells);
		for (let index = 0; index < pointsToWin.length; index++) {
			const element = pointsToWin[index];
			if (element.bombSum == 0) {
				pointsToWin.splice(index, 1);
				index--;
			}
		}
		pointsToWin = pointsToWin.length;
		gameContainer.addEventListener('click', leftClick);
		gameContainer.addEventListener('contextmenu', rightClick);
	});
	function leftClick(e) {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains('game__cell')) {
			if (target.open) {
				return;
			} else if (target.bombSum) {
				target.classList.add('_open');
				target.open = 1;
				target.textContent = target.bombSum;
				//win ======================================================
				pointsToWin--;
				if (pointsToWin == 0) {
					win();
					finish(this);
				}
			} else if (target.bomb) {
				//end game =================================================================================================
				target.innerHTML = svgBomb;
				target.classList.add('bomb');
				lose();
				finish(this);
			} else {
				let thisSiblings = collectActiveCells(target);
				openEmpty(thisSiblings);
				if (pointsToWin == 0) {
					win();
					finish(this);
				}
			}
		}
	}
	function rightClick(e) {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains('game__cell')) {

		}
		return false;
	}
	function finish(element) {
		element.removeEventListener('click', leftClick);
		element.removeEventListener('contextmenu', rightClick);
		gameContainer.classList.add('_finish');
	}
	function openEmpty(array) {
		for (const key in array) {
			const element = array[key];
			if (element && element.bombSum && !element.open) {
				element.classList.add('_open');
				element.open = 1;
				element.textContent = element.bombSum;
				pointsToWin--;
			} else if (element && !element.bomb && !element.bombSum && !element.open) {
				element.classList.add('_open');
				element.open = 1;
				let nextEmpty = collectActiveCells(element);
				openEmpty(nextEmpty);
			}
		}
	}
	function win(params) {
		let winWindow = document.createElement('div');
		winWindow.innerHTML = '<p>????????????</p>';
		winWindow.classList.add('game__end-block', '_win');
		gameContainer.append(winWindow);
	}
	function lose(params) {
		let loseWindow = document.createElement('div');
		loseWindow.innerHTML = '<p>??????????????????</p>';
		loseWindow.classList.add('game__end-block', '_lose');
		gameContainer.append(loseWindow);
	}
	function collectActiveCells(element) {
		let elemNumber = element.dataset.number;
		let positions = {
			this: element,
			next: null,
			prev: null,
			up: null,
			upNext: null,
			upPrev: null,
			down: null,
			downNext: null,
			downPrev: null,
		}
		positions.next = element.nextSibling;
		positions.prev = element.previousSibling;
		positions.up = element.parentNode.previousSibling;
		if (positions.up) {
			positions.up = positions.up.querySelector('.game__cell[data-number="' + elemNumber + '"]');
			positions.upNext = positions.up.nextSibling;
			positions.upPrev = positions.up.previousSibling;
		}
		positions.down = element.parentNode.nextSibling;
		if (positions.down) {
			positions.down = positions.down.querySelector('.game__cell[data-number="' + elemNumber + '"]');
			positions.downNext = positions.down.nextSibling;
			positions.downPrev = positions.down.previousSibling;
		}
		for (const key in positions) {
			const element = positions[key];
			if (element) {
				if (element.classList.contains('_open')) {
					positions[key] = null;
				}
			}
		}
		return positions;
	}
	function setPoints(array) {
		for (const key in array) {
			const element = array[key];
			if (element && !element.bomb) {
				element.bombSum = element.bombSum + 1;
			}
		}
	}
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
});