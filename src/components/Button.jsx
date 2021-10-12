import React from 'react'

const Button = ({ onClick, type }) => {
	if (!['delete', 'edit'].includes(type))
		throw new Error(`Invalid type "${type}" in Button.jsx`)

	let cName = 'btn btn--pill '

	if (type === 'delete') cName += 'btn--red'
	else if (type === 'edit') cName += 'btn--blue'

	return (
		<button onClick={onClick} className={cName}>
			{type === 'delete' && 'Delete Post'}
			{type === 'edit' && 'Edit Post'}
		</button>
	)
}

export default Button
