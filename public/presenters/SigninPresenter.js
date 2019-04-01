import SignInView from '../views/signin/SignInView';
import SignInModel from '../models/SigninModel';
import EventBus from '../modules/eventbus';

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

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

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
