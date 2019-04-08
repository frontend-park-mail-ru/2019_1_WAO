import BaseView from './BaseView';
// import template from '../components/menu/menu.tmpl.xml';
// import MenuComponent from '../components/menu/menu';
import template from '../components/menu/menu.handlebars';

const menuButtons = [
  {
      title: 'Играть онлайн',
      href: '/',
  },
  {
      title: 'Играть одному',
      href: '/',
  },
  {
      title: 'Магазин',
      href: '/',
  },
  {
      title: 'Профиль',
      href: '/profile',
  },
  {
      title: 'Таблица лидеров',
      href: '/users',
  },
  {
      title: 'Об игре',
      href: '/',
  },
];
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
    super(el, eventBus, template, components);
  }
}
