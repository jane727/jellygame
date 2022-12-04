const timer = document.querySelector('.timer');
const playBtn = document.querySelector('.btn__play');
const stopBtn = document.querySelector('.btn__stop');
const replayBtn = document.querySelector('.btn__replay');
const counter = document.querySelector('.counter');
const playGround = document.querySelector('.playground');
const popup = document.querySelector('.game__popup');
const popupText = document.querySelector('.game__popup .text');
// const background = new Audio('./sound/bg.mpg');
// const carrotPull = new Audio('./sound/carrot_pull.mp3');
// const bugPull = new Audio('./sound/bug_pull.mp3');
// const gameWin = new Audio('./sound/game_win.mp3');
// const gameOver = new Audio('./sound/alert.wav');

function createJelly(name, num) {
	for (i = 0; i < num; i++) {
		const jelly = document.createElement('div');
		jelly.classList.add('jelly', `${name}`);
		jelly.innerHTML = `<img src="./img/${name}.png" alt="${name}">`;
		jelly.style.top = `${Math.floor(Math.random() * 100)}%`;
		jelly.style.left = `${Math.floor(Math.random() * 100)}%`;
		playGround.appendChild(jelly);
	}
}

function createJelly(name, num) {
	for (i = 0; i < num; i++) {
		const jelly = document.createElement('div');
		jelly.classList.add('jelly', `${name}`);
		jelly.innerHTML = `<img src="./img/${name}.png" alt="${name}">`;
		jelly.style.top = `${Math.floor(Math.random() * 100)}%`;
		jelly.style.left = `${Math.floor(Math.random() * 100)}%`;
		playGround.appendChild(jelly);
	}
}

function jellyClick(event) {
	const target = event.target.parentNode;
	if (target.classList.contains('rainbow')) {
		target.remove();
	} else if (target.parentNode.classList.contains('pink')) {
		popupOn();
		popupText.innerHTML = 'Ouch! Try again!';
		resetGame();
	}
}

function resetGame() {}

function popupOn() {
	popup.classList.toggle('hide');
}

playGround.addEventListener('click', jellyClick);
playBtn.addEventListener('click', () => {
	createJelly('pink', 20);
	createJelly('rainbow', 10);
	playBtn.classList.toggle('hide');
	stopBtn.classList.toggle('hide');
});

stopBtn.addEventListener('click', () => {
	// 게임초기화, 팝업창 생성
	popupOn();
});
replayBtn.addEventListener('click', () => {
	resetGame();
});
