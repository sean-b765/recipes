/*
	ALL posts = list from discover or search
	SINGLE post = post page
*/

export default (state = { all: [], single: null }, action) => {
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'POST/SET_POST':
			return { ...state, single: action.payload }
		case 'POST/EDIT_POST':
			return { ...state, single: { ...state.single, ...action.payload } }
		case 'POST/SET_ALL':
			return { ...state, all: action.payload }
		case 'POST/EDIT_ALL':
			return { ...state }
		case 'POST/LIKE_SINGLE':
			return {
				...state,
				single: {
					...state.single,
					likes: [...state.single.likes, action.payload],
				},
			}
		case 'POST/LIKE_SINGLE/REMOVE':
			// remove the given user _id (action payload) from likes
			return {
				...state,
				single: {
					...state.single,
					likes: state.single.likes.map((userId) => userId !== action.payload),
				},
			}

		case 'POST/COMMENT_SINGLE':
			// add comment to single post
			return {
				...state,
				single: {
					...state.single,
					comments: [...state.single.comments, action.payload],
				},
			}

		case 'POST/COMMENT_SINGLE/REMOVE':
			// remove comment from post
			return {
				...state,
				single: {
					...state.single,
					comments: state.single.comments.filter(
						(comment) => comment._id !== action.payload
					),
				},
			}

		default:
			return state
	}
}
