import * as ReadableAPI from '../utils/api.js'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
//export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'



export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
})

export const getCategories = () => dispatch => ReadableAPI.getCategories().then( categories => dispatch( receiveCategories(categories) ) )



export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
})

export const getPosts = () => dispatch => ReadableAPI.getPosts().then( posts => dispatch( receivePosts(posts) ) )

export const getCategoryPosts = category => dispatch => ReadableAPI.getCategoryPosts(category).then( posts => dispatch( receivePosts(posts) ) )



export const receiveComments = comments => ({
	type: RECEIVE_COMMENTS,
	comments
})
/*
export function addRecipe( { recipe, day, meal} ) {
	return {
		type: ADD_RECIPE,
		recipe,
		day,
		meal
	}
}
export function removeFromCalendar( { day, meal } ) {
	return {
		type: REMOVE_FROM_CALENDAR,
		day,
		meal
	}
}
*/