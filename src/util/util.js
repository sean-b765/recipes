import DOMPurify from 'dompurify'

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
const imagePattern = /(![\[][\w\d-_]{0,})[\]]/g

/**
 * Loop through ![img]'s and get corresponding base64,
 * 	injecting this into brackets to render in markdown
 * @param {String} content
 */
export const placeImageInContent = (content, images) => {
	const result = content.matchAll(imagePattern)
	let contentString = content

	const imgNames = images.map((img) => img.name)

	let value
	while (!(value = result.next()).done) {
		const imgName = value.value[0].substring(2, value.value[0].length - 1)
		if (!imgNames.includes(imgName)) {
			contentString = contentString.replace(value.value[0], '')
			continue
		}

		const img = images.find((image, idx) => image.name === imgName)

		contentString = contentString.replace(
			value.value[0],
			`\n![${imgName}](${img.base64})`
		)
	}

	contentString = DOMPurify.sanitize(contentString)

	return contentString
}
