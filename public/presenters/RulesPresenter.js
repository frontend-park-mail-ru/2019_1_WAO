import RulesView from '../views/rules/RulesView.js';
import RulesModel from '../models/RulesModel.js';
import EventBus from '../modules/eventbus.js';

const eventList = [
  'auth_check',
];

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
  }
}
