import SignInView from '../views/signin/SignInView.js';
import SignInModel from '../models/SignInModel.js';
import EventBus from '../modules/eventbus.js';

const eventList = [
	'auth_check'
];

/**
 * SignInView view
 * @class SignInView
 */
export default class SignInPresenter {
	constructor(globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new SignInView(application, eventBus);
		this.model = new SignInModel(eventBus);
	}
}