/*
  Logger element to show any error messages which the client needs to see
*/
import React from 'react'

const TopMostLogger = ({ title, message, show }) => {
	return (
		<div className={show ? 'logger logger--showing' : 'logger'}>
			<header className="logger__title">{title}</header>
			<summary className="logger__message">{message}</summary>
		</div>
	)
}

export default TopMostLogger
