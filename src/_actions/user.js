import {
	apiBlockUser,
	apiFollowUser,
	apiGetFollowers,
	apiGetFollowing,
	apiGetUser,
	apiUnblockUser,
	apiUnfollowUser,
} from '../_api'

export const getUser = async (userId) => {
	try {
		const { data } = await apiGetUser(userId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const followUser = async (targetId) => {
	try {
		const { data } = await apiFollowUser(targetId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}
export const unfollowUser = async (targetId) => {
	try {
		const { data } = await apiUnfollowUser(targetId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const blockUser = async (targetId) => {
	try {
		const { data } = await apiBlockUser(targetId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const unblockUser = async (targetId) => {
	try {
		const { data } = await apiUnblockUser(targetId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const getFollowers = async (userId) => {
	try {
		const { data } = await apiGetFollowers(userId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}

export const getFollowing = async (userId) => {
	try {
		const { data } = await apiGetFollowing(userId)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message || err?.response?.data?.error,
		}
	}
}
