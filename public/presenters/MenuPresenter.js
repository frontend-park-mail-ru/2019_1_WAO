import MenuView from '../views/menu/MenuView';
import MenuModel from '../models/MenuModel';
import EventBus from '../modules/eventbus';

/**
 * MenuPresenter view
 * @class MenuPresenter
 */
export default class MenuPresenter {
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new MenuView(application, eventBus);
    this.model = new MenuModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('auth_bad', () => {
      Router.route('/signin');
    });
  }
}
