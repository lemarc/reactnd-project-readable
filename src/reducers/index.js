import { combineReducers } from 'redux'
import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
	RECEIVE_COMMENTS,
	RECEIVE_COMMENTS_COUNT,
	RECEIVE_POST,
	UPDATE_POST
} from '../actions'

function categories ( state = {categories:[]}, action ) {
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

function posts ( state = {posts:[]}, action) {
	const { posts, post, id } = action
	switch ( action.type ) {
		case RECEIVE_POSTS :
			return {
				...state,
				posts
			}
		case RECEIVE_POST :
			return {
				...state,
				post
			}
		case UPDATE_POST :
			let postsCopy = state.posts.slice() // shallow copy of posts
			postsCopy.forEach( (p,i) => {
				if (p.id === id) {
					postsCopy[i] = post // replace original with updated post
				}
			})
			return {
				...state,
				posts: postsCopy,
				post
			}
		default :
			return state
	}
}

function comments ( state = {count:{}}, action ) {
	switch ( action.type ) {
		case RECEIVE_COMMENTS :
			const { comments } = action
			return {
				...state,
				comments
			}
		case RECEIVE_COMMENTS_COUNT :
			const { id, count } = action
			return {
				...state,
				count: {
					...state.count,
					[id]: count
				}
			}
		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})