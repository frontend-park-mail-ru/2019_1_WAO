import SignUpView from '../views/signup/SignUpView.js';
import SignUpModel from '../models/SignUpModel.js';
import EventBus from '../modules/eventbus.js';

/**
 * SignInView view
 * @class SignInView
 */
export default class SignUpPresenter {
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new SignUpView(application, eventBus);
    this.model = new SignUpModel(eventBus);

    eventBus.on('signup_ok', () => {
      Router.route('/');
    });

    eventBus.on('signup_bad', () => {
      Router.route('/signup');
    });
  }
}
