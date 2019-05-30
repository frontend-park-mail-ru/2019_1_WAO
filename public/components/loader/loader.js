import './loader.scss';

export default class Loader {
  constructor(parent) {
    this.loader = document.createElement('div');
    this.loader.classList.add('loader');

    this.caption = document.createElement('div');
    this.caption.classList.add('caption');

    this.cubeLoader = document.createElement('div');
    this.cubeLoader.classList.add('cube-loader');

    this.cube1 = document.createElement('div');
    this.cube1.classList.add('cube');
    this.cube1.classList.add('loader-1');

    this.cube2 = document.createElement('div');
    this.cube2.classList.add('cube');
    this.cube2.classList.add('loader-2');

    this.cube3 = document.createElement('div');
    this.cube3.classList.add('cube');
    this.cube3.classList.add('loader-3');

    this.cube4 = document.createElement('div');
    this.cube4.classList.add('cube');
    this.cube4.classList.add('loader-4');

    this.cubeLoader.appendChild(this.cube1);
    this.cubeLoader.appendChild(this.cube2);
    this.cubeLoader.appendChild(this.cube3);
    this.cubeLoader.appendChild(this.cube4);

    this.caption.appendChild(this.cubeLoader);
    this.loader.appendChild(this.caption);
    parent.appendChild(this.loader);
  }

  show() {
    this.loader.style.display = null;
  }

  hide() {
    this.loader.style.setProperty('display', 'none', 'important');
  }
}
