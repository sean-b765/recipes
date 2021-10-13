/*
	Edit post form will be saved in redux and localStorage, just like postForm
*/

export default (state = { formData: null, files: [] }, action) => {
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'EDIT_FORM/SET':
			localStorage.setItem('edit_form', JSON.stringify(action.payload))
			return {
				...state,
				formData: action.payload.formData,
				files: action.payload.files,
			}
		default:
			return state
	}
}
