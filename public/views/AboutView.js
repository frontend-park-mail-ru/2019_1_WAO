import BaseView from './BaseView';
import template from '../components/about/about.hbs';
import '../components/about/about.css';

const viewData = {
  title1: {
    text: 'Об игре',
  },
  title2: {
    text: 'Команда',
  },
  developers: [
    {
      role: 'Frontend',
      image: 'https://pp.userapi.com/c851036/v851036851/1945/OQl1Y7FAdtY.jpg',
      name: 'Димас',
    },
    {
      role: 'Frontend',
      image: 'https://pp.userapi.com/c846122/v846122120/137202/wK6kCZLP2Pc.jpg',
      name: 'Влад',
    },
    {
      role: 'Ментор',
      image: 'https://www.hawksearch.com/wp-content/uploads/Developer.png',
      name: 'Дима',
    },
    {
      role: 'Backend',
      image: 'https://pp.userapi.com/c847124/v847124016/136919/eOtmAzTnUbM.jpg',
      name: 'Дима Сервер',
    },
    {
      role: 'Backend',
      image: 'https://pp.userapi.com/c830508/v830508756/1c721d/5Hf4JbRU2e4.jpg',
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
  constructor(el, eventBus) {
    super({
      el,
      eventBus,
      template,
      viewData,
    });
  }
}
