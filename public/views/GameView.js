const View = require('View');
const rand = require('rand');

import Game from '../modules/game/game';
import GAME_MODES from '../modules/game/modes';

import Figure from '../modules/graphics/figure';
import Circle from '../modules/graphics/circle';
import Scene from '../modules/graphics/scene';
import Rect from '../modules/graphics/rect';
import FadingBlock from '../modules/game/game-scene/fading-block';

class GameView extends View {
    constructor() {
        super(`js/views/GameView/GameView.tmpl`);
        this.canvas = null;
        this.game = null;

        this.bus.on('CLOSE_GAME', function () {
            if (this.active) {
                this.router.open('/');
            }
        }.bind(this));
    }

    destroy() {
        this.game.destroy();
        return this;
    }

    create(attrs) {
        super.create(attrs);
        this.canvas = this.el.querySelector('.js-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.doGame(attrs);
        return this;
    }

    doGame(pathname) {
        let mode = '';
        if (pathname === '/game/online-mode') {
            mode = GAME_MODES.ONLINE;
        } else {
            mode = GAME_MODES.OFFLINE;
        }
        this.game = new Game(mode, this.canvas);
        this.game.start();
    }
};
