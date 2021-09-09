import { apiCreatePost, apiGetDiscover, apiGetPost } from '../_api'

export const getDiscover = async () => {
	try {
		const { data } = await apiGetDiscover()
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message,
		}
	}
}

export const getPostByFriendlyId = async (id) => {
	try {
		const { data } = await apiGetPost(id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message,
		}
	}
}

export const createPost = async (body) => {
	try {
		console.log(body)
		const { data } = await apiCreatePost(body)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message,
		}
	}
}
