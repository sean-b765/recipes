import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner'
import { getPostByFriendlyId } from '../../_actions/post'

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

	const imagePattern = /(![\[][\w\d-_]{0,})[\]]/g

	/**
	 * Aim of this method is to split body into array via newline character or ![
	 * @param {string} body
	 */
	const getArray = (body) => body.split('\n')

	/**
	 *
	 * @param {string} content
	 */
	const getElement = (content) => {
		if (imagePattern.test(content)) {
			// there is a image
		} else {
			// plain text
		}
	}

	return (
		<motion.section className="fullrecipe">
			{post ? (
				<div>
					<header>{post.title}</header>
					<p>{post.content}</p>
					<article>
						{getArray(post.method).map((paragraph) => (
							<p>{paragraph}</p>
						))}
					</article>
				</div>
			) : (
				<Spinner />
			)}
		</motion.section>
	)
}

export default Recipe
