import * as ReadableAPI from '../utils/api.js'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENTS_COUNT = 'RECEIVE_COMMENTS_COUNT'
export const UPDATE_POST = 'UPDATE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'



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

export const receiveCommentsCount = (id, count) => ({
	type: RECEIVE_COMMENTS_COUNT,
	id,
	count
})

export const getComments = id => dispatch => ReadableAPI.getComments(id).then( comments => dispatch( receiveComments(comments) ) )

export const getCommentsCount = id => dispatch => ReadableAPI.getComments(id).then( comments => {
	dispatch( receiveCommentsCount( id, comments.length ) )
})

// receive a single post
export const receivePost = post => ({
	type: RECEIVE_POST,
	post
})

export const updatePost = (id, post) => ({
	type: UPDATE_POST,
	id,
	post
})

export const votePost = (id, option) => dispatch => ReadableAPI.votePost(id, option).then( post => dispatch( updatePost(id,post) ) )

export const sortPosts = sort => ({
	type: SORT_POSTS,
	sort
})

export const sortComments = sort => ({
	type: SORT_COMMENTS,
	sort
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