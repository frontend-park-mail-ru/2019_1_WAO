import { gameConfig } from '../gameConfig';

function setPlayerOnPlate(plate, players) {
  players[0].y = plate.y - gameConfig.plate.height;
  players[0].x = plate.x + gameConfig.plate.width / 2; // Отцентровка игрока по середине
}

export { setPlayerOnPlate };