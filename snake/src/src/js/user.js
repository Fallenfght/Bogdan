export class User {
	constructor(config) {
		this.config = {
			mainContainer: config.container,
			scoreContainer: document.querySelector('.score-board__container'),
			score: 0,
		};
	}
	create() {
		const userInfo = document.createElement('div');
		userInfo.classList.add('user');
		userInfo.textContent = `Score: ${this.config.score}`;
		this.config.mainContainer.appendChild(userInfo);
		this.scoreItem = userInfo;
		User.showLeaders();
	}
	saveScore() {
		const finalScore = this.config.score;
		let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
		highscores.push(finalScore);
		highscores.sort((a, b) => b - a);
		highscores = highscores.slice(0, 5);
		localStorage.setItem('highscores', JSON.stringify(highscores));
	}
	static showLeaders() {
		const highscoreBox = document.createElement('div');
		const scoreContainer = document.querySelector('.score-board__container');
		scoreContainer.innerHTML = '';
		highscoreBox.classList.add('highscores');
		const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
		if (highscores.length > 0) {
			const title = document.createElement('div');
			title.classList.add("highscores__title");
			title.textContent = '🏆 Highscores:';
			highscoreBox.appendChild(title);
			highscores.forEach((score, index) => {
				const scoreItem = document.createElement('div');
				scoreItem.classList.add("highscores__item");
				scoreItem.textContent = `${index + 1}. ${score}`;
				highscoreBox.appendChild(scoreItem);
			});
			scoreContainer.appendChild(highscoreBox);
		}
	}
	addScore (score) {
		this.config.score = Math.round(this.config.score + Number(score));
		this.scoreItem.textContent = `Score: ${this.config.score}`;
	}
	multiplyScore (score) {
		this.config.score = Math.round(this.config.score * Number(score));
		this.scoreItem.textContent = `Score: ${this.config.score}`;
	}
	destroy () {
		this.config.scoreContainer.innerHTML = '';
		this.config.score = 0;
	}
}