import React from 'react'

const ListIngredients = ({ ingredients, onClickIngredient }) => {
	return (
		<div className={`list list--ingredients`}>
			{ingredients.map((item, index) => (
				<button
					className="list__item btn btn--no-bg"
					key={index}
					aria-label="Remove this item."
					onClick={() => onClickIngredient(item)}
				>
					{item}
				</button>
			))}
		</div>
	)
}

export default ListIngredients
