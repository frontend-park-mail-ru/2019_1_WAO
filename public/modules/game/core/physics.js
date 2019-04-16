export default class Fizic {
  constructor(state) {
    this.state = state;
  }

  setPlates(plates) {
    if (!this.state.plates) {
      this.state.plates = plates;
    }
  }

  setPlayer(me) {
    if (!this.state.me) {
      this.state.me = me;
    }
  }

  pushPlates(plates) {
    this.state.plates.push(plates);
  }


}