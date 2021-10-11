/*
	Create post form will be saved in redux 
	store so that when navigating away the form state can be loaded
*/

export default (state = { formData: null, files: [] }, action) => {
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'POST_FORM/SET':
			// also set item in localstorage
			localStorage.setItem('post_form', JSON.stringify(action.payload))
			return {
				...state,
				formData: action.payload.formData,
				files: action.payload.files,
			}
		default:
			return state
	}
}
