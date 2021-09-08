import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

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
export const apiGoogleSignIn = (body) => API.post('/auth/googleSignin', body)

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
