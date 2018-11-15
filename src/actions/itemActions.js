import { FETCH_ITEMS, SORT_ITEMS, FETCH_TOKEN} from './types';
import * as api from '../lib/api';

export const fetchToken = () => dispatch => {
		console.log('fetching');
		
		api.get('api/token')
		.then(res => dispatch({
			type: FETCH_TOKEN,
			payload: res.token
		}))
}
// handleError(error){
// 	let {status} = error;
// 	let {token, from, to} = this.state;
// 	if (status === 400) {
// 		getData(token, from, to)
// 		.then(
// 			(res) => {
// 				this.setState({
// 					token: res.token,
// 					items: res.data
// 				})
// 			}
// 		)
// 	} else if (status === 401) {
// 		getToken()
// 		.then(
// 			(res) => {
// 				this.setState({
// 					token: res.token,
// 					initialized: true,
// 				})			
// 			}
// 		);
// 	} else if (status === 403) {
// 		setTimeout(() => {
// 			getToken()
// 			.then(
// 			(res) => {
// 				this.setState({
// 					token: res.token,
// 					initialized: true,
// 				})			
// 			}
// 		);}, 30000);;
// 	} else if (status === 500) {
// 		getToken()
// 		.then(
// 			(res) => {
// 				this.setState({
// 					token: res.token,
// 					initialized: true,
// 				})			
// 			});
// 	}
// }