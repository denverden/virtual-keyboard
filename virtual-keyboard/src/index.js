import './assets/styles/page/page.scss';
import './assets/styles/board/board.scss';
import './assets/styles/row/row.scss';
import './assets/styles/btn/btn.scss';
import './assets/styles/hidden/hidden.scss';
import keys from './assets/js/buttons';
import Keyboard from './assets/js/Keyboard';

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init(keys);
};
