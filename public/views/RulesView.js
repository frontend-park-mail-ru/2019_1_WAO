import BaseView from './BaseView';
import template from '../components/rules/Rules.tmpl.xml';

/**
 * RulesView view
 * @class RulesView
 */
export default class RulesView extends BaseView {
  /**
   * Конструктор класса View
   * @param {document.body} el Куда отображать
   * @param {EventBus} eventBus Локальная шина событий
   */
  constructor(el, eventBus, components = []) {
    super(el, eventBus, template, components);
  }
}
