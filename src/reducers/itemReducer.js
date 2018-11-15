import { FETCH_ITEMS, SORT_ITEMS, FETCH_TOKEN} from '../actions/types';

const initialState = {
	items: [],
	token: null,
	error: null,
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
		default: return state;
	}
}