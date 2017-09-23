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
	REMOVE_COMMENT,
	EDIT_COMMENT,
	EDIT_POST,
	REMOVE_POST,
	UPDATE_NEW_POST
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

function posts ( state = {byId:{}, sort:{by: 'timestamp', order: -1}, new: {title:'',author:'', body:'',category:''}, editting:{} }, action) {
	const { posts, post, sort } = action
	switch ( action.type ) {
		case RECEIVE_POSTS :
			return {
				...state,
				// getting all posts returns deleted posts, so only add the post to store if it is not deleted
				byId: posts.reduce( (byId, post) => ( post.deleted ? byId : {...byId, [post.id]: post} ), {})
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
		case EDIT_POST :
			return {
				...state,
				editting: post
			}
		case REMOVE_POST :
			let copy = {
				...state,
				byId: {
					...state.byId,
				}
			}
			delete copy.byId[post.id]
			console.log('id', post.id)
			console.log('copy',copy)
			return copy
		case UPDATE_NEW_POST :
			return {
				...state,
				new: post
			}
		default :
			return state
	}
}

function comments ( state = { byParentId: {}, sort:{by: 'timestamp', order: -1}, new: {author: '', body: ''}, editting: {} }, action ) {
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
		case EDIT_COMMENT :
			return {
				...state,
				editting: comment
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