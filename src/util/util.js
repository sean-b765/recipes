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
export const formatFilters = (filters) =>
	filters.tags?.length >= 1
		? `?include=${filters.tags?.join(',')}&sort=${filters.sort}&period=${
				filters.period
		  }&serves=${filters.serves[0]}-${filters.serves[1]}&prepTime=${
				filters.prepTime[0]
		  }-${filters.prepTime[1]}&cookTime=${filters.cookTime[0]}-${
				filters.cookTime[1]
		  }&page=${filters.page}&perPage=${filters.perPage}${
				filters?.query !== '' ? `&terms=${filters?.query}` : ''
		  }`
		: `?sort=${filters.sort}&period=${filters.period}&serves=${
				filters.serves[0]
		  }-${filters.serves[1]}&prepTime=${filters.prepTime[0]}-${
				filters.prepTime[1]
		  }&cookTime=${filters.cookTime[0]}-${filters.cookTime[1]}&page=${
				filters.page
		  }&perPage=${filters.perPage}${
				filters?.query !== '' ? `&terms=${filters?.query}` : ''
		  }`

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
	// loop through all ![...] occurences
	while (!(value = result.next()).done) {
		const imgName = value.value[0].substring(2, value.value[0].length - 1)
		if (!imgNames.includes(imgName)) {
			contentString = contentString.replace(value.value[0], '')
			continue
		}

		// find the image
		const img = images.find((image, idx) => image.name === imgName)

		// replace the string occurence with ![...](image base64 string)
		contentString = contentString.replace(
			value.value[0],
			`\n![${imgName}](${img.base64})`
		)
	}

	// sanitize the content string to avoid any malicious tags e.g. <script>
	contentString = DOMPurify.sanitize(contentString)

	return contentString
}

export const formatLargeNumber = (num) => {
	if (num > 1_000_000) return `${parseFloat(Number(num / 1000000).toFixed(1))}M`
	else if (num > 100_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else if (num > 10_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else if (num > 1_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else return `${num}`
}
