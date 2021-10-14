import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND })

API.interceptors.request.use((req) => {
	const profile = localStorage.getItem('profile')

	if (profile) {
		req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
	}

	return req
})

// Auth
export const apiSignIn = (body) => API.post('/auth/signin', body)
export const apiSignUp = (body) => API.post('/auth/signup', body)
export const apiGoogleSignIn = (body) => API.post('/auth/signin-google', body)

// Users
export const apiGetUser = (userId) => API.get(`/user/${userId}`)
export const apiFollowUser = (targetId) => API.patch(`/user/follow/${targetId}`)
export const apiUnfollowUser = (targetId) =>
	API.patch(`/user/unfollow/${targetId}`)
export const apiGetFollowers = (userId) => API.get(`/user/${userId}/followers`)
export const apiGetFollowing = (userId) => API.get(`/user/${userId}/following`)
export const apiBlockUser = (targetId) => API.patch(`/user/block/${targetId}`)
export const apiUnblockUser = (targetId) =>
	API.patch(`/user/unblock/${targetId}`)
export const apiEditUser = (body, userId) => API.patch(`/user/${userId}`, body)

export const apiDeleteUser = (userId) => API.delete(`/user/${userId}`)
export const apiDeactivateUser = (userId) =>
	API.patch(`/user/${userId}/deactivate`)
// Make Public
export const apiReactivateUser = (userId) =>
	API.patch(`/user/${userId}/reactivate`)

// Password Reset
export const apiResetPasswordRequest = (userId) =>
	API.get(`/user/${userId}/reset-password-request`)
export const apiResetPassword = (userId, hash, body) =>
	API.post(`/user/${userId}/${hash}/reset-password`, body)
export const apiChangePassword = (userId) =>
	API.patch(`/user/${userId}/change-password`)

// Verification
export const apiVerifyUser = (hash) => API.get(`/verify/${hash}`)
export const apiRequestVerification = (email) =>
	API.get(`/verify/request/${email}`)

// Posts
export const apiGetDiscover = (filters = '?sort=rating&period=alltime') =>
	API.get(`/posts/discover${filters}`)
export const apiCreatePost = (body) => API.post(`/posts/create`, body)
export const apiEditPost = (body, id) => API.patch(`/posts/edit/${id}`, body)
export const apiGetPost = (id) => API.get(`/posts/post/${id}`)
export const apiSearch = (filters = '?sort=rating&period=alltime') =>
	API.get(`/posts/search${filters}`)
export const apiDeletePost = (id) => API.delete(`/posts/delete/${id}`)
export const apiLikePost = (id) => API.patch(`/posts/like/${id}`)
export const apiAddComment = (id, commentString) =>
	API.post(`/posts/comment/${id}`, commentString)
export const apiRemoveComment = (commentId) =>
	API.delete(`/posts/remove-comment/${commentId}`)
export const apiReportPost = (id) => API.patch(`/posts/report/${id}`)
