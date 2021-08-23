import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
	const profile = localStorage.getItem('profile')

	if (profile) {
		req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
	}

	return req
})

export const apiSignIn = (body) => API.post('/auth/signin', body)
export const apiSignUp = (body) => API.post('/auth/signup', body)
