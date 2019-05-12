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

  foundPlate(id) {
    let i = 0;
    for (;i < this.state.plates.length; i++) {
      if (this.state.plates[i].idPhys === id) {
        return this.state.plates[i];
      }
    }
    return undefined;
  }

  giveCurrentPlate(plate) {
    this.score.currentPlatePhysId = plate.idPhys;
    this.stateHasBeenUpdate = true;
  }

  scoreCounter() {
    if (this.stateHasBeenUpdate === true) {
      if (this.foundPlate(this.score.currentPlatePhysId).y < this.foundPlate(this.score.lastPlatePhysId).y) {
        this.score.score += this.foundPlate(this.score.lastPlatePhysId).y - this.foundPlate(this.score.currentPlatePhysId).y;
        this.score.score = (~~(this.score.score*100))/100;
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
