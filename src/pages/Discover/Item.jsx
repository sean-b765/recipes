import React from 'react'

const Item = ({ object }) => {
	return (
		<div className="recipe">
			<div
				className="recipe__bg"
				style={{
					backgroundImage: `url("${object.image_url}")`,
				}}
			>
				<div className="recipe__bg__overlay"></div>
			</div>

			<header>
				<div>
					<h2>{object.title}</h2>
					<p>{`by ${object.author.name}`}</p>
				</div>
				<div className="avatar">
					<img
						src={object.author.avatar}
						alt={`Portrait of ${object.author.name}`}
					/>
				</div>
			</header>

			<div
				className="recipe__preview"
				style={{ backgroundImage: `url(${object.image_url})` }}
			></div>
		</div>
	)
}

export default Item
