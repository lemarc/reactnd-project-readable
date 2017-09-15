import uuid from './uuid'

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

const token = 'm7dqrf18'

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}


/*
GET /categories
USAGE:
Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
*/
export const getCategories = () =>
	fetch(`${api}/categories`, { headers })
		.then(res => res.json()) // data: {categories: [{name:...,path:...},{...},...]}
		.then(data => data.categories)
/*
GET /:category/posts
USAGE:
Get all of the posts for a particular category
*/
export const getCategoryPosts = category =>
	fetch(`${api}/${category}/posts`, { headers })
		.then(res => res.json())

/*
GET /posts
USAGE:
Get all of the posts. Useful for the main page when no category is selected.
*/
export const getPosts = () =>
	fetch(`${api}/posts`, { headers })
		.then(res => res.json()) // data: [{id:..,timestamp:Date.now(),...}, {…},...]

/*
POST /posts
USAGE:
Add a new post

PARAMS:
id - UUID should be fine, but any unique id will work
timestamp - timestamp in whatever format you like, you can use Date.now() if you like
title - String
body - String
owner(author?) - String
category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
*/
export const createPost = ({id, timestamp, title, body, author, category}) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id, timestamp, category, title, body, author}) // will error if missing any properties
	}).then(res => res.json()) // {id: #, timestamp: 1502828038971, title: "", body: "", author: "", …}

/*
GET /posts/:id
USAGE:
Get the details of a single post
*/
export const getPost = id =>
	fetch(`${api}/posts/${id}`, { headers })
		.then(res => res.json()) // {id: "8xf0y6ziyjabvozdd253nd", timestamp: 1467166872634, title: "Udacity is the best place to learn React", body: "Everyone says so after all.", author: "thingtwo", …}

/*
POST /posts/:id
USAGE:
Used for voting on a post

PARAMS:
option - String: Either "upVote" or "downVote"
*/
export const votePost = (id, option) =>
	fetch(`${api}/posts/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({option})
	}).then(res => res.json()) // data: {id:...,timestamp:...,...}

/*
PUT /posts/:id
USAGE:
Edit the details of an existing post

PARAMS:
title - String
body - String
*/
export const editPost = (id, {title, body}) =>
	fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title, body})
	}).then(res => res.json()) // data: {id:...,timestamp:...,...}

/*
DELETE /posts/:id
USAGE:
Sets the deleted flag for a post to 'true'.
Sets the parentDeleted flag for all child comments to 'true'.
*/
export const deletePost = id =>
	fetch(`${api}/posts/${id}`, { method: 'DELETE', headers }) // res: Response


/*
GET /posts/:id/comments
USAGE:
Get all the comments for a single post
*/
export const getComments = id =>
	fetch(`${api}/posts/${id}/comments`, { headers })
		.then(res => res.json()) // data: [{id:..,timestamp:Date.now(),...}, {…},...]

/*
POST /comments
USAGE:
Add a comment to a post

PARAMS:
id: Any unique ID. As with posts, UUID is probably the best here.
timestamp: timestamp. Get this however you want.
body: String
owner: String
parentId: Should match a post id in the database.
*/
export const createComment = ({body, author, parentId}) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id: uuid(), timestamp: Date.now(), body, author, parentId}) // error if missing properties
	}).then(res => res.json()) // {id: "123456", timestamp: 1502824942815, body: "my comment body 2", author: "myself", parentId: "8xf0y6ziyjabvozdd253nd", …}

/*
GET /comments/:id
USAGE:
Get the details for a single comment
*/
export const getComment = id =>
	fetch(`${api}/comments/${id}`, { headers })
		.then(res => res.json()) // {id: "123456", timestamp: 1502824942815, body: "my comment body 2", author: "myself", parentId: "8xf0y6ziyjabvozdd253nd", …}

/*
POST /comments/:id
USAGE:
Used for voting on a comment.
*/
export const voteComment = (id, option) =>
	fetch(`${api}/comments/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({option})
	}).then(res => res.json()) // {id: #, timestamp: Date.now(), body: '', author: '', parentId: #, …}

/*
PUT /comments/:id
USAGE:
Edit the details of an existing comment

PARAMS:
timestamp: timestamp. Get this however you want.
body: String
*/
export const editComment = (id, {timestamp, body}) =>
	fetch(`${api}/comments/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({timestamp, body})
	}).then(res => res.json()) // {id: #, timestamp: Date.now(), body: "new body", author: '', parentId: #, …}

/*
DELETE /comments/:id
USAGE:
Sets a comment's deleted flag to 'true'
*/
export const deleteComment = id =>
	fetch(`${api}/comments/${id}`, { method: 'DELETE', headers }) // res: Response
