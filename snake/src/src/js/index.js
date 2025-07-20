import { Game } from "./game.js";
import { User } from "./user.js";
document.addEventListener('DOMContentLoaded', function() {
	const game = new Game();
	const btnStart = document.querySelector(".btn-start");
	const btnScore = document.querySelector(".btn-score");
	const scoreContainer = document.querySelector(".score-board");
	btnStart.addEventListener('click', function(e) {
		e.preventDefault();
		game.start();
	});
	scoreContainer.addEventListener('click', function() {
		this.classList.remove('score-board--active');
	});
	btnScore.addEventListener('click', function(e) {
		e.preventDefault();
		User.showLeaders();
		scoreContainer.classList.toggle('score-board--active');
	});
})