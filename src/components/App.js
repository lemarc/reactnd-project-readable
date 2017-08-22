import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions'

import { Route, withRouter } from 'react-router-dom'

import PostsList from './PostsList'

class App extends Component {
	componentDidMount() {
		this.props.getCategories()
	}
	render() {
		return (
			<div>
				<Route exact path='/' component={PostsList} />
				<Route exact path='/:category' component={PostsList} />
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