import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'array-sort-by'

import { getPosts, getCategoryPosts, sortPosts } from '../actions'

import PostPreview from './PostPreview'
import CategoryNav from './CategoryNav'

import sortDesc from '../icons/sort-desc.svg'
import sortAsc from '../icons/sort-asc.svg'

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
		const { posts, sort, sortPosts } = this.props

		return (
			<div>
				<CategoryNav currentCategory={this.props.match.params.category}/>

				<div className='sort-options'>
					Sort by:
					<button onClick={()=>{ 
						sortPosts( sort.by==='timestamp' ? {by: sort.by, order: -sort.order} : {by: 'timestamp', order: -1} )
					}}>
						Date
						{ sort.by==='timestamp' && (sort.order === 1 ? <img src={sortAsc} alt='ascending'/> : <img src={sortDesc} alt='descending'/>) }
					</button>
					<button onClick={()=>{ 
						sortPosts( sort.by==='voteScore' ? {by: sort.by, order: -sort.order} : {by: 'voteScore', order: -1} )
					}}>
						Score
						{ sort.by==='voteScore' && (sort.order === 1 ? <img src={sortAsc} alt='ascending'/> : <img src={sortDesc} alt='descending'/>) }
					</button>
				</div>

				<div className='posts-list'>
					{sortBy(posts, post=> sort.order * post[sort.by] ).map( (post, i) => (
						<PostPreview key={i} post={post} />
					))}
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ posts }) {
	return {
		posts: posts.posts,
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