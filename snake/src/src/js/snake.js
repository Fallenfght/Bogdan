import { Food } from "./food.js";
const oppositeDirectionsMap = {
	"top": "bottom",
	"bottom": "top",
	"left": "right",
	"right": "left"
};
const keyToDirectionMap = {
	"ArrowDown": "bottom",
	"KeyS": "bottom",
	"ArrowUp": "top",
	"KeyW": "top",
	"ArrowRight": "right",
	"KeyD": "right",
	"ArrowLeft": "left",
	"KeyA": "left"
}
const directionClassMap = {
	left: "snake--left",
	bottom: "snake--bottom",
	top: "snake--top",
	right: "snake--right",
};
export class Snake {
	static setDefault() {
		return {
			head: {
				element: null,
				x: 2,
				y: 0
			},
			body: [{
				element: null,
				x: 1,
				y: 0
			}],
			tail: {
				element: null,
				x: 0,
				y: 0,
				oldX: 0,
				oldY: 0
			}
		};
	}
    elements = Snake.setDefault();
	container;
	direction = 'right';
	static headClass = 'snake__head';
	static bodyClass = 'snake__body';
	static tailClass = 'snake__tail';
	constructor(game, map, user) {
		this.game = game;
		this.map = map;
		this.user = user;
	}
	create(container) {
		this.container = document.createElement("div");
		this.container.classList.add("snake");
		const createCell = (partElement, partKey) => {
			const domElement = document.createElement("div");
			domElement.style.width = this.game.config.cellSize + 'px';
			domElement.style.height = this.game.config.cellSize + 'px';
			domElement.classList.add(`snake__${partKey}`);
			if (partKey == "head") {
				domElement.innerHTML = '<span class="snake__tongue"></span>';
			}
			const { x, y } = partElement;
			domElement.style.left = `${x * this.game.config.cellSize}px`;
			domElement.style.top = `${y * this.game.config.cellSize}px`;
			this.container.appendChild(domElement);
			partElement.element = domElement;
		}
		["head", "body", "tail"].forEach(partKey => {
			const partElement = this.elements[partKey];
			if (Array.isArray(partElement)) {
				partElement.forEach((segment) => createCell(segment, partKey));
			} else {
				createCell(partElement, partKey);
			}
		});
		this.setControlKeys();
		container.appendChild(this.container);
	}
	destroy() {
		window.removeEventListener('keydown', this.keyListener);
		window.removeEventListener('touchstart', this.touchStartListener);
		window.removeEventListener('touchend', this.touchEndListener);
		setTimeout(() => {
			clearInterval(this.game.interval);
		}, 0);
		this.elements = Snake.setDefault();
	}
	move() {
		let prevX, prevY, classDirection;
		const head = this.elements.head;
		prevX = head.x;
		prevY = head.y;
		
		switch (this.direction) {
			case "right":
				head.x++;
				break;
			case "left":
				head.x--;
				break;
			case "top":
				head.y--;
				break;
			case "bottom":
				head.y++;
				break;
		}

		head.element.classList.remove(...Object.values(directionClassMap));
		head.element.classList.add(directionClassMap[this.direction]);
		classDirection = [...head.element.classList].filter(cls => 
			Object.values(directionClassMap).includes(cls)
		);

		head.x = (head.x + this.game.config.width) % this.game.config.width;
		head.y = (head.y + this.game.config.height) % this.game.config.height;
		
		if (this.isSnakeHere(head.x, head.y, true) || this.isBombHere(head.x, head.y)) {
			this.game.stop("END");
			return;
		}
		this.elements.body.forEach((part) => {
			const tempClassDirection = classDirection;

			const tempX = part.x;
			const tempY = part.y;
			part.x = prevX;
			part.y = prevY;
			prevX = tempX;
			prevY = tempY;

			classDirection = [...part.element.classList].filter(cls => 
				Object.values(directionClassMap).includes(cls)
			);
			part.element.classList.remove(...Object.values(directionClassMap));
			part.element.classList.add(tempClassDirection);
		});

		const { tail } = this.elements;
		tail.oldX = tail.x;
		tail.oldY = tail.y;
		tail.x = prevX;
		tail.y = prevY;
		const tempClassDirection = [...tail.element.classList].filter(cls => 
			Object.values(directionClassMap).includes(cls)
		);
		tail.element.classList.remove(...Object.values(directionClassMap));
		if (classDirection.length) {
			tail.element.classList.add(classDirection);
		}

		if (this.isFoodHere(head.x, head.y)) {
			this.eatFood();
			if (tempClassDirection.length) {
				tail.element.classList.remove(...Object.values(directionClassMap));
				tail.element.classList.add(tempClassDirection);
			}
		}
		if (this.isScissorsHere(head.x, head.y)) {
			this.eatScissors();
			this.updateSnakePos();
		}
		this.updateSnakePos();
	}
	isScissorsHere (x, y) {
		if (!this.map.scissors) return false;
		return this.map.scissors.x === x && this.map.scissors.y === y;
	}
	isBombHere (x, y) {
		if (!this.map.bomb) return false;
		return this.map.bomb.x === x && this.map.bomb.y === y;
	}
	isFoodHere(x, y) {
		if (!this.map.food) return false;
		return this.map.food.x === x && this.map.food.y === y;
	}
	isSnakeHere(x, y, ignoreHead = false) {
		const positions = [{
			key: 'head',
			x: this.elements.head.x,
			y: this.elements.head.y,
		}, {
			x: this.elements.tail.x,
			y: this.elements.tail.y,
		},
			...Object.values(this.elements.body)
		];
		return positions.some((position) => {
			if (ignoreHead && position.key === "head") return false;
			return position.x === x && position.y === y;
		});
	}
	eatFood() {
		this.createBodyPart();
		this.map.deleteFood(this.elements.head.x, this.elements.head.y);
		this.user.addScore(this.appleValue.value);
		this.appleValue = Food.Create(this.map, this);
	}
	eatScissors() {
		const currentLength = this.elements.body.length;
		let addingScore = 4000;
		if (currentLength > 1) {
			this.divideBody(this.scissorsValue);
			let multiplier = 1.1;
			if (currentLength >= 20) {
				multiplier = 2;
			} else {
				const t = Math.min(currentLength / 20, 1);
				multiplier = 1.1 + (2 - 1.1) * t;
				addingScore *= multiplier;
			}
			this.user.addScore(addingScore);
		}
		this.map.deleteScissors(this.elements.head.x, this.elements.head.y);
	}
	divideBody(divideValue) {
		if (this.elements.body.length <= 1) return;
		let removedSegment = null;
		let directionClass = null;
		const currentLength = this.elements.body.length;
		let segmentsToRemove = Math.round(currentLength / divideValue);
		if (currentLength - segmentsToRemove < 1) {
			segmentsToRemove = currentLength - 1;
		}
		for (let i = 0; i < segmentsToRemove; i++) {
			if (this.elements.body.length === 0) break;
			removedSegment = this.elements.body.pop();
			directionClass = [...removedSegment.element.classList].find(cls => Object.values(directionClassMap).includes(cls));
			removedSegment.element.remove();
		}
		this.elements.tail.element.classList.remove(...Object.values(directionClassMap));
		this.elements.tail.element.classList.add(directionClass);
		this.elements.tail.x = removedSegment.x;
		this.elements.tail.y = removedSegment.y;
		this.setPartPosition(this.elements.tail);
	}
	createBodyPart() {
		const { tail } = this.elements;
		const bodyPart = document.createElement("div");
		bodyPart.style.width = this.game.config.cellSize + 'px';
		bodyPart.style.height = this.game.config.cellSize + 'px';
		const classDirection = [...tail.element.classList].filter(cls => 
			Object.values(directionClassMap).includes(cls)
		);
		bodyPart.classList.add("snake__body");
		if (classDirection.length) {
			bodyPart.classList.add(classDirection);
		}
		this.elements.body.push({ element: bodyPart, x: tail.x, y: tail.y });
		tail.x = tail.oldX;
		tail.y = tail.oldY;

		const lastBodyPart = this.elements.body.length;
		bodyPart.style.left = `${this.elements.body[lastBodyPart - 1].x * this.game.config.cellSize}px`;
		bodyPart.style.top = `${this.elements.body[lastBodyPart - 1].y * this.game.config.cellSize}px`;
		this.container.insertBefore(bodyPart, this.elements.tail.element);
	}
	setPartPosition = (part) => {
		part.element.style.left = `${part.x * this.game.config.cellSize}px`;
		part.element.style.top = `${part.y * this.game.config.cellSize}px`;
	}
	updateSnakePos() {
		this.setPartPosition(this.elements.head);
		this.elements.body.forEach(this.setPartPosition);
		this.setPartPosition(this.elements.tail);
	}
	setControlKeys() {
		if (this.keyListener) {
			window.removeEventListener('keydown', this.keyListener);
		}
		if (this.touchStartListener) {
			window.removeEventListener('touchstart', this.touchStartListener);
		}
		if (this.touchEndListener) {
			window.removeEventListener('touchend', this.touchEndListener);
		}

		this.keyListener = (e) => {
			e.preventDefault();
			const direction = keyToDirectionMap[e.code];
			if (direction && direction !== oppositeDirectionsMap[this.direction]) {
				this.direction = direction;
				clearInterval(this.game.interval);
				this.move();
				if (!this.game.started) {
					this.game.startBombLoop();
					this.game.startScissorsLoop();
					this.game.started = true;
				}
				this.game.interval = setInterval(() => {
					this.move();
				}, this.game.config.speed);
			}
		};

		let touchStartX = 0;
		let touchStartY = 0;

		this.touchStartListener = (e) => {
			e.preventDefault();
			touchStartX = e.touches[0].clientX;
			touchStartY = e.touches[0].clientY;
		};

		this.touchEndListener = (e) => {
			e.preventDefault();
			const dx = e.changedTouches[0].clientX - touchStartX;
			const dy = e.changedTouches[0].clientY - touchStartY;

			if (Math.abs(dx) > Math.abs(dy)) {
				if (dx > 30 && this.direction !== 'left') this.direction = 'right';
				else if (dx < -30 && this.direction !== 'right') this.direction = 'left';
			} else {
				if (dy > 30 && this.direction !== 'top') this.direction = 'bottom';
				else if (dy < -30 && this.direction !== 'bottom') this.direction = 'top';
			}
			clearInterval(this.game.interval);
			this.move();
			if (!this.game.started) {
				this.game.startBombLoop();
				this.game.startScissorsLoop();
				this.game.started = true;
			}
			this.game.interval = setInterval(() => {
				this.move();
			}, this.game.config.speed);
		};
		window.addEventListener('keydown', this.keyListener);
		window.addEventListener('touchstart', this.touchStartListener, { passive: false });
		window.addEventListener('touchend', this.touchEndListener, { passive: false });
	}
}