import RulesView from '../views/rules/RulesView';
import RulesModel from '../models/RulesModel';
import EventBus from '../modules/eventbus';

/**
 * RulesPresenterRulesPresenter view
 * @class RulesPresenter
 */
export default class RulesPresenter {
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    const eventBus = new EventBus();
    this.view = new RulesView(application, eventBus);
    this.model = new RulesModel(eventBus);

    globalEventBus.on('auth_bad', () => {
      Router.route('/signin');
    });
  }
}
