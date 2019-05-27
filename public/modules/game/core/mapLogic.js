import { gameConfig } from '../gameConfig';

function genMap(beginY, b, k, idPhysicBlockCounter) {
  const newBlocks = {};
  const p = b / k; // Плотность распределения пластин
  let currentX;
  let currentY = beginY;
  for (let i = 0; i < k; i++) {
    currentX = Math.random() * ((gameConfig.map.canvasWidth - gameConfig.map.rightIndent) - gameConfig.map.leftIndent + 1) + gameConfig.map.leftIndent;
    newBlocks[idPhysicBlockCounter.idPhys] = {
      x: currentX,
      y: currentY,
      dy: 0,
      idPhys: idPhysicBlockCounter.idPhys,
    };
    idPhysicBlockCounter.idPhys += 1;
    currentY -= p;
  }
  return newBlocks;
};

export { genMap };