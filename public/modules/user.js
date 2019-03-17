import Ajax from './ajax.js';

class UserModel {
	constructor() {
		this.nickname 	= null;
		this.email	 	= null;
		this.score 		= null;
		this.wins 		= null;
		this.games 		= null;
	}

	get() {
		return {			
			nickname: 	this.nickname,
			email: 		this.email,
			score: 		this.score,
			wins: 		this.wins,
			games: 		this.games,
		}
	}

	set(data) {
		this.nickname 	= data.nickname;
		this.email	 	= data.email;
		this.score 		= data.score;
		this.wins 		= data.wins;
		this.games 		= data.games;	
	}

	update() { 
		Ajax.doGet({
			callback(xhr) {
				if (xhr.status === 200 || xhr.status === 304) {
					User.set(JSON.parse(xhr.responseText));
					console.log(User.get());
				}
			},
			path: '/sessions',
		});
	}
}

const User = new UserModel();
export default User;