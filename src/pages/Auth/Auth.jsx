import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import TopMostLogger from '../../components/TopMostLogger'
import { signIn, signUp } from '../../_actions/auth'

const Auth = () => {
	const history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [showing, setShowing] = useState(false)

	const showDialog = (title, message, duration = 2000) => {
		if (showing) return

		setTitle(title)
		setMessage(message)
		setShowing(true)

		setTimeout(() => {
			setShowing(false)
		}, duration)
	}

	const handleSignUp = async (e, body) => {
		e.preventDefault()

		if (
			!body?.email ||
			!body?.username ||
			!body?.password ||
			!body?.repeatPassword
		) {
			showDialog('Error', 'Please fill in required details.')
			return
		}

		let res

		try {
			res = await signUp(body)
		} catch (err) {
			console.log(err)
			showDialog('Error', err?.message)
		}

		if (res?.verificationSent) {
			showDialog('Alert', `Verification email sent to ${res.user.email}`, 3500)
		}

		// Show an error if a there was one, otherwise dispatch
		if (!res?.error) dispatch({ payload: res, type: 'AUTH/SIGN_UP' })
		else showDialog('Error', res?.error)
	}

	const handleSignIn = async (e, body) => {
		try {
			e.preventDefault()

			if (!body?.email || !body?.password) {
				showDialog('Error', 'Please fill in the required details.')
				return
			}

			const res = await signIn(body)

			if (!res.error) {
				dispatch({ payload: res, type: 'AUTH/SIGN_IN' })
				history.push('/discover')
			} else showDialog('Error', res.error)
		} catch (err) {}
	}

	return (
		<motion.section className="auth">
			<div className="auth__wrapper">
				<TopMostLogger title={title} message={message} show={showing} />

				{location.pathname === '/login' && (
					<>
						<header>
							<h1 data-aos="zoom-out">Login</h1>
						</header>
						<Login handleSignIn={handleSignIn} />
					</>
				)}
				{location.pathname === '/signup' && (
					<>
						<header>
							<h1 data-aos="zoom-out">Sign up</h1>
						</header>
						<Signup handleSignUp={handleSignUp} />
					</>
				)}
			</div>
		</motion.section>
	)
}

export default Auth
