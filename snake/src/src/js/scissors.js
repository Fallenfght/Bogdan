import { getRandomInt } from "./utils.js";

export class Scissors {
	constructor(map, snake) {
		this.icon = "<span>✂️</span>";
		let x, y;
		do {
			x = getRandomInt(0, map.width - 1);
			y = getRandomInt(0, map.height - 1);
		} while (snake.isSnakeHere(x, y) || snake.isBombHere(x, y) || snake.isFoodHere(x, y) || [-1, 1].some(d => snake.isSnakeHere(x + d, y)) || [-1, 1].some(d => snake.isSnakeHere(x, y + d)));
		this.x = x;
		this.y = y;
		const cell = map.cells[x][y];
		if (cell) {
			cell.innerHTML = this.icon;
			cell.classList.add("game-board__cell--scissors");
			map.scissors = this;
		}
	}
	static Create(map, snake) {
		return new Scissors(map, snake);
	}
}