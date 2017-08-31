import React, { Component } from 'react'
import { getPost, getComments } from '../actions'

class PostDetail extends Component {
	render() {
		return (
			<div>
				
			</div>
		)
	}
}

function mapStateToProps ({posts, messages }) {
	return {
		post: posts.post,
		messages: messages.messages,
		sort: messages.sort
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	const id = ownProps.match.params.id
	return {
		getPost: () => dispatch(getPost(id))
		getComments: () => dispatch(getComments(id))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)