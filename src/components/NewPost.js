import React, { Component } from 'react'

import { updateNewPost, submitPost } from '../actions'

import { connect } from 'react-redux'

import CategoryNav from './CategoryNav'

import uuid from '../utils/uuid'

class NewPost extends Component {
	render() {
		const { newPost, updateNewPost, categories, submitPost, clearNewPost, history } = this.props
		const { author, title, body, category } = newPost
		console.log(!category)
		return (
			<div className='new-post'>
				<CategoryNav currentCategory={category}/>
				<div>
					<h4>Category</h4>
					<select value={category} onChange={e=>updateNewPost({...newPost, category: e.target.value})}>
						<option value='' disabled>select category</option>
						{categories.map( category =>
							<option key={category.path} value={category.path}>
								{category.name}
							</option>
						)}
					</select>
				</div>
				<div>
					<h4>Author</h4>
					<input type='text' placeholder='author' value={author} onChange={e=>updateNewPost({...newPost, author: e.target.value})}/>
				</div>
				<div>
					<h4>Title</h4>
					<input type='text' placeholder='title' value={title} onChange={e=>updateNewPost({...newPost, title: e.target.value})}/>
				</div>
				<div>
					<h4>Body</h4>
					<textarea className='' value={body} onChange={e=>updateNewPost({...newPost, body: e.target.value})}/>
				</div>
				<button onClick={e=>{
					if (category) {
						const id = uuid()
						submitPost(newPost, id)
						clearNewPost()
						history.push(`/${newPost.category}/${id}`)
					} else {
						alert('Must select a category.')
					}
				}}>Submit</button>
			</div>
		)
	}
}

function mapStateToProps ({posts, categories}, ownProps) {
	return {
		newPost: posts.new,
		categories: categories.categories
	}
}

function mapDispatchToProps (dispatch) {
	return {
		submitPost: (post, id) => dispatch(submitPost(post, id)),
		updateNewPost: post => dispatch(updateNewPost(post)),
		clearNewPost: () => dispatch(updateNewPost({title:'',author:'',body:'',category:''}))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)