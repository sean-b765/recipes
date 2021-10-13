import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from '../../components/Markdown'
import Spinner from '../../components/Spinner'
import { deletePost, getPostByFriendlyId, likePost } from '../../_actions/post'
import DOMPurify from 'dompurify'
import { placeImageInContent } from '../../util/util'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import TopMostLogger from '../../components/TopMostLogger'

const Recipe = ({ id }) => {
	const dispatch = useDispatch()
	const history = useHistory()

	const post = useSelector((state) => state.post.single)
	const user = useSelector((state) => state.auth.user)

	const [showLog, setShowLog] = useState(false)
	const [logTitle, setLogTitle] = useState('')
	const [logMessage, setLogMessage] = useState('')

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
					<TopMostLogger show={showLog} title={logTitle} message={logMessage} />
					{post.user === user?._id && (
						<div className="fullrecipe__editarea">
							<Button
								type="delete"
								onClick={async () => {
									const result = await deletePost(post._id)
									console.log(result)
									if (result.error) {
										// could not delete post
										setLogMessage(result.error)
										setLogTitle('Error')
										setShowLog(true)
									} else {
										setLogMessage(result.message)
										setLogTitle('Alert')
										setShowLog(true)
									}

									setTimeout(() => {
										setShowLog(false)
										history.goBack()
									}, 2000)
								}}
							/>

							<Button
								type="edit"
								onClick={() => {
									// set edit form
									dispatch({
										type: 'EDIT_FORM/SET',
										payload: {
											formData: { ...post, images: null },
											files: [...post.images],
										},
									})
									// redirect to edit page
									history.push('/edit')
								}}
							/>
						</div>
					)}

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

					{/* 
						Interact with post (like, comment, report)
						only if post is not yours
					 */}
					{post.user !== user._id && (
						<div className="fullrecipe__interactions">
							<Button
								onClick={async () => {
									const result = await likePost(post._id)
									if (result.result !== 0) {
										dispatch({
											type: 'POST/LIKE_SINGLE',
											payload: result.result,
										})
									} else {
										dispatch({
											type: 'POST/LIKE_SINGLE/REMOVE',
											payload: user._id,
										})
									}
								}}
								type={post.likes.includes(user._id) ? 'liked' : 'like'}
							/>
						</div>
					)}
				</>
			) : (
				<Spinner />
			)}
		</motion.section>
	)
}

export default Recipe
