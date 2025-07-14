export class GameMap {
	food = null;
	constructor(config) {
		this.config = config;
		this.cells = [];
		this.width = config.width;
		this.height = config.height;
	}
	destroy () {
		if (this.food) {
			this.deleteFood(this.food.x, this.food.y);
		}
		if (this.bomb) {
			this.deleteBomb(this.bomb.x, this.bomb.y);
		}
		if (this.scissors) {
			this.deleteScissors(this.scissors.x, this.scissors.y);
		}
		this.config.container.innerHTML = "";
		this.cells = [];
	}
	create (container) {
		const map = document.createDocumentFragment();
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const cell = document.createElement("div");
				cell.classList.add("game-board__cell");
				map.appendChild(cell);
				if (!this.cells[x]) {
					this.cells[x] = [];
				}
				this.cells[x][y] = cell;
			}
		}
		container.appendChild(map);
	}
	deleteFood(x, y) {
		const cell = this.cells[x][y];
		cell.textContent = '';
		cell.classList.remove("game-board__cell--food");
		this.food = null;
	}
	deleteBomb(x, y) {
		const cell = this.cells[x][y];
		cell.textContent = '';
		cell.classList.remove("game-board__cell--bomb");
		this.bomb = null;
	}
	deleteScissors(x, y) {
		const cell = this.cells[x][y];
		cell.textContent = '';
		cell.classList.remove("game-board__cell--scissors");
		this.scissors = null;
	}
}