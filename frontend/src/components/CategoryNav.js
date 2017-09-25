import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class CategoryNav extends Component {
	render() {
		const { currentCategory, categories } = this.props

		return (
			<nav className='category-nav'>
				<Link to='/' className={`category-link ${!currentCategory && 'selected'}`}>All</Link>
				{categories.map( (category,i) => (
					<Link to={`/${category.path}`} key={i} className={`category-link ${currentCategory === category.path && 'selected'}`}>
						{category.name}
					</Link>
				))}
			</nav>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories: categories.categories,
	}
}

export default connect(
  mapStateToProps
)(CategoryNav)