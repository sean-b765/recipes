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
		default:
			return state
	}
}
