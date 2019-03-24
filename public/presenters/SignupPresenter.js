import SignUpView from '../views/signup/SignUpView.js';
import SignUpModel from '../models/SignUpModel.js';
import EventBus from '../modules/eventbus.js';

const eventList = [
	'auth_check'
];

/**
 * SignInView view
 * @class SignInView
 */
export default class SignUpPresenter {
	constructor(globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new SignUpView(application, eventBus);
		this.model = new SignUpModel(eventBus);
	}
}