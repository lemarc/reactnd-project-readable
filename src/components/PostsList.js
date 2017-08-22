import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPosts, getCategoryPosts } from '../actions'

class PostsList extends Component {

	componentDidMount() {
		const category = this.props.match.params.category
		if (category) {
			this.props.getCategoryPosts(category)
		} else {
			this.props.getPosts()
		}
	}

	render() {
		console.log(this.props)
		const currentCategory = this.props.match.params.category
		const { categories } = this.props 
		return (
			<div>
				<div>
					<Link to='/' style={{padding: '20px', background: !currentCategory ? '#888888' : 'none'}}>All</Link>
					{categories.map( (category,i) => (
						<Link to={`/${category.path}`} key={i} style={{padding: '20px', background: currentCategory === category.path ? '#888888' : 'none'}}>
							{category.name}
						</Link>))}
				</div>
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