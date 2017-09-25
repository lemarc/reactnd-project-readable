import React from 'react'
import arrowUp from '../icons/arrow-up.svg'
import arrowDown  from '../icons/arrow-down.svg'

export default ({upVote, downVote, voteScore}) => (
	<div className='vote-box'>
		<button className='vote-button' onClick={upVote}><img src={arrowUp} alt='^'/></button>
		<div className='vote-score'>{voteScore}</div>
		<button className='vote-button' onClick={downVote}><img src={arrowDown} alt='v'/></button>
	</div>
)

