import { combineReducers } from 'redux'
import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
	RECEIVE_COMMENTS,
	RECEIVE_POST,
	UPDATE_POST,
	SORT_POSTS,
	SORT_COMMENTS,
	UPDATE_COMMENT,
	UPDATE_NEW_COMMENT,
	REMOVE_COMMENT
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

function posts ( state = {byId:{}, sort:{by: 'timestamp', order: -1}}, action) {
	const { posts, post, sort } = action
	switch ( action.type ) {
		case RECEIVE_POSTS :
			return {
				...state,
				byId: posts.reduce( (byId, post) => ( {...byId, [post.id]: post} ), {})
			}
		case RECEIVE_POST :
			return {
				...state,
				byId: {
					...state.byId,
					[post.id]: post
				}
			}
		// Same as receive
		case UPDATE_POST :
			return {
				...state,
				byId:{
					...state.byId,
					[post.id]: post
				}
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

function comments ( state = { byParentId: {}, sort:{by: 'timestamp', order: -1}, new: {author: '', body: ''}}, action ) {
	const { comments, comment, parentId, sort} = action
	switch ( action.type ) {
		case RECEIVE_COMMENTS :
			return {
				...state,
				byParentId: {
					...state.byParentId,
					[parentId]: comments.reduce( (byId, comment) => ( {...byId, [comment.id]: comment} ), {})
				}
			}
		case SORT_COMMENTS :
			return {
				...state,
				sort
			}
		case UPDATE_COMMENT :
			return {
				...state,
				byParentId: {
					...state.byParentId,
					[comment.parentId]: {
						...state.byParentId[comment.parentId],
						[comment.id]: comment
					}
				}
			}
		case UPDATE_NEW_COMMENT :
			return {
				...state,
				new: comment
			}
		case REMOVE_COMMENT :
			let copy = {
				...state,
				byParentId: {
					...state.byParentId,
					[comment.parentId]: {
						...state.byParentId[comment.parentId]
					}
				}
			}
			delete copy.byParentId[comment.parentId][comment.id]
			return copy
		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})