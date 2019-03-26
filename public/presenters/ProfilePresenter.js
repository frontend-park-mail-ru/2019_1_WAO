import ProfileView from '../views/profile/ProfileView.js';
import ProfileModel from '../models/ProfileModel.js';
import EventBus from '../modules/eventbus.js';

const eventList = [
	'auth_check'
];

/**
 * ProfilePresenter view
 * @class ProfilePresenter
 */
export default class ProfilePresenter {
	constructor(Router, globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new ProfileView(application, eventBus);
		this.model = new ProfileModel(eventBus);
	}
}