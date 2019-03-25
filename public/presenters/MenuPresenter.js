import MenuView from '../views/menu/MenuView.js';
import MenuModel from '../models/MenuModel.js';
import EventBus from '../modules/eventbus.js';

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

		eventBus.on('auth_bad', () => {
			Router.route('/signin');
		});
	}
}