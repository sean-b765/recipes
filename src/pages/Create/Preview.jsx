import React from 'react'
import { Link } from 'react-router-dom'

const Preview = ({ formData, files }) => {
	return (
		<section className="create__preview">
			<header>
				<h2>{formData?.title}</h2>
				<ul>
					{formData.tags.map((tag, index) => (
						<li key={index}>
							<Link to="">{tag}</Link>
						</li>
					))}
				</ul>
			</header>

			<p className="create__preview__info">{formData?.content}</p>

			<ul className="create__preview__ingredients">
				{formData?.ingredients.map((ingredient, index) => (
					<li key={index}>
						<Link to="">{ingredient}</Link>
					</li>
				))}
			</ul>

			<footer>{formData?.serves}</footer>
		</section>
	)
}

export default Preview
