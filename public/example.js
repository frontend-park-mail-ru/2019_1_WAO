import EventBus from './modules/eventbus.js';
import Api from './modules/api.js';
import BaseView from './views/view/BaseView.js'
import template from './views/menu/Menu.tmpl.xml';

// ФАЙЛ ДЛЯ ПРОБ И ОШИБОК

class ExampleView extends BaseView {
  constructor(el, eventBus) {
    super(el, eventBus, template);
    this._el = el;
  }

  render(application) {
    this._el.innerHTML = `
    <div>
      <input id="inputImg" type="file" placeholder="Картинка" name="image"/>
      <input id="buttonImg" type="button" value="Сменить картинку"/>
    </div>
    `;
    this._el.style.display = null;
  }
}

export default class ExamplePresenter {
  constructor(Router, globalEventBus) {
    const application = document.getElementById('application');
    this._eventBus = new EventBus();
    this.view = new ExampleView(application, this._eventBus);
    this._eventBus.on("view_show", () => {
      this._updateUser();
    });

  }

  _updateUser() {
    const form = document.getElementsByTagName('form')[0];
    const button = document.getElementById('buttonImg');
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const image = document.getElementById('inputImg').files[0];
      var formData = new FormData();
      formData.append('nickname', 'Goshan');
      formData.append('email', '111111');
      formData.append('password', '123456');
      formData.append('image', image);

      Api.putProfile('Goshan', formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201 || res.status == 304) {
            console.log('Нормас');
          } else {            
            console.log('Не нормас');
          }
        })
      .catch((err) => { 
        console.log(err);
        this._eventBus.trigger("update_bad");
      });
    });
  }
}