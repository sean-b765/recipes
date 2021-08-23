import React from 'react'

const Modal = ({ message, title }) => {
	return (
		<div className="modal">
			<header className="modal__header">
				<h1>{title}</h1>
			</header>
			<p className="modal__body">{message}</p>
			<footer className="modal__footer">
				<button className="btn btn--pill">Close</button>
			</footer>
		</div>
	)
}

export default Modal
