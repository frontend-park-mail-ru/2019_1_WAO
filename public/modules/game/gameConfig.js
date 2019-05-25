// const gameSettings = {
//   canvasWidth: 400,
//   rightIndent: 91,
//   leftIndent: 91,
// };

const gameConfig = {
  render: {
    duration: 1000 / 60,  // Минимальная продолжительность одного кадра
    maxDuration: 1000 / 16, // Максимальная продолжительность одного кадра
    delay: 0, // Время между кадрами вычисляется
    lastFrame: 0, // Время с прошлого кадра вычисляется
    now: 0,
  },
  map: {
    koefGeneratePlates: 0.01,
    koefHeightOfMaxGenerateSlice: 2000,
    leftIndent: 91,
    rightIndent: 91,
    canvasWidth: 400,
    canvasHeight: 700,
  },
  plate: {
    width: 90,
    height: 15,
  },
  player: {
    koefJump: -0.35,
    maxScrollHeight: 0.25 * 700,
    minScrollHeight: 0.75 * 700,
    koefScrollSpeed: 0.5,
    gravity: 0.0004,
  }
};

export { gameConfig };
// export { gameSettings };