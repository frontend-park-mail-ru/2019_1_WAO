// определим размеры ячейки (в будущем учитываем, что все размеры надо учитывать с коэффициентом del)
var sizeX = 200 * del,
		sizeY = 200 * del;
// сама функция отрисовки
var drawGrid = function () {

        // узнаем, сколько раз нам надо повторить клеточку по X и Y
	var x = width / sizeX,
			y = height / sizeY;
        // Обращаемся к команде отрисовки прямоугольника
	OOP.forXY(x, y, function (x, y) { // первые два аргумента - это повторения по X и Y, затем функция
		brush.drawRectS({
			x : (sizeX + 2)*x, // позиция по X
			y : (sizeY + 2)*y, // по Y
			fillColor : 'white', // цвет заливки
			w : sizeX, h : sizeY // ширина и высота
		});
	});
};