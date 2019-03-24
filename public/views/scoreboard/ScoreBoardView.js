import BaseView from '../view/BaseView.js'
import template from './ScoreBoard.tmpl.xml';

/**
 * ScoreBoardView view
 * @class ScoreBoardView
 */
export default class ScoreBoardView extends BaseView  {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    //this._eventBus.trigger("auth_check");
  }
}
