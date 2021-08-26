export default (state = { all: [], single: null }, action) => {
	if (typeof state === 'undefined') return

	console.log(state.single)

	switch (action.type) {
		case 'USER/SET_USER':
			return { ...state, single: action.payload }
		case 'USER/SET_USER_FOLLOWERS':
			return {
				...state,
				single: { ...state.single, _followers: action.payload },
			}
		case 'USER/SET_USER_FOLLOWING':
			return {
				...state,
				single: { ...state.single, _following: action.payload },
			}
		case 'USER/EDIT_USER':
			return { ...state, single: { ...state.single, ...action.payload } }
		case 'USER/SET_ALL':
			return { ...state, all: action.payload }
		case 'USER/PUSH_TO_ALL':
			return { ...state, all: state.all.push(action.payload) }
		case 'USER/PULL_FROM_ALL':
			return {
				...state,
				all: state.all.filter((item) => item._id !== action.payload._id),
			}
		default:
			return state
	}
}
