import ScoreBoardView from '../views/scoreboard/ScoreBoardView';
import ScoreBoardModel from '../models/ScoreBoardModel';
import EventBus from '../modules/eventbus';

/**
 * ScoreBoardPresenter view
 * @class ScoreBoardPresenter
 */
export default class ScoreBoardPresenter {
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new ScoreBoardView(application, eventBus);
    this.model = new ScoreBoardModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });


    eventBus.on('auth_bad', () => {
      Router.route('/signin');
    });

    eventBus.on('users_rx', (data) => {
      console.log(data);
      this.view.render(application, data);
    });
  }
}
