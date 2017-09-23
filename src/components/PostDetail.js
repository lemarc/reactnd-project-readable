import React, { Component } from 'react'
import sortBy from 'sort-by'
import { getPost, getComments, sortComments } from '../actions'

import { connect } from 'react-redux'

import CategoryNav from './CategoryNav'
import Post from './Post'
import Comment from './Comment'

import SortOptions from './SortOptions'
import NewComment from './NewComment'


class PostDetail extends Component {
	componentDidMount() {
		const id = this.props.match.params.id
		this.props.getPost(id)
		this.props.getComments(id)
	}
	render() {
		const { comments, sort, sortComments, post } = this.props
		return (
			<div>
				<CategoryNav currentCategory={this.props.match.params.category}/>
				{post ? 
					<div>
						<Post post={post} commentCount={comments.length}/>
						<h3>Comments</h3>
						<SortOptions sort={sort} sortItem={sortComments}/>
						<NewComment parentId={post.id}/>
						<div className='comments-list'>
							{comments.sort(sortBy((sort.order>0 ? sort.by :'-'+sort.by))).map( (comment,i) => <Comment key={i} comment={comment}/> )}
						</div>
					</div>
					:
					<div>Post not found.</div>
				}
			</div>
		)
	}
}

function mapStateToProps ({posts, comments }, ownProps) {
	const id = ownProps.match.params.id
	return {
		post: posts.byId[id],
		comments: comments.byParentId[id] ? Object.keys(comments.byParentId[id]).map( commentId => comments.byParentId[id][commentId] ) : [],
		sort:comments.sort
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.match.params.id
	return {
		getPost: () => dispatch(getPost(id)),
		getComments: () => dispatch(getComments(id)),
		sortComments: sort => dispatch(sortComments(sort))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)