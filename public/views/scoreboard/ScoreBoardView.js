import BaseView from '../view/BaseView';
import template from './ScoreBoard.tmpl.xml';

/**
 * ScoreBoardView view
 * @class ScoreBoardView
 */
export default class ScoreBoardView extends BaseView  {
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
