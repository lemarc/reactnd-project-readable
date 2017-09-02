import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions'

import { Route, withRouter } from 'react-router-dom'

import PostsList from './PostsList'
import PostDetail from './PostDetail'

class App extends Component {
	componentDidMount() {
		this.props.getCategories()
	}
	render() {
		return (
			<div className='app'>
				<Route exact path='/' component={PostsList} />
				<Route exact path='/:category' component={PostsList} />
				<Route exact path='/:category/:id' component={PostDetail}/>
			</div>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories.categories,
	}
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))