import { FETCH_ITEMS, FETCH_TOKEN, FETCH_ITEMS_ERROR, FETCH_TOKEN_ERROR} from '../actions/types';

const initialState = {
	items: [],
	token: null,
	error: null,
	dismiss: null,
	initialized: false,
	from: null,
	to: null
}

export default function(state = initialState, action){
	switch(action.type){
		case FETCH_TOKEN: 
			return {
				...state,
				token: action.payload
			}
		case FETCH_ITEMS:
			return {
				...state,
				items: action.payload.data,
				token: action.payload.token
			}
		case FETCH_ITEMS_ERROR:
			return {
				...state,
				error: action.payload.error,
				dismiss: action.payload.err
			}
		case FETCH_TOKEN_ERROR:
			return {
				...state,
				error: action.payload.error,
				dismiss: action.payload.err
			}
		default: return state;
	}
}