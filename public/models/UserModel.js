import {
  baseUrl,
  getAuth,
  checkStatus,
  parseJSON,
  getUser,
} from '../modules/api';

const defaultData = {
  nickname: 'New Player',
  email: 'Empty',
  score: 0,
  wins: 0,
  games: 0,
  image: `${baseUrl}/uploads/user.png`,
  isAuth: false,
};

class UserModel {
  constructor(data = defaultData) {
    this.data = data;
  }

  set(data) {
    for (const param in data) {
      if (
        param
        && Object.prototype.hasOwnProperty.call(this.data, param)
        && Object.prototype.hasOwnProperty.call(data, param)
      ) {
        this.data[param] = data[param];
      }
    }
  }

  reset() {
    this.set(defaultData);
  }

  async load() {
    try {
      if (!this.data.isAuth) {
        await this.update();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update() {
    try {
      const res = await getAuth();
      const status = await checkStatus(res);
      const nickname = await parseJSON(status);
      // const { nickname } = nickname0;
      console.log(`session ok for ${nickname}`);

      const res2 = await getUser(nickname);
      const status2 = await checkStatus(res2);
      const data = await parseJSON(status2);
      console.log('get user ok');

      this.set(data);
      this.data.isAuth = true;
      console.log(this.data);
    } catch (err) {
      console.log(err);
      this.reset();
      console.log('reset');
    }
  }
}

const UserM = new UserModel();
export default UserM;
