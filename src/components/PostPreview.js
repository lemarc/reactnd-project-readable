import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getComments, votePost, editPost, deletePost } from '../actions'

import VoteBox from './VoteBox'

class PostPreview extends Component {
	componentDidMount() {
		this.props.getComments()
	}

	render() {
		const { title, author, voteScore, category, id } = this.props.post
		const { upVotePost, downVotePost, editPost, deletePost, history } = this.props
		return (
			<div className='post'>
				<VoteBox upVote={upVotePost} downVote={downVotePost} voteScore={voteScore} />
				<div className='post-title'><Link to={`/${category}/${id}`}>{title}</Link></div>
				<div className='post-author'>{author}</div>
				
				<div className='post-comment-count'><Link to={`/${category}/${id}`}>{this.props.count} comments</Link></div>
				<div>
					<Link to={`/${category}/${id}`}><button onClick={editPost}>edit</button></Link>
					<button onClick={deletePost}>delete</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ comments }, ownProps) {
	return {
		count: Object.keys(comments.byParentId[ownProps.post.id] || {}).length
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const post = ownProps.post
	const { id } = post
	return {
		getComments: () => dispatch(getComments(id)),
		upVotePost: () => dispatch(votePost(id, 'upVote')),
		downVotePost: () => dispatch(votePost(id, 'downVote')),
		editPost: () => dispatch(editPost(post)),
		deletePost: () => dispatch(deletePost(post))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreview)