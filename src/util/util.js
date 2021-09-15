export const bufferToBase64 = (buffer) => {
	var binary = ''
	var bytes = new Uint8Array(buffer)
	var len = bytes.byteLength
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return window.btoa(binary)
}

/**
 *
 * @param {Object} filters
 * @returns {String}
 */
export const formatFilters = (filters, search = '') =>
	`?sort=${filters.sort}&period=${filters.period}&page=${filters.page}&skip=${
		filters.skip
	}${search !== '' ? `&terms=${search}` : ''}`
