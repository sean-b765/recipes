export default (state = { formData: null, files: [] }, action) => {
	if (typeof state === 'undefined') return

	switch (action.type) {
		case 'POST_FORM/SET':
			return {
				...state,
				formData: action.payload.formData,
				files: action.payload.files,
			}
		default:
			return state
	}
}
