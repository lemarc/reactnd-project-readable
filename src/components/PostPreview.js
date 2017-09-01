import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCommentsCount, votePost } from '../actions'

import arrowUp from '../icons/arrow-up.svg'
import arrowDown  from '../icons/arrow-down.svg'

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
				
				<div className='vote-box'>
					<button className='vote-button' onClick={this.props.upVotePost}><img src={arrowUp} height='auto'/></button>
					<div className='vote-score'>{voteScore}</div>
					<button className='vote-button' onClick={this.props.downVotePost}><img src={arrowDown} height='auto'/></button>
				</div>
				<div>{this.props.count} comments</div>
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