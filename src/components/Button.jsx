import React from 'react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

const Button = ({ onClick, type }) => {
	if (!['delete', 'edit'].includes(type))
		throw new Error(`Invalid type "${type}" in Button.jsx`)

	let cName = 'btn btn--pill '
	let ariaLabel = ''

	if (type === 'delete') {
		cName += 'btn--red'
		ariaLabel = 'Delete post'
	} else if (type === 'edit') {
		cName += 'btn--blue'
		ariaLabel = 'Edit post'
	}

	return (
		<button
			onClick={onClick}
			className={cName}
			aria-label={ariaLabel}
			alt={ariaLabel}
		>
			{type === 'delete' && <MdDeleteForever />}
			{type === 'edit' && <MdEdit />}
		</button>
	)
}

export default Button
