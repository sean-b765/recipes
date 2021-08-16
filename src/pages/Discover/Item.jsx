import React from 'react'
import { CgBowl } from 'react-icons/cg'
import { BiTimer } from 'react-icons/bi'

const Item = ({ object }) => {
	return (
		<div className="recipe">
			<div
				className="recipe__bg"
				style={{
					backgroundImage: `url("${object.image_url}")`,
				}}
			>
				<div className="recipe__bg__overlay">
					<div className="recipe__content">
						<p className="recipe__content__prep">
							{object.prep_time} <BiTimer />
						</p>
						<p className="recipe__content__serves">
							{object.serves} <CgBowl />
						</p>
					</div>
				</div>
			</div>
			<header>
				<div className="avatar">
					<img
						src={object.author.avatar}
						alt={`Portrait of ${object.author.avatar}`}
					/>
				</div>
				<div>
					<h2>{object.title}</h2>
					<p>by {object.author.name}</p>
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
