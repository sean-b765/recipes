import React from 'react'
import { Link } from 'react-router-dom'
import { CgBowl } from 'react-icons/cg'
import { BsHeartFill } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { formatLargeNumber } from '../../util/util'

const Item = ({ object: recipe, delay, isOnProfile = false }) => {
	return (
		<div
			className="recipe"
			data-aos="zoom-in"
			data-aos-delay={delay * 100}
			data-aos-once="true"
			data-aos-anchor-placement="bottom"
		>
			<div
				className={
					recipe?.images[0]?.base64
						? 'recipe__bg'
						: 'recipe__bg recipe__bg--nobg'
				}
				style={{
					backgroundImage: `url("${
						recipe?.images[0]?.base64
							? recipe?.images[0]?.base64
							: './images/default-recipe.png'
					}")`,
				}}
			>
				<div className="recipe__bg__overlay">
					<div>
						<p>
							<CgBowl />
							{recipe?.serves}
						</p>
						<p>
							<BiTimeFive />
							{`${recipe?.cookTime}m`}
						</p>
						<p>
							<GiForkKnifeSpoon />
							{`${recipe?.prepTime}m`}
						</p>
					</div>
				</div>
			</div>

			{recipe.user && (
				<header>
					<div>
						<h2>
							<Link to={`/recipe/${recipe.userFriendlyId}`}>
								{recipe.title}
							</Link>
						</h2>
						<p>
							<BsHeartFill /> {formatLargeNumber(recipe?.likes?.length)}
						</p>
					</div>
					{!isOnProfile && (
						<div className="avatar">
							<Link to={`profiles/${recipe?.user?._id}`}>
								<img
									src={
										recipe.user.imageUrl
											? recipe.user.imageUrl
											: '/images/default-avatar.png'
									}
									alt={`${recipe.user.username}'s avatar'`}
								/>
							</Link>
						</div>
					)}
				</header>
			)}

			<div
				className={
					recipe?.images[0]?.base64
						? 'recipe__preview'
						: 'recipe__preview recipe__preview--nobg'
				}
				style={{
					backgroundImage: `url(${
						recipe?.images[0]?.base64
							? recipe?.images[0]?.base64
							: './images/default-recipe.png'
					})`,
				}}
			></div>
		</div>
	)
}

export default Item
