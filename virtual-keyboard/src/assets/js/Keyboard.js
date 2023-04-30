class Keyboard {
  constructor() {
    this.char = null;
    this.shift = false;
    this.capsLock = false;
    this.lang = localStorage.getItem('lang') || 'english';
    this.text = null;
  }

  init(keys) {
    const countRowKeys = [0, 14, 15, 13, 13, 10];
    let numberRow = 0;
    let numberKeys = 0;
    document.body.classList.add('page');
    const div = document.createElement('div');
    div.classList.add('board');

    this.text = document.createElement('textarea');
    this.text.classList.add('board__input');
    this.text.setAttribute('rows', '10');
    this.text.setAttribute('cols', '50');
    this.text.style.resize = 'none';

    const kb = document.createElement('div');
    kb.classList.add('board__keyboard');

    let row = document.createElement('row');
    row.classList.add('row');

    const buttons = document.createDocumentFragment();
    buttons.append(row);

    Object.keys(keys).forEach((key) => {
      const btn = document.createElement('div');
      btn.classList.add('btn', keys[key].classBtn, keys[key].className);
      btn.addEventListener('mousedown', this.mouseDown.bind(this));
      const nameRu = document.createElement('span');
      nameRu.classList.add('russian');

      if (this.lang === 'english') {
        nameRu.classList.add('hidden');

        if (keys[key].className === 'Lang') {
          btn.classList.add('btn--lang-english');
        }

        nameRu.insertAdjacentHTML('afterBegin', `<span class="lowerKey hidden">${keys[key].russian.lowerKey}</span>`);
      } else {
        nameRu.insertAdjacentHTML('afterBegin', `<span class="lowerKey">${keys[key].russian.lowerKey}</span>`);
      }

      nameRu.insertAdjacentHTML('beforeEnd', `<span class="upperKey hidden">${keys[key].russian.upperKey}</span>`);
      btn.append(nameRu);
      const nameEn = document.createElement('span');
      nameEn.classList.add('english');

      if (this.lang === 'russian') {
        nameEn.classList.add('hidden');

        if (keys[key].className === 'Lang') {
          btn.classList.add('btn--lang-russian');
        }

        nameEn.insertAdjacentHTML('afterBegin', `<span class="lowerKey hidden">${keys[key].english.lowerKey}</span>`);
      } else {
        nameEn.insertAdjacentHTML('afterBegin', `<span class="lowerKey">${keys[key].english.lowerKey}</span>`);
      }

      nameEn.insertAdjacentHTML('beforeEnd', `<span class="upperKey hidden">${keys[key].english.upperKey}</span>`);
      btn.append(nameEn);

      if (countRowKeys[numberRow] === numberKeys) {
        row = document.createElement('row');
        row.classList.add('row');
        numberRow += 1;
        numberKeys = 0;
      }

      row.append(btn);
      buttons.append(row);
      numberKeys += 1;
    });

    const info = document.createElement('div');
    info.classList.add('board__info');
    info.insertAdjacentHTML('afterBegin', '<span>Change lang - \'Ctrl\' + \'Alt\'<br>Made in OS Windows</span>');

    div.append(this.text);
    kb.append(buttons);
    div.append(kb);
    div.append(info);
    document.body.prepend(div);

    document.addEventListener('mouseup', this.mouseUp.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
  }

  printCharBtn() {
    const e = document.querySelector('.board__input');
    const { value: val, selectionStart: start, selectionEnd: end } = e;
    e.value = val.slice(0, start) + this.char + val.slice(end, val.length);
    e.selectionStart = start + this.char.length;
    e.selectionEnd = start + this.char.length;
  }

  toggleLowUpBtn() {
    document
      .querySelectorAll(`.btn>.${this.lang}>.lowerKey`)
      .forEach((element) => element.classList.toggle('hidden'));
    document
      .querySelectorAll(`.btn>.${this.lang}>.upperKey`)
      .forEach((element) => element.classList.toggle('hidden'));
  }

  toggleLang() {
    if (this.lang === 'english') {
      this.lang = 'russian';
    } else {
      this.lang = 'english';
    }

    localStorage.setItem('lang', this.lang);
    document.querySelector('.Lang').classList.toggle('btn--lang-russian');
    document.querySelector('.Lang').classList.toggle('btn--lang-english');
    document
      .querySelectorAll('.btn>span')
      .forEach((element) => element.classList.toggle('hidden'));
    if ((this.capsLock && !this.shift) || (!this.capsLock && this.shift)) {
      document
        .querySelectorAll('.btn>span>.upperKey')
        .forEach((element) => element.classList.toggle('hidden'));
    } else {
      document
        .querySelectorAll('.btn>span>.lowerKey')
        .forEach((element) => element.classList.toggle('hidden'));
    }
  }

  keyDown(event) {
    event.preventDefault();

    const button = document.querySelector(`.${event.code}`);

    if (button) {
      button.classList.add('btn--active');
      this.char = button
        .querySelector(':not(.hidden)')
        .querySelector(':not(.hidden)').textContent;
      this.implementKeyFunction();
    }

    if (event.ctrlKey && event.altKey) {
      this.toggleLang();
    }
  }

  keyUp(event) {
    event.preventDefault();

    const button = document.querySelector(`.${event.code}`);

    if (button) {
      button.classList.remove('btn--active');
    }

    if (this.shift && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
      document
        .querySelectorAll('.btn--shift')
        .forEach((element) => element.classList.remove('btn--active'));
      this.shift = false;
      this.toggleLowUpBtn();
    }
  }

  mouseDown(event) {
    event.target.classList.add('btn--active');

    if (event.target) {
      this.char = event.target
        .querySelector(':not(.hidden)')
        .querySelector(':not(.hidden)').textContent;
      this.implementKeyFunction();
    }

    if ((this.char === 'Alt' && event.ctrlKey) || (this.char === 'Ctrl' && event.altKey)) {
      this.toggleLang();
    }
  }

  mouseUp() {
    document
      .querySelectorAll('.btn')
      .forEach((element) => element.classList.remove('btn--active'));
    if (this.shift) {
      this.shift = false;
      this.toggleLowUpBtn();
    }
    this.text.focus();
  }

  implementKeyFunction() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.text;

    switch (this.char) {
      case 'Backspace':
        if (start !== end) {
          this.text.value = val.slice(0, start) + val.slice(end, val.length);
          this.text.selectionStart = this.text.selectionEnd = start;
        } else if (start !== 0) {
          this.text.value =
            val.slice(0, start - 1) + val.slice(end, val.length);
          this.text.selectionStart = this.text.selectionEnd = start - 1;
        } else {
          this.text.selectionStart = this.text.selectionEnd = start;
        }
        break;
      case 'Del':
        if (start !== end) {
          this.text.value = val.slice(0, start) + val.slice(end, val.length);
        } else if (end !== val.length) {
          this.text.value = val.slice(0, start) + val.slice(start + 1);
        }
        this.text.selectionStart = this.text.selectionEnd = start;
        break;
      case 'Lang':
        this.toggleLang();
        break;
      case 'CapsLock':
        document
          .querySelector('.CapsLock')
          .classList.toggle('btn--caps-active');
        this.capsLock = !this.capsLock;
        this.toggleLowUpBtn();
        break;
      case 'Shift':
        if (!this.shift) {
          this.toggleLowUpBtn();
        }
        this.shift = true;
        break;
      default:
        this.printCharBtn();
    }
    this.text.focus();
  }
}

export default Keyboard;
