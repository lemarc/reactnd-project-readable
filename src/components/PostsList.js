import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

import { getPosts, getCategoryPosts, sortPosts } from '../actions'

import { Link } from 'react-router-dom'

import PostPreview from './PostPreview'
import CategoryNav from './CategoryNav'
import SortOptions from './SortOptions'


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
		const currentCategory = this.props.match.params.category
		if (!nextCategory && currentCategory) {
			this.props.getPosts()
		} else if ( nextCategory !== currentCategory) {
			this.props.getCategoryPosts(nextCategory)
		}
	}

	render() {
		const { posts, sort, sortPosts } = this.props
		return (
			<div>
				<CategoryNav currentCategory={this.props.match.params.category}/>
				<Link to='/submit'><button className='submit-post-button'>Submit new post</button></Link>
				<SortOptions sort={sort} sortItem={sortPosts}/>
				<div className='posts-list'>
					{posts.sort(sortBy((sort.order>0 ? sort.by :'-'+sort.by))).map( (post, i) => (
						<PostPreview key={i} post={post} />
					))}
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ posts }) {
	return {
		posts: Object.keys(posts.byId).map( id => posts.byId[id] ),
		sort: posts.sort
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: () => dispatch(getPosts()),
		getCategoryPosts: category => dispatch(getCategoryPosts(category)),
		sortPosts: sort => dispatch(sortPosts(sort))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)