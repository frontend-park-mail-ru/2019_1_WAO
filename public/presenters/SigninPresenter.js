import SignInView from '../views/signin/SignInView.js';
import SignInModel from '../models/SignInModel.js';
import EventBus from '../modules/eventbus.js';

/**
 * SignInView view
 * @class SignInView
 */
export default class SignInPresenter {
	constructor(Router, globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new SignInView(application, eventBus);
		this.model = new SignInModel(eventBus);

		eventBus.on('auth_ok', () => {
			Router.route('/');
		});

		eventBus.on('signin_ok', () => {
			Router.route('/');
		});
		
		eventBus.on('signin_bad', () => {
			Router.route('/signin');
		});
	}
}