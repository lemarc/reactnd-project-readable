import * as ReadableAPI from '../utils/api.js'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UPDATE_POST = 'UPDATE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_NEW_COMMENT = 'UPDATE_NEW_COMMENT'
export const REMOVE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_NEW_POST = 'UPDATE_NEW_POST'


export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
})

export const getCategories = () => dispatch => ReadableAPI.getCategories()
	.then( categories => dispatch( receiveCategories(categories) ) )



export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
})

export const getPosts = () => dispatch => ReadableAPI.getPosts()
	.then( posts => dispatch( receivePosts(posts) ) )

export const getCategoryPosts = category => dispatch => ReadableAPI.getCategoryPosts(category)
	.then( posts => dispatch( receivePosts(posts) ) )



export const receiveComments = (parentId, comments) => ({
	type: RECEIVE_COMMENTS,
	parentId,
	comments
})

export const getComments = parentId => dispatch => ReadableAPI.getComments(parentId)
	.then( comments => dispatch( receiveComments(parentId, comments) ) )

// receive a single post
export const receivePost = post => ({
	type: RECEIVE_POST,
	post
})

export const getPost = id => dispatch => ReadableAPI.getPost(id)
	.then( post => dispatch( receivePost(post) ) )

export const updatePost = post => ({
	type: UPDATE_POST,
	post
})

export const votePost = (id, option) => dispatch => ReadableAPI.votePost(id, option)
	.then( post => dispatch( updatePost(post) ) )

export const sortPosts = sort => ({
	type: SORT_POSTS,
	sort
})

export const sortComments = sort => ({
	type: SORT_COMMENTS,
	sort
})

export const updateComment = comment => ({
	type: UPDATE_COMMENT,
	comment
})

export const voteComment = (id, option) => dispatch => ReadableAPI.voteComment(id, option)
	.then( comment => dispatch( updateComment(comment) ) )


export const updateNewComment = comment => ({
	type: UPDATE_NEW_COMMENT,
	comment
})

export const submitComment = comment => dispatch => ReadableAPI.createComment(comment)
	.then( comment => dispatch( updateComment(comment)))

export const removeComment = comment => ({
	type: REMOVE_COMMENT,
	comment
})

export const deleteComment = comment => dispatch => ReadableAPI.deleteComment(comment.id)
	.then( () => dispatch( removeComment(comment) ) )

export const editComment = comment => ({
	type: EDIT_COMMENT,
	comment
})

export const saveEditComment = (id, comment) => dispatch => ReadableAPI.editComment(id,comment)
	.then( comment => dispatch(updateComment(comment)))
	.then( () => dispatch(editComment({})))

export const removePost = post => ({
	type: REMOVE_POST,
	post
})

export const deletePost = post => dispatch => ReadableAPI.deletePost(post.id)
	.then( () => dispatch( removePost(post) ) )

export const editPost = post => ({
	type: EDIT_POST,
	post
})

export const saveEditPost = (id, post) => dispatch => ReadableAPI.editPost(id,post)
	.then( post => dispatch(updatePost(post)) )
	.then( ()=> dispatch(editPost({})))

export const updateNewPost = post => ({
	type: UPDATE_NEW_POST,
	post
})

export const submitPost = (post, id) => dispatch => ReadableAPI.createPost(post, id)
	.then( post => dispatch( updatePost(post)))