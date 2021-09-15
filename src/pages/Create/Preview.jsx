import React from 'react'
import { Link } from 'react-router-dom'

const Preview = ({ state }) => {
	return (
		<section className="create__preview">
			<header>
				<h2>{state?.formData?.title}</h2>
				<ul>
					{state?.formData.tags.map((tag, index) => (
						<li key={index}>
							<Link to="">{tag}</Link>
						</li>
					))}
				</ul>
			</header>

			<p className="create__preview__info">{state?.formData?.content}</p>

			<ul className="create__preview__ingredients">
				{state?.formData?.ingredients.map((ingredient, index) => (
					<li key={index}>
						<Link to="">{ingredient}</Link>
					</li>
				))}
			</ul>

			<footer>
				{state?.formData?.serves && (
					<span>
						<span>{state?.formData?.serves}</span> Serves
					</span>
				)}

				{state?.formData?.prepTime && (
					<span>
						<span>{state?.formData?.prepTime}m</span> Prep time
					</span>
				)}

				{state?.formData?.cookTime && (
					<span>
						<span>{state?.formData?.cookTime}m</span> Cook time
					</span>
				)}
			</footer>
		</section>
	)
}

export default Preview
