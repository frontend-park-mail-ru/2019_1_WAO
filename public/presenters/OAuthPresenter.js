import { EventBus } from '../modules/eventbus';

export default class OAuthPresenter {
  constructor() {
    this.eventBus = new EventBus();
  }

  call(data = {}) {
    document.location.href = 'https://vk.com';
  }
}
