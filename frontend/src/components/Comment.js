import React, { Component } from 'react'

import { voteComment, deleteComment, editComment, saveEditComment } from '../actions'

import { connect } from 'react-redux'

import VoteBox from './VoteBox'

class Comment extends Component {
	
	render() {
		const { author, body, voteScore } = this.props.comment
		const { upVoteComment, downVoteComment, deleteComment, editComment, comment, editting, saveEditComment } = this.props
		const isEditting = editting.id === comment.id
		return (
			<div className='comment'>
				<VoteBox upVote={upVoteComment} downVote={downVoteComment} voteScore={voteScore} />
				<div className='comment-author'>{author}</div>
				{isEditting ?
					<textarea className='comment-body' onChange={e=>editComment({...editting, body: e.target.value})} value={editting.body}/>
					:
					<div className='comment-body'>{body}</div>
				}
				{isEditting ?
					<div>
						<button onClick={()=>saveEditComment(editting)}>save</button>
						<button onClick={()=>editComment({})}>cancel</button>
					</div>
					:
					<div>
						<button onClick={()=>editComment(comment)}>edit</button>
						<button onClick={deleteComment}>delete</button>
					</div>
				}

			</div>
		)
	}
}

function mapStateToProps ({ comments }) {
	return {
		editting: comments.editting
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.comment.id
	return {
		upVoteComment: () => dispatch(voteComment(id, 'upVote')),
		downVoteComment: () => dispatch(voteComment(id, 'downVote')),
		deleteComment: () => dispatch(deleteComment(ownProps.comment)),
		editComment: comment => dispatch(editComment(comment)),
		saveEditComment: comment => dispatch(saveEditComment(id, comment))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)