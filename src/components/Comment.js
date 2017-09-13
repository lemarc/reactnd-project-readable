import React, { Component } from 'react'

import { voteComment } from '../actions'

import { connect } from 'react-redux'

import VoteBox from './VoteBox'

class Comment extends Component {
	
	render() {
		const { author, body, voteScore } = this.props.comment
		const { upVoteComment, downVoteComment } = this.props
		return (
			<div className='comment'>
				<VoteBox upVote={upVoteComment} downVote={downVoteComment} voteScore={voteScore} />
				<div className='comment-author'>{author}</div>
				<div className='comment-body'>{body}</div>
			</div>
		)
	}
}

function mapStateToProps ({ comments }) {
	return {

	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.comment.id
	return {
		upVoteComment: () => dispatch(voteComment(id, 'upVote')),
		downVoteComment: () => dispatch(voteComment(id, 'downVote'))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)