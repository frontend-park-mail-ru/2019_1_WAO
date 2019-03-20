const noop = () => null;
const baseUrl = 'http://127.0.0.1:3000';

const apiPath = '/api/v1'
// const apiPath = '/v1'
const REQ_STATE = 4;

class AjaxModule {
  _ajax({
    callback = noop,
    method = 'GET',
    path = '/',
    body = {},
  } = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, baseUrl + apiPath + path, true);
    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== REQ_STATE) {
        return;
      }

      callback(xhr);
    };
    if (body) {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  }

  doPost({callback = noop,
    path = '/',
    body = {},
  } = {}) {
    this._ajax({
      callback,
      method: 'POST',
      path,
      body,
    });
  }

  doGet({callback = noop,
    path = '/',
    body = {},
  } = {}) {
    this._ajax({
      callback,
      method: 'GET',
      path,
      body,
    });
  }

  doFetchGet({path = '/'} = {}) {
    return fetch(baseUrl + path, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      body: null,
    });
  }

  doPromiseGet({path = '/'} = {}) {
    return new Promise(function(resolve, reject) {
      this._ajax({
        callback: resolve,
        path,
        method: 'GET',
      });
    }.bind(this));
  }
}

const AjaxMod = new AjaxModule();
export default AjaxMod;
