import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions'

class App extends Component {
	componentDidMount() {
		this.props.getCategories()
	}
	render() {
		console.log(this.props)
		return (
			<div>
			</div>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories.categories
	}
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)