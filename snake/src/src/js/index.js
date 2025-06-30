import { Game } from "./game.js";

document.addEventListener('DOMContentLoaded', function() {
	const game = new Game();
	const btnStart = document.querySelector(".btn-start");
	btnStart.addEventListener('click', function(e) {
		e.preventDefault();
		game.start();
	});
})