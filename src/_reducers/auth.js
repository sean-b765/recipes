/*
	Details of current user
*/
export default (state = { user: null }, action) => {
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'AUTH/INIT':
			// On initialize (user from localStorage - if stored)
			return {
				...state,
				user: action?.payload?.user,
				token: action?.payload?.token,
			}
		case 'AUTH/EDIT_STORED_USER':
			localStorage.setItem(
				'profile',
				JSON.stringify({
					user: action?.payload?.user,
					token: JSON.parse(localStorage.getItem('profile')).token,
				})
			)

			return {
				...state,
				user: action?.payload?.user,
			}
		case 'AUTH/SIGN_IN':
			// Sign in (set localStorage)
			localStorage.setItem(
				'profile',
				JSON.stringify({
					user: action?.payload?.user,
					token: action?.payload?.token,
				})
			)

			return {
				...state,
				user: action?.payload?.user,
				token: action?.payload?.token,
			}
		case 'AUTH/SIGN_UP':
			// Sign user up
			return { ...state }
		case 'AUTH/LOG_OUT':
			// Log user out (just nullify state and remove localstorage item)
			localStorage.removeItem('profile')
			return { ...state, user: null, token: null }
		default:
			return state
	}
}
