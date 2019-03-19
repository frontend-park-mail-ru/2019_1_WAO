var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();

var vector = pjs.vector;
var log = pjs.system.log;
var game = pjs.game;
var point = vector.point;
var size = vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;

var touch = pjs.touchControl;
touch.initTouchControl();

// ширина и высота экрана после развертывания игры
var width = game.getWH().w;
var height = game.getWH().h;

// для единого размера подгонять размеры всех объектов будем с учетом коэффициента
var del = height / 1000 / 5;

// сюда будем записывать delta-time для плавности движения в игре
var dt;

// счет нашего игрока во время прохождения игры
var score = 0;

// После проигрыша с.да запишем счет, набравшийся за уровень
var levelScore = 0;

// получим счет из локального хранилища (если есть) и запомним его как лучший рекорд в oldScore
var tmpScore = localStorage.getItem('score');
var oldScore = tmpScore ? tmpScore : 0;