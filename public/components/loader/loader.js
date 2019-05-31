import './loader.scss';

export default class Loader {
  constructor(parent) {
    this.loader = document.createElement('div');
    this.loader.id = 'loader-container';

    this.loaderText = document.createElement('p');
    this.loaderText.id = 'loadingText';
    this.loaderText.textContent = 'Ждем игроков';

    this.loader.appendChild(this.loaderText);
    parent.appendChild(this.loader);
  }

  show() {
    this.loader.style.display = null;
  }

  hide() {
    this.loader.style.setProperty('display', 'none', 'important');
  }
}
