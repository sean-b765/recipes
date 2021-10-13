import {
	apiCommentOnPost,
	apiCreatePost,
	apiDeletePost,
	apiEditPost,
	apiGetDiscover,
	apiGetPost,
	apiLikePost,
	apiReportPost,
	apiSearch,
} from '../_api'

export const getDiscover = async (filters) => {
	try {
		const { data } = await apiGetDiscover(filters)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const getSearch = async (filters) => {
	try {
		const { data } = await apiSearch(filters)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const getPostByFriendlyId = async (id) => {
	try {
		const { data } = await apiGetPost(id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
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
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const deletePost = async (id) => {
	try {
		const { data } = await apiDeletePost(id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const editPost = async (body, id) => {
	try {
		const { data } = await apiEditPost(body, id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const likePost = async (id) => {
	try {
		const { data } = await apiLikePost(id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const reportPost = async (id) => {
	try {
		const { data } = await apiReportPost(id)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const commentOnPost = async (id, comment) => {
	try {
		const { data } = await apiCommentOnPost(id, comment)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}
