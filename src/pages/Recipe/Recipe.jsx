import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Markdown from '../../components/Markdown'
import Spinner from '../../components/Spinner'
import { getPostByFriendlyId } from '../../_actions/post'
import DOMPurify from 'dompurify'
import { placeImageInContent } from '../../util/util'
import { Link } from 'react-router-dom'

const Recipe = ({ id }) => {
	const dispatch = useDispatch()

	const post = useSelector((state) => state.post.single)

	useEffect(() => {
		getPostByFriendlyId(id)
			.then((response) => {
				dispatch({ type: 'POST/SET_POST', payload: response?.result[0] })
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<motion.section className="fullrecipe">
			{post ? (
				<>
					<header className="fullrecipe__header">
						<h1>{post.title}</h1>
						<div className="fullrecipe__header__info">
							{post.serves && (
								<span>
									<span>{post.serves}</span> Serves
								</span>
							)}

							{post.prepTime && (
								<span>
									<span>{post.prepTime}min</span> Prep time
								</span>
							)}

							{post.cookTime && (
								<span>
									<span>{post.cookTime}min</span> Cook time
								</span>
							)}
						</div>
					</header>
					<ul className="fullrecipe__tags">
						{post.tags.map((tag, index) => (
							<li key={index}>
								<Link to="">#{tag}</Link>
							</li>
						))}
					</ul>
					<Markdown
						className="fullrecipe__info"
						content={placeImageInContent(post.content, post.images)}
					/>
					<Markdown
						className="fullrecipe__method"
						content={placeImageInContent(post.method, post.images)}
					/>
				</>
			) : (
				<Spinner />
			)}
		</motion.section>
	)
}

export default Recipe
