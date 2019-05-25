export default class Score {
  constructor(state, scorePlace) {
    // Передача самых новых данных о состоянии игры
    this.state = state;
    // Элемент экрана куда надо отображать
    this.scorePlace = scorePlace;
    // Внутренние переменные
    this.score = {};
    this.score.score = 0;
    this.score.currentPlatePhysId = 0;  // Текущая пластина, на которой находится игрок
    this.score.lastPlatePhysId = 0; // Самая высокая пластина на которой игрок был в последний раз
    // Флаги
    this.stateHasBeenUpdate = false;
  }

  setState(state) {
    this.state = state;
  }

  giveCurrentPlate(id) {
    this.score.currentPlatePhysId = id;
    this.stateHasBeenUpdate = true;
  }

  scoreCounter() {
    if (this.stateHasBeenUpdate === true) {
      if (this.state.plates[this.score.currentPlatePhysId].y < this.state.plates[this.score.lastPlatePhysId].y) {
        this.score.score += this.state.plates[this.score.lastPlatePhysId].y - this.state.plates[this.score.currentPlatePhysId].y;
        this.score.score = ~~this.score.score;
        this.score.lastPlatePhysId = this.score.currentPlatePhysId;
      }
      this.stateHasBeenUpdate = false;
    }
    return this.score.score;
  }

  renderScore() {
    this.scorePlace.text = this.scoreCounter();
  }
}
