import * as api from '../lib/api';

export const getToken = () => {
	return api.get('api/token');
}

export const getData = (token, f, t) => {
	return new Promise((resolve, reject) => {
		api.get('api/data', {
			from: f,
			to: t,
			token: token
		})
		.then(
			(res) => {
				resolve(res);
			}
		).catch(error => {
			reject(error);
			// let {status} = error;
			// if (status === 400) {
			// 	getData(token, 1, 20);
			// } else if (status === 401) {
			// 	getToken();
			// } else if (status === 403) {
			// 	setTimeout(() => {this.getToken();}, 30000);;
			// } else if (status === 500) {
			// 	getToken();
			// }
		});
	});
	
	
}