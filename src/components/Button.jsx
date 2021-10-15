import React from 'react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

const Button = ({ onClick, type }) => {
	if (!['delete', 'edit', 'like', 'liked', 'report'].includes(type))
		throw new Error(`Invalid type "${type}" in Button.jsx`)

	let cName = 'btn btn--round '
	let ariaLabel = ''

	if (type === 'delete') {
		cName += 'btn--red'
		ariaLabel = 'Delete post'
	} else if (type === 'edit') {
		cName += 'btn--blue'
		ariaLabel = 'Edit post'
	} else if (type === 'like' || type === 'liked') {
		if (type === 'liked') {
			cName += 'btn--green btn--heart btn--heart-liked'
			ariaLabel = 'Unlike post'
		} else {
			cName += 'btn--green btn--heart'
			ariaLabel = 'Like post'
		}
	} else if (type === 'report') {
		cName += 'btn--report btn--red'
		ariaLabel = 'Report post'
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
			{type === 'liked' && <BsHeartFill />}
			{type === 'like' && <BsHeart />}
			{type === 'report' && <></>}
		</button>
	)
}

export default Button
