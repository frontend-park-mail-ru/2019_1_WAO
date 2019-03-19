import Ajax from './ajax.js';
import User from './user.js';
import {routerPaths} from '../utils/constants.js';

class AuthModule {
/*
	constructor({
		resolve = noop,
		reject = noop,
	} = {}) {
		this._resolve = resolve;
		this._reject = reject;
	}
*/

  // /*
  check() {
    return new Promise((resolve, reject) => {
      Ajax.doGet({
        callback(xhr) {
          if (xhr.status === 200 || xhr.status === 304) {
            User.set(JSON.parse(xhr.responseText));
            console.log(User.get());
            resolve(User.get());
          } else {
            reject();
          }
        },
        path: '/sessions',
      });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      Ajax.doDelete({
        callback(xhr) {
          if (xhr.status === 200 || xhr.status === 304) {
            User.reset();
            resolve();
          } else {
            reject();
          }
        },
        path: '/sessions',
      })
    })
  }
//* /
}

const Auth = new AuthModule();
export default Auth;
