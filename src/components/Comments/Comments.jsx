import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnPost } from '../../_actions/post'
import Comment from './Comment'

const Comments = ({ comments, postId, user }) => {
	const dispatch = useDispatch()

	const [comment, setComment] = useState('')

	const submitComment = async () => {
		const result = await commentOnPost(postId, comment)
		if (result.result) {
			dispatch({
				type: 'POST/COMMENT_SINGLE',
				payload: {
					...result.result,
					user: {
						imageUrl: user.imageUrl,
						score: user.score,
						username: user.username,
						_id: user._id,
					},
				},
			})
			setComment('')
		}
	}

	return (
		<div className="comments">
			{user?._id && (
				<div className="comments__field">
					<form onSubmit={(e) => e.preventDefault()}>
						<textarea
							placeholder="Type a comment..."
							aria-placeholder="Type a comment..."
							className="custom_input custom_input--comment-field"
							name="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>

						<input
							type="submit"
							value="Post"
							onClick={submitComment}
							className="btn btn--solid btn--solid-blue"
						/>
					</form>
				</div>
			)}
			{comments.map((comment, index) => (
				<Comment comment={comment} key={index} userId={user?._id} />
			))}
		</div>
	)
}

export default Comments
