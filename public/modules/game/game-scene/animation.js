

export default class Animator {
  constructor(state, index) {
    this.state = state;
    this.index = index;
  }

  getStateAndIndex(state, index) {
    this.state = state;
    this.index = index;
  }

  animate() {
    const playersDurations = {};
    this.state.commands.forEach((command) => {
      playersDurations[command.idP] = {
        idP: command.idP,
        direction: command.direction,
      };
    });
    console.log(playersDurations);
    Object.values(playersDurations).forEach((playerCommand) => {
      const player = this.state.players[playerCommand.idP];
      switch (playerCommand.direction) {
        case '':
          if (player.dy < 0) {
            console.log('# jump', playerCommand.direction);
            this.index.players[playerCommand.idP].animationState = 'jump';
          } else {
            // console.log('# fall', playerCommand.direction);
            this.index.players[playerCommand.idP].animationState = 'fall';
          }
          break;
        case 'LEFT':

          // console.log('# left', playerCommand.direction);
          this.index.players[playerCommand.idP].animationState = 'left';
          break;
        case 'RIGHT':
          // console.log('# right', playerCommand.direction);
          this.index.players[playerCommand.idP].animationState = 'right';
          break;
        default:
          // console.log('# default', playerCommand.direction);
          this.index.players[playerCommand.idP].animationState = 'jump';
          break;
      }
    });
  }
}
