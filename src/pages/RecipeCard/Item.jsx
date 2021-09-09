import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ object }) => {
	return (
		<div className="recipe">
			<div
				className="recipe__bg"
				style={{
					backgroundImage: `url("${
						object?.images[0]?.base64 ? object?.images[0]?.base64 : ''
					}")`,
				}}
			>
				<div className="recipe__bg__overlay"></div>
			</div>

			{object.user && (
				<header>
					<div>
						<h2>
							<Link to={`/recipe/${object.userFriendlyId}`}>
								{object.title}
							</Link>
						</h2>
						<Link
							to={`/profiles/${object.user._id}`}
						>{`by ${object.user.username}`}</Link>
					</div>
					<div className="avatar">
						<img
							src={
								object.user.imageUrl
									? object.user.imageUrl
									: '/images/default-avatar.png'
							}
							alt={`Portrait of ${object.user.username}`}
						/>
					</div>
				</header>
			)}

			<div
				className="recipe__preview"
				style={{
					backgroundImage: `url(${
						object?.images[0]?.base64 ? object?.images[0]?.base64 : ''
					})`,
				}}
			></div>
		</div>
	)
}

export default Item
