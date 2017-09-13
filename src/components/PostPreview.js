import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCommentsCount, votePost } from '../actions'

import VoteBox from './VoteBox'

//Listed posts are displayed with title, author, number of comments, current score, and a voting mechanism to upvote or downvote the post.
//Posts should have buttons or links for editing or deleting that post.
class PostPreview extends Component {
	componentDidMount() {
		this.props.getCommentsCount()
	}

	render() {
		const { title, author, voteScore, category, id } = this.props.post
		const { upVotePost, downVotePost } = this.props
		return (
			<div className='post'>
				<VoteBox upVote={upVotePost} downVote={downVotePost} voteScore={voteScore} />
				<div className='post-title'><Link to={`/${category}/${id}`}>{title}</Link></div>
				<div className='post-author'>{author}</div>
				
				<div className='post-comment-count'><Link to={`/${category}/${id}`}>{this.props.count} comments</Link></div>
			</div>
		)
	}
}

function mapStateToProps ({ comments }, ownProps) {
	return {
		count: comments.count[ownProps.post.id] || 0
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const { id } = ownProps.post
	return {
		getCommentsCount: () => dispatch(getCommentsCount(id)),
		upVotePost: () => dispatch(votePost(id, 'upVote')),
		downVotePost: () => dispatch(votePost(id, 'downVote'))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreview)