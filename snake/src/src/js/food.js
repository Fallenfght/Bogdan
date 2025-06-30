import { getRandomInt } from "./utils.js";

export class Food {
	constructor(map, snake) {
		this.icon = "<span>🍎</span>";
		this.value = 1000;
		let x, y;
		do {
			x = getRandomInt(0, map.width - 1);
			y = getRandomInt(0, map.height - 1);
		} while (snake.isSnakeHere(x, y) || snake.isScissorsHere(x, y) || snake.isBombHere(x, y));
		
		this.x = x;
		this.y = y;
		const cell = map.cells[x][y];
		if (cell) {
			if (getRandomInt(1, 10) === 1) {
				this.value = 5000;
				this.icon = "<span>🍏</span>";
				cell.classList.add("game-board__cell--food-golden");
			}
			cell.innerHTML = this.icon;
			cell.classList.add("game-board__cell--food");
			map.food = this;
		}
	}
	static Create(map, snake) {
		return new Food(map, snake);
	}
}