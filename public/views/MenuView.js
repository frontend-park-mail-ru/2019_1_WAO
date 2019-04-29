import BaseView from './BaseView';
import template from '../components/menu/menu.hbs';
import '../components/menu/menu.css';
import '../components/menu/__button/__button.css';

const viewData = {
  menuButtons: [
    {
      text: 'Мультиплеер',
      href: '/gameonline',
      public: false,
    },
    {
      text: 'Синглплеер',
      href: '/gameoffline',
      public: true,
    },
    {
      text: 'Магазин',
      href: '/store',
      public: true,
    },
    {
      text: 'Профиль',
      href: '/profile',
      public: false,
    },
    {
      text: 'Таблица лидеров',
      href: '/users',
      public: true,
    },
    {
      text: 'Об игре',
      href: '/about',
      public: true,
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
