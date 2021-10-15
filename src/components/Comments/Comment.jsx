import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { removeComment } from '../../_actions/post'

const Comment = ({ comment, userId }) => {
	const dispatch = useDispatch()

	const _removeComment = async () => {
		const result = await removeComment(comment?._id)

		if (result.result) {
			dispatch({ type: 'POST/COMMENT_SINGLE/REMOVE', payload: result.result })
		} else if (result.error) {
			console.log(result.error)
		}
	}

	return (
		<div className="comments__comment">
			{userId === comment?.user?._id && (
				<button
					className="btn btn--red btn--round"
					aria-label="Remove your comment"
					onClick={_removeComment}
				>
					<MdDeleteForever />
				</button>
			)}
			<header>
				<img src={comment?.user?.imageUrl} />
				<p>{comment?.user?.username}</p>
			</header>
			<p
				dangerouslySetInnerHTML={{
					__html: comment?.message?.replace(/\n/g, '<br>'),
				}}
			></p>
		</div>
	)
}

export default Comment
