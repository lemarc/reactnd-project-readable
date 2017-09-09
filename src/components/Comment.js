import React, { Component } from 'react'

import { voteComment } from '../actions'

import { connect } from 'react-redux'

import arrowUp from '../icons/arrow-up.svg'
import arrowDown  from '../icons/arrow-down.svg'

class Comment extends Component {
	
	render() {
		const { author, body, voteScore } = this.props.comment
		return (
			<div className='comment'>
				<div className='vote-box'>
					<button className='vote-button' onClick={this.props.upVoteComment}><img src={arrowUp} alt='upvote'/></button>
					<div className='vote-score'>{voteScore}</div>
					<button className='vote-button' onClick={this.props.downVoteComment}><img src={arrowDown} alt='downvote'/></button>
				</div>
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