import BaseView from './BaseView';
import template from '../components/menu/menu.hbs';
import '../components/menu/menu.css';
import '../components/menu/__button/__button.css';

const viewData = {
  menuButtons: [
    {
      text: 'Мультиплеер',
      href: '/gameonline',
    },
    {
      text: 'Синглплеер',
      href: '/gameoffline',
    },
    {
      text: 'Магазин',
      href: '/store',
    },
    {
      text: 'Профиль',
      href: '/profile',
    },
    {
      text: 'Таблица лидеров',
      href: '/users',
    },
    {
      text: 'Об игре',
      href: '/about',
    },
  ],
};

/**
 * MenuView view
 * @class MenuView
 */
export default class MenuView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super({
      el,
      eventBus,
      template,
      components,
      viewData,
    });
  }
}
