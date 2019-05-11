import BaseView from './BaseView';
import template from '../components/resultboard/resultboard.hbs';
import '../components/resultboard/resultboard.css';

const viewData = {
  score: 718,
  buttons: [
    {
      text: 'Можем повторить',
      href: '/gameoffline',
    },
    {
      text: 'Таблица лидеров',
      href: '/scoreboard',
    },
    {
      text: 'Меню',
      href: '/',
    },
  ],
};

/**
 * MenuView view
 * @class MenuView
 */
export default class ResultBoardView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus) {
    super({
      el,
      eventBus,
      template,
      viewData,
    });
  }
}
