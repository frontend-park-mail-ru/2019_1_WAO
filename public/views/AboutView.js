import BaseView from './BaseView';
import template from '../components/about/about.handlebars';

const vievData = {
  title1: {
      text: 'Об игре',
  },
  title1: {
      text: 'Команда',
  },
  developers: [
      {
          role: 'Frontend',
          image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
          name: 'Димас',
      },
      {
          role: 'Frontend',
          image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
          name: 'Влад',
      },
      {
          role: 'Ментор',
          image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
          name: 'Дима',
      },
      {
          role: 'Backend',
          image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
          name: 'Дима Сервер',
      },
      {
          role: 'Backend',
          image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
          name: 'Игорь',
      },
  ],
};

/**
 * MenuView view
 * @class MenuView
 */
export default class AboutView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super(el, eventBus, template, components, vievData);
  }
}
