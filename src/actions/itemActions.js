import { FETCH_ITEMS, FETCH_TOKEN } from './types';
import * as api from '../lib/api';

export const fetchToken = () => dispatch => {		
	api.get('api/token')
	.then(res => { 
		dispatch({
			type: FETCH_TOKEN,
			payload: res.token
		});
		dispatch(fetchData(res.token))
	})
}
export const fetchData = (token, f=1, t=20) => dispatch => {
	api.get('api/data', {
		from: f,
		to: t,
		token: token
	})
	.then(res => dispatch({
		type: FETCH_ITEMS,
		payload: res.data,
		token: res.token
	}));
}