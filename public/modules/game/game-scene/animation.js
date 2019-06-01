

export default class Animator {
  constructor(state, index) {
    this.state = state;
    this.index = index;
  }

  getStateAndIndex(state, index) {
    this.state = state;
    this.index = index;
  }

  animate(commands) {
    let playersDurations = {};
    commands.forEach(command => {
      playersDurations[command.idP] = {
        idP: command.idP,
        direction: command.direction,
      };
    });
    Object.values(playersDurations).forEach(playerCommand => {
      const player = this.state.players[playerCommand.idP];
      switch (playerCommand.command) {
        case '':
          if (player.dy < 0) {
            this.index.players[playerCommand.idP].animationState = 'jump';
          } else {
            this.index.players[playerCommand.idP].animationState = 'fall';
          }
          break;
        case 'LEFT':
            this.index.players[playerCommand.idP].animationState = 'left';
          break;
        case 'RIGHT':
            this.index.players[playerCommand.idP].animationState = 'right';
          break;
        default:
          break;
      }
    });
}