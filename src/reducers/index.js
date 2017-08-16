import { combineReducers } from 'redux'
import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
} from '../actions'

function categories ( state = {}, action ) {
	switch ( action.type ) {
		case RECEIVE_CATEGORIES :
			const { categories } = action
			return {
				...state,
				categories
			}
		default :
			return state
	}
}

function posts ( state = {}, action) {
	//const { day, recipe, meal } = action

	switch ( action.type ) {
		case RECEIVE_POSTS :
		const { posts } = action
			return {
				...state,
				posts
			}
		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts
})