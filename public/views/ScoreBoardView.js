import BaseView from './BaseView';
import template from '../components/scoreboard/scoreboard.handlebars';

const dataView = {
  title: {
    text: 'Таблица лидеров',
  },
}

/**
 * ScoreBoardView view
 * @class ScoreBoardView
 */
export default class ScoreBoardView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super(el, eventBus, template, components, dataView);
  }
}
