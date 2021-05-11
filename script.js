class Game {
	constructor() {
		this.minValue = 0;
		this.maxValue = 100;
		this.answerNumber = 0;
		this.orderNumber = 0;
		this.gameRun = true;
	}

	bindToDOM() {
		this.screenStart = document.querySelector('#screenStart');
		this.screenGame = document.querySelector('#screenGame');
		this.btnStart = document.querySelector('#btnStart');
		this.btnRetry = document.querySelector('#btnRetry');
		this.btnEqual = document.querySelector('#btnEqual');
		this.btnLess = document.querySelector('#btnLess');
		this.btnOver = document.querySelector('#btnOver');
		this.initialMinValue = document.querySelector('#initialMinValue');
		this.initialMaxValue = document.querySelector('#initialMaxValue');
		this.answerField = document.querySelector('#answerField');
		this.orderNumberField = document.querySelector('#orderNumberField');
		this.gameButtons = document.querySelector('#gameButtons');
	}

	startGame() {
		let min = Math.min(parseInt(this.initialMinValue.value), parseInt(this.initialMaxValue.value));
		let max = Math.max(parseInt(this.initialMinValue.value), parseInt(this.initialMaxValue.value));
		if (min == max) {
			console.log('111')
			this.screenStart.classList.add('d-none');
			this.screenGame.classList.remove('d-none');
			this.showMessage('Числа равны!');
		} else {
			this.minValue = (min > -999) ? min : -999;
			this.maxValue = max < 999 ? max : 999;
			this.newRound();
		}
	}

	newRound() {
		this.orderNumber ++;
		this.answerNumber = Math.floor((this.minValue + this.maxValue) / 2);
		this.answerField.textContent = this.answerNumber;
		this.orderNumberField.textContent = this.orderNumber;
	}

	addListeners() {
		this.btnStart.addEventListener('click', () => {
			this.screenStart.classList.add('d-none');
			this.screenGame.classList.remove('d-none');
			this.startGame();
		})

		// this.initialMinValue.addEventListener('change', () => {
		// 	this.minValue = this.initialMinValue.value;
		// });

		// this.initialMaxValue.addEventListener('change', () => {
		// 	this.maxValue = this.initialMaxValue.value;
		// });

		this.btnRetry.addEventListener('click', () => {
			this.screenStart.classList.remove('d-none');
			this.screenGame.classList.add('d-none');
			this.gameButtons.classList.remove('d-none');
			this.minValue = 0;
			this.maxValue = 100;
			this.orderNumber = 0;
			this.gameRun = true;
			this.initialMinValue.value = this.minValue;
			this.initialMaxValue.value = this.maxValue;
		})

		this.btnEqual.addEventListener('click', () => this.equalHandler());
		this.btnLess.addEventListener('click', () => this.changeValueHandler(() => this.maxValue = this.answerNumber - 1));
		this.btnOver.addEventListener('click', () => this.changeValueHandler(() => this.minValue = this.answerNumber + 1));
	};

	equalHandler() {
		if (this.gameRun) {
			const answerPhrase = `Я всегда угадываю\n\u{1F60E}`;
			this.showMessage(answerPhrase);
		}
	};

	changeValueHandler(callback) {
		if (this.gameRun) {
			if (this.minValue == this.maxValue) {
				this.wrongValue();
			} else {
				callback();
				this.newRound();
			}
		}
	}

	showMessage(message) {
		this.gameButtons.classList.add('d-none');
		this.gameRun = false;
		this.answerField.innerText = message;
	}

	wrongValue() {
		const phraseRandom = Math.round(Math.random());
		const answerPhrase = (phraseRandom === 1) ?
			`Вы загадали неправильное число!\n\u{1F914}` :
			`Я сдаюсь..\n\u{1F92F}`;
		this.showMessage(answerPhrase)
	}

	init() {
		this.bindToDOM();
		this.addListeners();
		this.initialMinValue.value = this.minValue;
		this.initialMaxValue.value = this.maxValue;
		document.querySelector('#minValue').textContent = this.minValue;
		document.querySelector('#maxValue').textContent = this.maxValue;
	}
}

let game = new Game();
game.init();