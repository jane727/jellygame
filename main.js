const timer = document.querySelector('.timer');
const playBtn = document.querySelector('.btn__play');
const stopBtn = document.querySelector('.btn__stop');
const replayBtn = document.querySelector('.btn__replay');
const popup = document.querySelector('.game__popup');
const popupText = document.querySelector('.text');
const playGround = document.querySelector('.playground');
const counter = document.querySelector('.counter');
const bgm = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');
const rbSound = new Audio('sound/carrot_pull.mp3');
const jellySound = new Audio('sound/bug_pull.mp3');

const PLAY_TIME = 10;
const GAME_COUNT = 10;
let started = false;
let countdown;
let destroyCnt = 0;
	
function gameInit(PLAY_TIME, GAME_COUNT) {
	bgm.play();
	clearInterval(countdown);
	if (PLAY_TIME >= 10) {
		timer.innerHTML = `00:${PLAY_TIME}`;
	} else {
		timer.innerHTML = `00:0${PLAY_TIME}`;
	}
	destroyCnt = 0;
	counter.innerHTML = `RAINBOW JELLY : ${GAME_COUNT}`;
}

function startTimer(PLAY_TIME) {
	let leftSec = 0;
	countdown = setInterval(() => {
		if ((PLAY_TIME - leftSec) >= 10) {
			timer.innerHTML = `00:${PLAY_TIME - leftSec}`;
		} else {
			timer.innerHTML = `00:0${PLAY_TIME - leftSec}`;
		}
		leftSec++;
		if (leftSec > PLAY_TIME) {
			gameOver();
		}
	}, 1000);
}

function gameOver() {
	started = false;
	gameInit(PLAY_TIME, GAME_COUNT);
	playGame(started);
	playBtn.classList.toggle('hide');
	stopBtn.classList.toggle('hide');
	popupOn('You Lose...');
	alertSound.play();
}

function gameWin() {
	started = false;
	gameInit(PLAY_TIME, GAME_COUNT);
	playBtn.classList.toggle('hide');
	stopBtn.classList.toggle('hide');
	popupOn('Wow! You Win!');
	winSound.play();
}

function gameReplay() {
	popup.classList.add('hide');
	playBtn.classList.toggle('hide');
	stopBtn.classList.toggle('hide');
	started = true;
	playGame(started);
}

function popupOn(text) {
	popup.classList.remove('hide');
	popupText.textContent = text;
	bgm.pause();
	bgm.load();
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

function playGame(started) {
	if (started === true) {
		createJelly('pink', 20);
		createJelly('orange', 20);
		createJelly('yellow', 20);
		createJelly('green', 20);
		createJelly('blue', 20);
		createJelly('navy', 20);
		createJelly('purple', 20);
		createJelly('rainbow', GAME_COUNT);
		
	} else {
		playGround.innerHTML = '';
	}
}

function clickedJelly(event) {
	const target = event.target.parentNode;
	if (target.classList.contains('rainbow')) {
		target.remove();
		rbSound.play();
		destroyCnt++;
		counter.innerHTML = `RAINBOW JELLY : ${GAME_COUNT - destroyCnt}`;
	} else if (!target.classList.contains('rainbow')) {
		// console.log(target.parentNode);
		jellySound.play();
		gameOver();
	}
	if ((GAME_COUNT - destroyCnt) === 0) {
		gameWin();
	}
}

playBtn.addEventListener('click', () => {
	started = true;
	startTimer(PLAY_TIME);
	playGame(started);
	popup.classList.add('hide');
	playBtn.classList.toggle('hide');
	stopBtn.classList.toggle('hide');
	bgm.play();
});

stopBtn.addEventListener('click', () => {
	gameOver();
})

replayBtn.addEventListener('click', () => {
	gameReplay();
	gameInit(PLAY_TIME, GAME_COUNT);
	startTimer(PLAY_TIME);
});

playGround.addEventListener('click', clickedJelly);

