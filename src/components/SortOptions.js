import React, { Component } from 'react'

import sortDesc from '../icons/sort-desc.svg'
import sortAsc from '../icons/sort-asc.svg'

export default class SortOptions extends Component {
	render() {
		const { sort, sortItem } = this.props
		return (
			<div className='sort-options'>
				Sort by:
				<button onClick={()=>{
					sortItem( sort.by==='timestamp' ? {by: sort.by, order: -sort.order} : {by: 'timestamp', order: -1} )
				}}>
					Date
					{ sort.by==='timestamp' && (sort.order === 1 ? <img src={sortAsc} alt='ascending'/> : <img src={sortDesc} alt='descending'/>) }
				</button>
				<button onClick={()=>{ 
					sortItem( sort.by==='voteScore' ? {by: sort.by, order: -sort.order} : {by: 'voteScore', order: -1} )
				}}>
					Score
					{ sort.by==='voteScore' && (sort.order === 1 ? <img src={sortAsc} alt='ascending'/> : <img src={sortDesc} alt='descending'/>) }
				</button>
			</div>
		)
	}
}
/*
function mapStateToProps ({ posts }) {
	return {
		posts: posts.posts,
		sort: posts.sort
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: () => dispatch(getPosts()),
		getCategoryPosts: category => dispatch(getCategoryPosts(category)),
		sortPosts: sort => dispatch(sortPosts(sort))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortOptions)
*/