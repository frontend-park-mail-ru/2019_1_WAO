import BaseView from './BaseView';
import template from '../components/store/store.hbs';
import '../components/store/store.css';

const viewData = {
  title: {
    text: 'Магазин',
  },
  products: [
    {
      image: 'https://images-eu.ssl-images-amazon.com/images/I/51mrB6jG8pL.png',
      name: 'Classic',
      cost: '100',
    },
    {
      image: 'https://nature.agrogro.ru/sites/nature.agrogro.ru/files/field/image/1220760310.jpg',
      name: 'Пёс',
      cost: '300',
    },
    {
      image: 'https://pp.userapi.com/c851036/v851036851/1945/OQl1Y7FAdtY.jpg',
      name: 'Димас',
      cost: '320',
    },
    {
      image: 'https://st.depositphotos.com/1000459/2436/i/450/depositphotos_24366251-stock-photo-soccer-ball.jpg',
      name: 'Мяч',
      cost: '400',
    },
  ],
};

/**
 * StoreView view
 * @class StoreView
 */
export default class StoreView extends BaseView {
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
