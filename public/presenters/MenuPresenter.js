import MenuView from '../views/menu/MenuView.js';
import MenuModel from '../models/MenuModel.js';
import EventBus from '../modules/eventbus.js';

const eventList = [
	'auth_check'
];

/**
 * MenuPresenter view
 * @class MenuPresenter
 */
export default class MenuPresenter {
	constructor(globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new MenuView(application, eventBus);
		this.model = new MenuModel(eventBus);
	}
}