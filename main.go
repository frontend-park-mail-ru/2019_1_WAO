game.newLoop('game', function () {
	// если не забыли, то сюда мы записываем Delta-Time нашей игре
dt = game.getDT(20);
game.fill('#D9D9D9'); // залили фон
drawGrid(); // отрисовали сеточку
drawLevel(); // - тут у нас выскочит ошибка
drawPlayer(); // - тут тоже будет ошибка

	// помним что делает эта команда? Рисуем счет
brush.drawTextS({
	x : 10, y : 10, // позиция (будет в самом верху экрана)
	text : 'Score: '+Math.abs(score), // текст
	size : 300*del, // размер
	color : '#515151',// цвет
	font : 'serif' // шрифт
});

});