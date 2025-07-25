import { Snake } from "./snake.js";
import { GameMap } from "./map.js";
import { Food } from "./food.js";
import { Bomb } from "./bomb.js";
import { Scissors } from "./scissors.js";
import { User } from "./user.js";
import { getRandomInt } from "./utils.js";

export class Game {
	constructor(config) {
		const screenWidth = window.innerWidth - 30;
		this.config = {
			container: document.querySelector(".game-board"),
			width: 10,
			height: 10,
			speed: 350,
			cellSize: 40,
			...config
		};
		if (screenWidth < 425) {
			const adaptiveCellSize = Math.floor(screenWidth / this.config.width);
			this.config.cellSize = adaptiveCellSize;
			this.config.height = this.config.width;
		}
		this.config.containerWidth = Number(this.config.width) * Number(this.config.cellSize);
		this.map = new GameMap(this.config);
		this.user = new User(this.config);
		this.snake = new Snake(this, this.map, this.user);
	}
	start() {
		this.stop();
		this.map.create(this.config.container);
		this.user.create();
		this.snake.create(this.config.container);
		this.snake.appleValue = Food.Create(this.map, this.snake);
		this.snake.scissorsValue = 2;
	}
	stop(isEnd = false) {
		this.started = false;
		this.snake.destroy();
		this.map.destroy();
		this.user.saveScore();
		if (this.bombTimeout) {
			setTimeout(() => {
				clearTimeout(this.bombTimeout);
			}, 0);
			
		}
		if (this.scissorsTimeout) {
			setTimeout(() => {
				clearTimeout(this.scissorsTimeout);
			}, 0);
		}
		if (isEnd == "END") {
			alert("Ваш счет: " + this.user.config.score);
		}
		this.user.destroy();
	}
	startBombLoop() {
		if (this.bombTimeout) {
			clearTimeout(this.bombTimeout);
		}
		const timeout = getRandomInt(1500, 10000);
		this.bombTimeout = setTimeout(() => {
			if (this.map.bomb) {
				this.map.deleteBomb(this.map.bomb.x, this.map.bomb.y);
			}
			Bomb.Create(this.map, this.snake);
			this.startBombLoop();
		}, timeout);
	}
	startScissorsLoop() {
		if (this.scissorsTimeout) {
			clearTimeout(this.scissorsTimeout);
		}
		const timeout = getRandomInt(10000, 30000);
		this.scissorsTimeout = setTimeout(() => {
			if (this.map.scissors) {
				this.map.deleteScissors(this.map.scissors.x, this.map.scissors.y);
			}
			Scissors.Create(this.map, this.snake);
			this.startScissorsLoop();
		}, timeout);
	}
}