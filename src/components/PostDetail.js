import React, { Component } from 'react'
import { getPost, getComments, votePost } from '../actions'

import { connect } from 'react-redux'

import CategoryNav from './CategoryNav'
import Comment from './Comment'

import arrowUp from '../icons/arrow-up.svg'
import arrowDown  from '../icons/arrow-down.svg'

class PostDetail extends Component {
	componentDidMount() {
		const id = this.props.match.params.id
		this.props.getPost(id)
		this.props.getComments(id)
	}
	render() {
		//console.log(this.props)

		const { title, author, voteScore, body } = this.props.post

		const { comments } = this.props

		return (
			<div>
				<CategoryNav currentCategory={this.props.match.params.category}/>

				<div className='post'>
					<div className='vote-box'>
						<button className='vote-button' onClick={this.props.upVotePost}><img src={arrowUp} alt='upvote'/></button>
						<div className='vote-score'>{voteScore}</div>
						<button className='vote-button' onClick={this.props.downVotePost}><img src={arrowDown} alt='downvote'/></button>
					</div>
					<div className='post-title'>{title}</div>
					<div className='post-author'>{author}</div>
					<div className='post-body'>{body}</div>
					<div className='post-comment-count'>{comments.length} comments</div>
				</div>
				<h3>Comments</h3>
				<div className='comments-list'>
					{comments.map( (comment,i) => <Comment key={i} comment={comment}/> )}
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
		downVotePost: () => dispatch(votePost(id, 'downVote'))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)