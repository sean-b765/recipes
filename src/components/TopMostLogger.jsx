/*
  Logger element to show any error messages which the client needs to see
*/
import React from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { HiLightBulb } from 'react-icons/hi'

const TopMostLogger = ({ title, message, show }) => {
	const className = show
		? (title.toLowerCase() === 'alert' &&
				'logger logger--showing logger--alert') ||
		  (title.toLowerCase() === 'error' &&
				'logger logger--showing logger--error')
		: 'logger'

	return (
		<div className={className}>
			<header aria-label={title} className="logger__title">
				{title.toLowerCase() === 'alert' && <HiLightBulb />}
				{title.toLowerCase() === 'error' && <IoAlertCircleOutline />}
				{title}
			</header>
			<summary className="logger__message">{message}</summary>
		</div>
	)
}

export default TopMostLogger
