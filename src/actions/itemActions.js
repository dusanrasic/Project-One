import { FETCH_ITEMS, FETCH_TOKEN, FETCH_ITEMS_ERROR, FETCH_TOKEN_ERROR } from './types';
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
	.catch((error) => {
		let err = handleError(error);
		dispatch({
			type: FETCH_TOKEN_ERROR,
			payload: {error, err},
			
		})
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
		payload: {
			data: res.data,
			token:res.token
		},
	}))
	.catch((error) => {
		let err = handleError(error);
		dispatch({
			type: FETCH_ITEMS_ERROR,
			payload: {error, err}
		})
	})	
}
const handleError = (error) => {
	if(error.status == 401 || error.status == 403 || error.status == 500){
		return null;
	}
}