import React, { Component } from 'react'
import sortBy from 'array-sort-by'
import { getPost, getComments, votePost, sortComments } from '../actions'

import { connect } from 'react-redux'

import CategoryNav from './CategoryNav'
import Comment from './Comment'

import SortOptions from './SortOptions'
import VoteBox from './VoteBox'

class PostDetail extends Component {
	componentDidMount() {
		const id = this.props.match.params.id
		this.props.getPost(id)
		this.props.getComments(id)
	}
	render() {
		//console.log(this.props)

		const { title, author, voteScore, body } = this.props.post

		const { comments, sort, sortComments, upVotePost, downVotePost } = this.props

		return (
			<div>
				<CategoryNav currentCategory={this.props.match.params.category}/>

				<div className='post'>
					<VoteBox upVote={upVotePost} downVote={downVotePost} voteScore={voteScore} />
					<div className='post-title'>{title}</div>
					<div className='post-author'>{author}</div>
					<div className='post-body'>{body}</div>
					<div className='post-comment-count'>{comments.length} comments</div>
				</div>
				<h3>Comments</h3>
				<SortOptions sort={sort} sortItem={sortComments}/>
				<div className='comments-list'>
					{sortBy(comments, comment => sort.order * comment[sort.by] ).map( (comment,i) => <Comment key={i} comment={comment}/> )}
				</div>
			</div>
		)
	}
}

function mapStateToProps ({posts, comments }) {
	return {
		post: posts.post,
		comments: comments.comments,
		sort:comments.sort
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.match.params.id
	return {
		getPost: () => dispatch(getPost(id)),
		getComments: () => dispatch(getComments(id)),
		upVotePost: () => dispatch(votePost(id, 'upVote')),
		downVotePost: () => dispatch(votePost(id, 'downVote')),
		sortComments: sort => dispatch(sortComments(sort))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)