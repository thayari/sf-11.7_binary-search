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
		// определить большее и меньшее число из введенных
		let min = Math.min(parseInt(this.initialMinValue.value), parseInt(this.initialMaxValue.value));
		let max = Math.max(parseInt(this.initialMinValue.value), parseInt(this.initialMaxValue.value));

		// если числа не равны, привести их в диапазон от -999 до 999
		if (min == max) {
			this.screenStart.classList.add('d-none');
			this.screenGame.classList.remove('d-none');
			this.showMessage('Числа равны!');
		} else {
			this.minValue = (min > -999) ? min : -999;
			this.maxValue = max < 999 ? max : 999;
			this.newRound();
		}
	};

	newRound() {
		this.orderNumber ++;
		this.answerNumber = Math.floor((this.minValue + this.maxValue) / 2);
		const answerText = this.numberToText(this.answerNumber); 
		const phrases = ['Да это легко! Вы загадали ', 'Вы загадали число ', 'Наверное, это число '];

		this.answerField.textContent = `${phrases[Math.round(Math.random()*2)]} ${answerText.length <= 20 ? answerText : this.answerNumber}?`;
		this.orderNumberField.textContent = this.orderNumber;
	};

	addListeners() {
		this.btnStart.addEventListener('click', () => {
			this.screenStart.classList.add('d-none');
			this.screenGame.classList.remove('d-none');
			this.startGame();
		});

		// начать заново - обнуляет все параметры
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
		});

		this.btnEqual.addEventListener('click', () => this.equalHandler());
		this.btnLess.addEventListener('click', () => this.changeValueHandler(() => this.maxValue = this.answerNumber - 1));
		this.btnOver.addEventListener('click', () => this.changeValueHandler(() => this.minValue = this.answerNumber + 1));
	};

	// обработка угаданного числа
	equalHandler() {
		const phrases = [`Я всегда угадываю\n\u{1F60E}`, `Это было очевидно\n\u{1F60F}`, `Проще простого\n\u{1F601}`];
		if (this.gameRun) {
			const answerPhrase = phrases[Math.round(Math.random()*2)];
			this.showMessage(answerPhrase);
		}
	};

	// при нажатии кнопки "больше" или "меньше" функция проверяет на ошибку и при ее отсутствии присваивает 
	// новое значение верхней или нижней границе и начинает новый раунд
	changeValueHandler(callback) {
		
		if (this.gameRun) {
			if (this.minValue >= this.maxValue) {
				this.wrongValue();
			} else {
				callback();
				this.newRound();
			}
		}
	};

	// скрыть кнопки. остановить игру, показать сообщение
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
		this.showMessage(answerPhrase);
	};

	numberToText(num) {
		let minus = '';
		let result;
		const units = {
			0: '',
			1: 'один',
			2: 'два',
			3: 'три',
			4: 'четыре',
			5: 'пять',
			6: 'шесть',
			7: 'семь',
			8: 'восемь',
			9: 'девять'
		};
		const tens = {
			0: '',
			2: 'двадцать',
			3: 'тридцать',
			4: 'сорок',
			5: 'пятьдесят',
			6: 'шестьдесят',
			7: 'семьдесят',
			8: 'восемьдесят',
			9: 'девяносто'
		};
		const hundreds = {
			1: 'сто',
			2: 'двести',
			3: 'триста',
			4: 'четыреста',
			5: 'пятьсот',
			6: 'шестьсот',
			7: 'семьсот',
			8: 'восемьсот',
			9: 'девятьсот'
		};
		const teens = {
			10: 'десять',
			11: 'одиннадцать',
			12: 'двенадцать',
			13: 'тринадцать',
			14: 'четырнадцать',
			15: 'пятнадцать',
			16: 'шестнадцать',
			17: 'семнадцать',
			18: 'восемнадцать',
			19: 'девятнадцать'
		};

		// разбить число на разряды
		let numArray = String(num).split('');

		// выделить минус
		if (numArray[0] == '-') {
			minus = 'минус ';
			numArray.shift();
		};

		const compareValues = (array, digit) => {
			Object.keys(array).forEach((key) => {
				if (key == digit) {
					result = array[key];
				};
			});
			return result;
		};

		if (num == 0) {
			return 0;
		};

		// проверить разрядность
		if (numArray.length == 1) {
			result = compareValues(units, numArray[0]);
		} else if (numArray.length == 2 && numArray[0] == 1) {
			result = compareValues(teens, Math.abs(num));
		} else if (numArray.length == 3 && numArray[1] == 1) {
			result = compareValues(hundreds, numArray[0]) + ' ' + compareValues(teens, Math.abs(num % 100));
		} else if (numArray.length == 2) {
			result = compareValues(tens, numArray[0]) + ' ' + compareValues(units, numArray[1]);
		} else if (numArray.length == 3) {
			result = compareValues(hundreds, numArray[0]) + ' ' + compareValues(tens, numArray[1]) + ' ' + compareValues(units, numArray[2]);
		}

		//убрать лишние пробелы
		result = result.replace(/ {1,}/g, " ").trim();

		result = minus + result;

		return result;
	};

	init() {
		this.bindToDOM();
		this.addListeners();
		this.initialMinValue.value = this.minValue;
		this.initialMaxValue.value = this.maxValue;
	}
}

let game = new Game();
game.init();
