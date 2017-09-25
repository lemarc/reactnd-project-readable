import React, { Component } from 'react'
import { votePost, editPost, saveEditPost, deletePost } from '../actions'
import { connect } from 'react-redux'
import VoteBox from './VoteBox'

class Post extends Component {
	componentWillUnmount() {
		// Cancel editting when navigating away from post
		this.props.editPost({})
	}
	render() {
		const { title, author, voteScore, body, id } = this.props.post
		const { upVotePost, downVotePost, editPost, saveEditPost, post, editting, commentCount, deletePost } = this.props
		const isEditting = editting.id === id

		return (
			<div className='post'>
				<VoteBox upVote={upVotePost} downVote={downVotePost} voteScore={voteScore} />
				{isEditting ?
					<input className='post-title' value={editting.title} onChange={e=>editPost({...editting, title: e.target.value})}/>
					:
					<div className='post-title'>{title}</div>
				}
				<div className='post-author'>{author}</div>
				{isEditting ?
					<textarea className='post-body' value={editting.body} onChange={e=>editPost({...editting, body: e.target.value})}/>
					:
					<div className='post-body'>{body}</div>
				}
				<div className='post-comment-count'>{commentCount} comments</div>
				{isEditting ?
					<div>
						<button onClick={()=>saveEditPost(editting)}>save</button>
						<button onClick={()=>editPost({})}>cancel</button>
					</div>
					:
					<div>
						<button onClick={()=>editPost(post)}>edit</button>
						<button onClick={deletePost}>delete</button>
					</div>
				}
			</div>
		)
	}
}

function mapStateToProps ({posts}) {
	return {
		editting: posts.editting
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.post.id
	return {
		upVotePost: () => dispatch(votePost(id, 'upVote')),
		downVotePost: () => dispatch(votePost(id, 'downVote')),
		editPost: post => dispatch(editPost(post)),
		saveEditPost: post => dispatch(saveEditPost(id, post)),
		deletePost: () => dispatch(deletePost(ownProps.post))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)