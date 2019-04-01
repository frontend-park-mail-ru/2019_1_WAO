import BaseView from '../view/BaseView';
import template from './ScoreBoard.tmpl.xml';

/**
 * ScoreBoardView view
 * @class ScoreBoardView
 */
export default class ScoreBoardView extends BaseView  {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super(el, eventBus, template);
  }
}
