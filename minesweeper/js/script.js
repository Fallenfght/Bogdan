document.addEventListener('DOMContentLoaded', function() {
	const inputs = {
		rows: document.querySelector('.game__input-rows>input'),
		cells: document.querySelector('.game__input-cells>input'),
		bombs: document.querySelector('.game__input-bombs>input'),
		all: document.querySelectorAll('.game__input input'),
		startButton: document.querySelector('.button-start'),
	}
	const difficulties = {
		noob: {
			container: document.querySelector('.difficulties__noob'),
			rows: 9,
			cells: 9,
			bombs: 10,
		},
		easy: {
			container: document.querySelector('.difficulties__easy'),
			rows: 16,
			cells: 16,
			bombs: 40,
		},
		addvanced: {
			container: document.querySelector('.difficulties__addvanced'),
			rows: 30,
			cells: 16,
			bombs: 99,
		},
		genius: {
			container: document.querySelector('.difficulties__genius'),
			rows: 50,
			cells: 50,
			bombs: 500,
		},
		alien: {
			container: document.querySelector('.difficulties__alien'),
			rows: 100,
			cells: 100,
			bombs: 2000,
		},
		custom: {
			container: document.querySelector('.difficulties__custom'),
		}
	}
	const colors = {
		1: '#518600',
		2: '#134BB5',
		3: '#8B6E1D',
		4: '#8934CD',
		5: '#FF2424',
		6: '#687A52',
		7: '#333',
		8: '#a52a2a',
		prompt: {
			empty: '#A6BE40',
			withElem: '#A6BE40',
		},
	}
	setDifficulties(difficulties, inputs);
	const svgBomb = '<svg width="33" height="28" viewBox="0 0 83 78" fill="none" class="bomb-svg" xmlns="http://www.w3.org/2000/svg"><path d="M63.8473 55.2168L68.3163 59.0636" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M14.6557 58.9402L19.3263 55.3403" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M63.8473 20.2379L68.3163 16.3911" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M14.6557 16.5146L19.3263 20.1145" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M41.5364 72.6646V67.7622" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M5.53641 38.3475H12.0819" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M70.991 38.3475H77.5364" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><path d="M41.5364 10.5671V5.66464" stroke="black" stroke-width="9.83231" stroke-linecap="round"/><ellipse cx="41.5364" cy="38.3475" rx="26.1818" ry="26.1463" fill="#141414" stroke="black" stroke-width="6.55487"/></svg><svg width="28" height="26" viewBox="0 0 78 76" class="boom-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.5274 59.4282L24.3365 63.3724V57.1037C24.3365 55.2114 22.8025 53.6773 20.9101 53.6773H13.1372L16.6273 47.2716C17.5137 45.6447 16.9463 43.6078 15.3464 42.6735L7.91285 38.3323L15.3464 33.9911C16.1504 33.5215 16.7288 32.745 16.9483 31.8401C17.1678 30.9353 17.0096 29.98 16.5101 29.1942L12.5648 22.9873H19.8685C21.659 22.9873 23.1476 21.6086 23.2848 19.8234L23.9015 11.7976L29.5624 15.1981C31.1057 16.1251 33.1033 15.6997 34.1349 14.2243L38.3972 8.12835L41.9295 14.0223C42.8505 15.5591 44.8 16.1268 46.4022 15.3248L53.9421 11.5506V19.5609C53.9421 21.4532 55.4761 22.9873 57.3685 22.9873H64.0997L60.6096 29.393C59.7232 31.0199 60.2906 33.0568 61.8905 33.9911L69.3241 38.3323L61.8905 42.6735C61.0865 43.1431 60.5082 43.9196 60.2886 44.8245C60.0691 45.7293 60.2273 46.6846 60.7268 47.4704L64.6722 53.6773H57.3685C55.5863 53.6773 54.1017 55.0435 53.9539 56.8195L53.3691 63.8443L47.6745 60.4236C46.0812 59.4666 44.0155 59.9543 43.0185 61.5228L38.9768 67.8812L35.4338 60.7871C35.0001 59.9187 34.2185 59.275 33.283 59.0159C32.3475 58.7568 31.3461 58.9067 30.5274 59.4282Z" fill="#FF9801" stroke="#F44335" stroke-width="6.85282" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.3521 62.318L38.5859 74.8323L45.8586 63.3609L56.2482 69.618L57.2872 57.1037H70.7937L63.521 45.6323L75.9885 38.3323L63.521 31.0323L69.7547 19.5609H57.2872V6.00372L44.8197 12.2609L38.5859 1.83229L31.3132 12.2609L20.9236 6.00372L19.8846 19.5609H6.37811L13.6508 31.0323L1.1833 38.3323L13.6508 45.6323L7.41707 57.1037H20.9236V69.618L32.3521 62.318Z" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.8456 26.8609C26.2733 26.2828 27.2913 23.6358 27.1573 17.4752C34.1666 20.6446 36.1583 19.0785 38.5859 14.3466C42.0185 20.2796 44.4203 21.4177 50.0145 17.4752C50.5796 24.6887 52.7512 26.2787 58.3262 26.8609" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.8847 49.8037C27.3123 50.3818 27.2914 51.986 27.1574 58.1466C34.1666 54.9772 36.1583 56.5432 38.586 61.2752C42.0186 55.3421 45.4593 55.2469 51.0535 59.1894C51.6186 51.9759 53.7903 50.3859 59.3652 49.8037" stroke="black" stroke-width="2.08848" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	const flag = '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.32999 2V15" stroke="black"/><path d="M13.33 4L4.83249 7.4641V0.535898L13.33 4Z" fill="#FF0707"/><rect y="13" width="11" height="3" rx="1" fill="black"/></svg>';
	const gameContainer = document.querySelector('.game__container');
	let row = '<div class="game__row"></div>';
	let cell = '<div class="game__cell"></div>';
	const bombRemainBlock = '<div class="game__bombs-remain"><span class="game__bombs-remain-text">Бомб осталось: </span><span class="game__bombs-remain-num">0</span></div>';
	const prompt = '<div class="prompt"><div class="prompt__container"><p class="prompt__text">Подсказок: <span>0</span></p><button class="prompt__button">?</button></div></div>';
	let pointsToWin = {};
	let bombs = {};
	let bombsRemainNum = {};
	let bombsForClick = {};
	let newRow = {};
	let bombsCells = {};
	let promptContainer = {};
	let promptAttemps = {};
	/*modals*/
	const allModals = document.querySelectorAll('.modal');
	const bgClose = document.querySelector('.modal-bg-close');
	const modalRules = document.querySelector('.modal-rules');
	const buttonRules = document.querySelector('.modal-button-rules');
	const modalConfig = document.querySelector('.modal-config');
	const buttonConfig = document.querySelector('.modal-button-config');
	/*===========*/
	inputs.startButton.addEventListener('click', function () {
		const rows = inputs.rows.value;
		bombs = inputs.bombs.value;
		bombsForClick = bombs;
		const cellsVal = inputs.cells.value;
		finish(gameContainer);
		gameContainer.innerHTML = '<div class="game__box-container pyro"><div class="game__box"></div><div class="before"></div><div class="after"></div></div>';
		gameContainer.className = 'game__container';
		let gameBox = gameContainer.querySelector('.game__box');
		gameContainer.insertAdjacentHTML('afterbegin', prompt);
		promptContainer = gameContainer.querySelector('.prompt');
		promptText = promptContainer.querySelector('.prompt__text>span');
		promptButton = promptContainer.querySelector('.prompt__button');
		promptContainer.classList.add('_disabled');
		if (window.innerWidth <= 1024) {
			promptContainer.querySelector('.prompt__container').addEventListener('click', function() {
				promptContainer.classList.toggle('_active');
				bgClose.classList.toggle('_active');
			})
			bgClose.addEventListener('click', function() {
				promptContainer.classList.remove('_active');
			})
		}
		gameContainer.insertAdjacentHTML('afterbegin', bombRemainBlock);
		bombsRemainNum = document.querySelector('.game__bombs-remain-num');
		bombsRemainNum.textContent = bombsForClick;
		//rows
		for (let index = 0; index < rows; index++) {
			gameBox.insertAdjacentHTML('afterbegin', row);
		}
		//cells
		newRow = gameContainer.querySelectorAll('.game__row');
		for (let index = 0; index < newRow.length; index++) {
			const element = newRow[index];
			for (let index = 0; index < cellsVal; index++) {
				cell = '<div class="game__cell" data-number="'+ (String(index)) + '"></div>';
				element.insertAdjacentHTML('afterbegin', cell);
			}
		}
		gameContainer.addEventListener('click', startClick);
		gameContainer.addEventListener('click', leftClick);
		gameContainer.addEventListener('contextmenu', rightClick);
		gameContainer.scrollIntoView({block: "start", behavior: "smooth"});
	});
	function startClick(e) {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains('game__cell')) {
			//first open
			let firstClickCells = collectActiveCells(target);
			for (const key in firstClickCells) {
				const element = firstClickCells[key];
				if (element) {
					element.firstClick = 1;
				}
			}
			//set bombs
			for (let index = 0; index < bombs; index++) {
				let randomRow = getRandomInt(newRow.length);
				let newCell  = newRow[randomRow].querySelectorAll('.game__cell');
				let randomCell = newCell[getRandomInt(newCell.length)];
				if (randomCell.bomb == 1 || randomCell.firstClick == 1) {
					index--;
				} else {
					randomCell.bomb = 1;
				}
			}
			let allCells = document.querySelectorAll('.game__cell');
			bombsCells = Array.prototype.slice.call(allCells);
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
			gameContainer.removeEventListener('click', startClick);
			/*Prompt*/
			promptContainer.classList.remove('_disabled');
			promptAttemps = 3;
			promptText.textContent = promptAttemps;
			promptButton.addEventListener('click', promptClick);
		};
	};
	function leftClick(e) {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains('game__cell')) {
			if (target.classList.contains('flag')) {
				return;
			}
			if (target.open) {
				if (gameContainer.help) {
					return;
				}
				const activeCells = collectActiveCells(target);
				let activeflags = 0;
				const thisSum = target.bombSum;
				for (const key in activeCells) {
					const element = activeCells[key];
					if (element) {
						if (element.flag) {
							activeflags++;
						}
					}
				}
				if (activeflags == thisSum) {
					for (const key in activeCells) {
						const element = activeCells[key];
						if (element) {
							if (!element.flag) {
								element.click();
							}
						}
					}
				}
			} else if (target.bombSum) {
				target.classList.add('_open');
				target.open = 1;
				target.textContent = target.bombSum;
				target.style.color = colors[target.bombSum];
				if (gameContainer.help) {
					target.style.background = colors.prompt.withElem;
					promptAttempsChange();
				}
				//win ======================================================
				pointsToWin--;
				if (pointsToWin == 0) {
					win();
					finish(this);
				}
			} else if (target.bomb) {
				if (gameContainer.help) {
					target.style.background = colors.prompt.withElem;
					target.classList.add("_open");
					target.insertAdjacentHTML('afterbegin', flag);
					target.classList.add('flag');
					target.insertAdjacentHTML('afterbegin', svgBomb);
					target.classList.add('bomb');
					target.openedHelp = 1;
					target.flag = 1;
					bombsForClick--;
					bombsRemainNum.textContent = bombsForClick;
					promptAttempsChange();
				} else {
					//end game =================================================================================================
					target.classList.add("_active");
					lose();
					finish(this);
				}
			} else {
				if (gameContainer.help) {
					target.style.background = colors.prompt.empty;
					target.classList.add("_open");
					promptAttempsChange();
				}
				let thisSiblings = collectActiveCells(target);
				openEmpty(thisSiblings);
				if (pointsToWin == 0) {
					win();
					finish(this);
				}
			}
		}
	}
	function promptClick(e) {
		e.preventDefault();
		if (gameContainer.help == 1) {
			gameContainer.classList.remove('_help');
			promptContainer.classList.remove('prompt__button_active');
			gameContainer.help = 0;
		} else {
			gameContainer.classList.add('_help');
			promptContainer.classList.add('prompt__button_active');
			gameContainer.help = 1;
		}
	}
	function promptAttempsChange() {
		gameContainer.help = 0;
		gameContainer.classList.remove('_help');
		promptContainer.classList.remove('prompt__button_active');
		promptAttemps--;
		promptText.textContent = promptAttemps;
		if (promptAttemps == 0) {
			promptContainer.classList.add('_disabled');
			promptButton.removeEventListener('click', promptClick);
		}
	}
	function promptFinish() {
			promptAttemps = 0;
			promptText.textContent = promptAttemps;
			promptContainer.classList.add('_disabled');
			promptButton.removeEventListener('click', promptClick);
	}
	function rightClick(e) {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains('game__cell')) {

				if (target.open) {
					return;
				}
				if (!target.classList.contains('flag')) {
					target.innerHTML = flag;
					target.classList.add('flag');
					target.flag = 1;
					bombsForClick--;
					bombsRemainNum.textContent = bombsForClick;
				} else {
					target.innerHTML = '';
					target.classList.remove('flag');
					target.flag = 0;
					bombsForClick++;
					bombsRemainNum.textContent = bombsForClick;
				}
			
		}
		return false;
	}
	let maxStack = 300;
	let currentStack = {};
	currentStack = 1;
	function openEmpty(array) {
		for (const key in array) {
			const element = array[key];
			if (element && element.bombSum && !element.open && !element.flag) {
				element.classList.add('_open');
				element.open = 1;
				element.textContent = element.bombSum;
				element.style.color = colors[element.bombSum];
				pointsToWin--;
				if (pointsToWin == 0) {
					win();
					finish(this);
				}
			} else if (element && !element.bomb && !element.bombSum && !element.open && !element.flag) {
				element.classList.add('_open');
				element.open = 1;
				let nextEmpty = collectActiveCells(element);
				if (currentStack < maxStack) {
					currentStack++;
					openEmpty(nextEmpty);
				} else {
					setTimeout(function(){
						currentStack = 1;
						openEmpty(nextEmpty);
					}, 0);
				}
			}
		}
	}
	function finish(element) {
		element.removeEventListener('click', leftClick);
		element.removeEventListener('contextmenu', rightClick);
		gameContainer.classList.add('_finish');
	}
	function win() {
		if (!gameContainer.classList.contains('_finish')) {
			for (let index = 0; index < bombsCells.length; index++) {
				const element = bombsCells[index];
				gameContainer.help = 0;
				gameContainer.classList.remove('_help');
				if (!element.flag) {
					element.insertAdjacentHTML('afterbegin', flag);
					element.classList.add('flag');
				}
				if (!element.openedHelp) {
					element.insertAdjacentHTML('afterbegin', svgBomb);
					element.classList.add('bomb');
				}
			}
			promptFinish();
			bombsRemainNum.textContent = '0';
			let winWindow = document.createElement('div');
			winWindow.innerHTML = '<p>Победа</p><div class="game__againt-block"><p class="color_white">Повторим?</p><div class="flex color_white"><p class="yes">Да</p><p class="no">Нет</p></div></div>';
			winWindow.classList.add('game__end-block', '_win');
			gameContainer.append(winWindow);
			setYesNo(winWindow);
		};
	};
	function lose() {
		for (let index = 0; index < bombsCells.length; index++) {
			const element = bombsCells[index];
			if (!element.openedHelp) {
				element.insertAdjacentHTML('afterbegin', svgBomb);
				element.classList.add('bomb');
			}
		}
		promptFinish();
		let loseWindow = document.createElement('div');
		loseWindow.innerHTML = '<p>Поражение</p><div class="game__againt-block"><p class="color_white">Сначала?</p><div class="flex color_white"><p class="yes">Да</p><p class="no">Нет</p></div></div>';
		loseWindow.classList.add('game__end-block', '_lose');
		gameContainer.append(loseWindow);
		setYesNo(loseWindow);
	}
	function setYesNo(container) {
		const againBlock = container.querySelector('.game__againt-block');
		container.querySelector('.yes').addEventListener('click', function() {
			inputs.startButton.click();
		});
		container.querySelector('.no').addEventListener('click', function() {
			againBlock.remove();
		});
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
				if (element.open) {
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
	function setDifficulties(difficulties, inputs) {
		for (const key in difficulties) {
			const element = difficulties[key];
			if (difficulties[key] == difficulties['custom']) {
				element.container.addEventListener('click', function() {
					inputs.rows.focus();
					inputs.rows.select();
					for (const key in difficulties) {
						const element = difficulties[key];
						element.container.classList.remove('_active');
					}
					element.container.classList.add('_active');
				});
			} else {
				element.container.addEventListener('click', function (e) {
					e.preventDefault();
					inputs.rows.value = element.rows;
					inputs.cells.value = element.cells;
					inputs.bombs.value = element.bombs;
					inputs.startButton.scrollIntoView({block: "center", behavior: "smooth"});
					for (const key in difficulties) {
						const element = difficulties[key];
						element.container.classList.remove('_active');
					}
					element.container.classList.add('_active');
				});
			}
		};
		for (let index = 0; index < inputs.all.length; index++) {
			const element = inputs.all[index];
			if (!element.parentNode.classList.contains('game__input-bombs')) {
				element.addEventListener('input', function() {
					for (const key in difficulties) {
						const element = difficulties[key];
						element.container.classList.remove('_active');
					}
					difficulties.custom.container.classList.add('_active');
					//working with input
					let inputVal = String(element.value);
					inputVal = Number(inputVal.replace(/[^0-9]/g,""));
					element.value = inputVal;
				});
				element.addEventListener('blur', function() {
					let inputVal = element.value;
					const error = element.parentNode.querySelector('.game__input-error');
					if (inputVal < 4) {
						element.value = 4;
						error.textContent = 'Количество не должно быть ниже 4';
						element.classList.add('_error');
					} else if (inputVal > 300) {
						element.value = 300;
						error.textContent = 'Количество не должно превышать 300';
						element.classList.add('_error');
					} else {
						element.value = inputVal;
						error.textContent = '';
						element.classList.remove('_error');
					}
					checkBombsValue(inputs);
				});
			}
			element.addEventListener('keydown', function(e) {
				if (e.code == 'Enter' || e.key == 'Enter' || e.code == 'NumpadEnter') {
					e.preventDefault();
					element.blur();
					inputs.startButton.click();
				}
			});
		};
		inputs.bombs.addEventListener('blur', function() {
			checkBombsValue(inputs);
		})
	};
	function checkBombsValue(inputs) {
		const element = inputs.bombs;
		let bombsValue = element.value;
		let allValue = 1;
		const error = element.parentNode.querySelector('.game__input-error');
		for (let index = 0; index < inputs.all.length; index++) {
			const element = inputs.all[index];
			if (!element.parentNode.classList.contains('game__input-bombs')) {
				allValue = Number(allValue) * Number(element.value);
			}
		}
		if (bombsValue > (allValue - 9)) {
			element.value = allValue - 9;
			error.textContent = 'Количество бомб не должно превышать количество клеток на 9';
			element.classList.add('_error');
		} else {
			error.textContent = '';
			element.classList.remove('_error');
		}
	}
	/*modals*/
	setModal(modalRules, buttonRules);
	setModal(modalConfig, buttonConfig);
	bgClose.addEventListener('click', function() {
		for (let index = 0; index < allModals.length; index++) {
			const element = allModals[index];
			element.classList.remove('_active');
		}
		this.classList.remove('_active');
	})
	function setModal(modal, button) {
		button.addEventListener('click', function () {
			modal.classList.add('_active');
			bgClose.classList.add('_active');
			modal.querySelector('.modal__close').addEventListener('click', function() {
				modal.classList.remove('_active');
				bgClose.classList.remove('_active');
			})
		})
	}
});