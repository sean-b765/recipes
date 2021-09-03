import React from 'react'

const ListTags = ({ tags, onClickTag }) => {
	return (
		<div className={`list list--tags`}>
			{tags.map((item, index) => (
				<button
					className="list__item btn btn--no-bg"
					key={index}
					aria-label="Remove this item."
					onClick={() => onClickTag(item)}
				>
					{item}
				</button>
			))}
		</div>
	)
}

export default ListTags
