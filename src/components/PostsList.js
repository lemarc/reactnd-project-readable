import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPosts, getCategoryPosts } from '../actions'

import PostPreview from './PostPreview'

class PostsList extends Component {

	componentDidMount() {
		const category = this.props.match.params.category
		if (category) {
			this.props.getCategoryPosts(category)
		} else {
			this.props.getPosts()
		}
	}
	
	// Need to send post request on category change
	componentWillReceiveProps(nextProps) {
		const nextCategory = nextProps.match.params.category
		if ( nextCategory !== this.props.match.params.category) {
			this.props.getCategoryPosts(nextCategory)
		}
	}

	render() {
		const currentCategory = this.props.match.params.category
		const { categories, posts } = this.props 
		return (
			<div className='posts-list'>
				<div className='category-list'>
					<Link to='/' className={`category-link ${!currentCategory && 'selected'}`}>All</Link>
					{categories.map( (category,i) => (
						<Link to={`/${category.path}`} key={i} className={`category-link ${currentCategory === category.path && 'selected'}`}>
							{category.name}
						</Link>
					))}
					
				</div>
				{posts.map( (post, i) => (
					<PostPreview key={i} post={post} />
				))}
			</div>
		)
	}
}

function mapStateToProps ({ categories, posts }) {
	return {
		categories: categories.categories,
		posts: posts.posts
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: () => dispatch(getPosts()),
		getCategoryPosts: category => dispatch(getCategoryPosts(category))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)