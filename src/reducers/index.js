import { combineReducers } from 'redux'
import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
	RECEIVE_COMMENTS,
	RECEIVE_COMMENTS_COUNT,
	RECEIVE_POST,
	UPDATE_POST,
	SORT_POSTS,
	SORT_COMMENTS,
	UPDATE_COMMENT
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

function posts ( state = {posts:[], post: {}, sort:{by: 'timestamp', order: -1}}, action) {
	const { posts, post, id, sort } = action
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
		case SORT_POSTS :
			return {
				...state,
				sort
			}
		default :
			return state
	}
}

function comments ( state = { comments:[], count:{}, sort:{by: 'timestamp', order: -1} }, action ) {
	const { comments, comment, id, count, sort} = action
	switch ( action.type ) {
		case RECEIVE_COMMENTS :
			return {
				...state,
				comments
			}
		case RECEIVE_COMMENTS_COUNT :
			return {
				...state,
				count: {
					...state.count,
					[id]: count
				}
			}
		case SORT_COMMENTS :
			return {
				...state,
				sort
			}
		case UPDATE_COMMENT :
			let commentsCopy = state.comments.slice() // shallow copy of comments
			commentsCopy.forEach( (c,i) => {
				if (c.id === id) {
					commentsCopy[i] = comment // replace original with updated comment
				}
			})
			return {
				...state,
				comments: commentsCopy,
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