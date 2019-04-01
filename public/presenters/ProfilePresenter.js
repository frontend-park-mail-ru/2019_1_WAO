import ProfileView from '../views/profile/ProfileView';
import ProfileModel from '../models/ProfileModel';
import EventBus from '../modules/eventbus';

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

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('users_rx', (data) => {
      console.log(data);
      this.view.render(application, data);
    });
  }
}
