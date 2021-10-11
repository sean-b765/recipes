import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from '../../components/Markdown'
import { placeImageInContent } from '../../util/util'

const Preview = ({ state }) => {
	console.log(state)
	return (
		<section className="fullrecipe">
			<header className="fullrecipe__header">
				<h1>{state?.formData?.title}</h1>
				<div className="fullrecipe__header__info">
					{state?.formData?.serves && (
						<span>
							<span>{state?.formData?.serves}</span> Serves
						</span>
					)}

					{state?.formData?.prepTime && (
						<span>
							<span>{state?.formData?.prepTime}min</span> Prep time
						</span>
					)}

					{state?.formData?.cookTime && (
						<span>
							<span>{state?.formData?.cookTime}min</span> Cook time
						</span>
					)}
				</div>
			</header>
			<ul className="fullrecipe__tags">
				{state?.formData?.tags?.map((tag, index) => (
					<li key={index}>
						<Link to="">#{tag}</Link>
					</li>
				))}
			</ul>
			<Markdown
				className="fullrecipe__info"
				content={placeImageInContent(state?.formData?.content, state?.files)}
			/>
			<Markdown
				className="fullrecipe__method"
				content={placeImageInContent(state?.formData?.method, state?.files)}
			/>
		</section>
	)
}

export default Preview
