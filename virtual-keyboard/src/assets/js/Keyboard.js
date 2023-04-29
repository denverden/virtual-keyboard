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
  }
}

export default Keyboard;
