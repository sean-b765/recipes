export default (state = {}, action) => {
	console.log(action)
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'SIGN_IN':
			console.log(action.payload)
			return state
		case 'SIGN_UP':
			console.log(action.payload)
			return state
		default:
			return state
	}
}
