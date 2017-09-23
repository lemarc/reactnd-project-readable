import React, { Component } from 'react'

import { updateNewComment, submitComment } from '../actions'

import { connect } from 'react-redux'

class NewComment extends Component {

	componentWillUnmount() {
		//Clear out the new comment form when navigating from post detail
		this.props.clearNewComment()
	}
	render() {
		const { newComment, updateNewComment, parentId, submitComment, clearNewComment } = this.props
		return (
			<div className='submit-comment'>
				<div className='submit-comment-author'>
					<div>submit new comment:</div>
					<input type='text' placeholder='author' value={newComment.author} onChange={e=>updateNewComment({...newComment, author: e.target.value})}/>
				</div>
				<textarea className='submit-comment-body' value={newComment.body} onChange={e=>updateNewComment({...newComment, body: e.target.value})}></textarea>
				<div>
					<button onClick={()=>{
						submitComment( {...newComment, parentId } )
						clearNewComment()
					}}>Submit</button>
					<button onClick={clearNewComment}>Cancel</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ comments }, ownProps) {
	return {
		newComment: comments.new
	}
}

function mapDispatchToProps (dispatch) {
	return {
		submitComment: comment => dispatch(submitComment(comment)),
		updateNewComment: comment => dispatch(updateNewComment(comment)),
		clearNewComment: () => dispatch(updateNewComment({author:'',body:''}))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)