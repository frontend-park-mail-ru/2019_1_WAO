import { gameSettings } from '../gameConfig';

const genMap = function (beginY, b, k, idPhysicBlockCounter) {
  const newBlocks = [];
  const p = b / k; // Плотность распределения пластин
  let currentX;
  let currentY = beginY;
  for (let i = 0; i < k; i++) {
    currentX = Math.random() * ((gameSettings.canvasWidth - gameSettings.rightIndent) - gameSettings.leftIndent + 1) + gameSettings.leftIndent;
    newBlocks.push({
      x: currentX,
      y: currentY,
      dy: 0,
      idPhys: idPhysicBlockCounter.idPhys++,  // Уникальный идентификатор нужен для отрисовки новых объектов
    });
    currentY -= p;
  }
  return newBlocks;
};

export { genMap };