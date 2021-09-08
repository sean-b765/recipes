import { apiSignIn, apiSignUp } from '../_api'

export const signIn = async (body) => {
	try {
		const { data } = await apiSignIn(body)

		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message,
		}
	}
}

export const signUp = async (body) => {
	try {
		const { data } = await apiSignUp(body)
		return data
	} catch (err) {
		return {
			error: err?.response?.data?.message,
		}
	}
}
