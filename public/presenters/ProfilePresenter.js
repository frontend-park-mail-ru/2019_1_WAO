import ProfileView from '../views/profile/ProfileView.js';
import ProfileModel from '../models/ProfileModel.js';
import EventBus from '../modules/eventbus.js';

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

    eventBus.on('users_rx', (data) => {
      console.log(data);
      this.view.render(application, data);
    });
  }
}
