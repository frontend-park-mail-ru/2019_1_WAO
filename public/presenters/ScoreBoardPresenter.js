import ScoreBoardView from '../views/scoreboard/ScoreBoardView.js';
import ScoreBoardModel from '../models/ScoreBoardModel.js';
import EventBus from '../modules/eventbus.js';

/**
 * ScoreBoardPresenter view
 * @class ScoreBoardPresenter
 */
export default class ScoreBoardPresenter {
	constructor(globalEventBus) {
		const application = document.getElementById('application');
		const eventBus = new EventBus();
		this.view = new ScoreBoardView(application, eventBus);
		this.model = new ScoreBoardModel(eventBus);

		eventBus.on('users_rx', (data) => {
			console.log(data);			
			this.view.render(application, data);
		});
	}
}