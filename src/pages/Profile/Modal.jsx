import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Modal = ({ modal, closeModal }) => {
	return (
		<div className={modal.showing ? 'modal modal--active' : 'modal'}>
			<header className="modal__header">
				<h1>{modal.title}</h1>
				<IoMdClose onClick={() => closeModal()} />
			</header>
			<div className="modal__body">
				{modal.children &&
					modal.children.map((child, idx) => (
						<div className="modal__body__user" key={idx}>
							<img
								src={
									child.imageUrl ? child.imageUrl : '/images/default-avatar.png'
								}
								alt={`Picture of ${child.username}`}
							/>
							<Link to={`/profiles/${child._id}`}>{child.username}</Link>
						</div>
					))}
			</div>
		</div>
	)
}

export default Modal
