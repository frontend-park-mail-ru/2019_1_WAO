import Ajax from './ajax.js';
import {routerPaths} from '../utils/constants.js'

class AuthModel {
/*	
	constructor({
		resolve = noop,
		reject = noop,
	} = {}) {
		this._resolve = resolve;
		this._reject = reject;
	}
*/

///*
	check() {
		return new Promise((resolve, reject) => {
			Ajax.doGet({
				callback(xhr) {
					if (xhr.status === 200 || xhr.status === 304) {
						resolve(xhr);
					} else {
						reject();
					}
				},
				path: '/sessions',
			});

		})
	}
//*/
}
const Auth = new AuthModel();
export default Auth;