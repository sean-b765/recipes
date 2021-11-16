import React from 'react'

const ConfirmationModal = ({ buttons, title, message, showing }) => {
	return showing ? (
		<div className="confirmationModal">
			<header>
				<h1>{title}</h1>
			</header>
			<section>{message}</section>
			<footer>{buttons}</footer>
		</div>
	) : (
		<></>
	)
}

export default ConfirmationModal
