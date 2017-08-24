import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCommentsCount, votePost } from '../actions'

//Listed posts are displayed with title, author, number of comments, current score, and a voting mechanism to upvote or downvote the post.
//Posts should have buttons or links for editing or deleting that post.
class PostPreview extends Component {
	componentDidMount() {
		this.props.getCommentsCount()
	}

	render() {
		console.log(this.props)
		const { title, author, voteScore, category, id } = this.props.post
		return (
			<div>
				<div><Link to={`/${category}/${id}`}>{title}</Link></div>
				<div>{author}</div>
				<div>
					<button onClick={this.props.upVotePost}>upvote</button>
					<button onClick={this.props.downVotePost}>downvote</button>
					{voteScore}
				</div>

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