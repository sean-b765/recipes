import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import TopMostLogger from '../../components/TopMostLogger'
import { signUp } from '../../_actions/auth'

const Auth = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [showing, setShowing] = useState(false)

	const showDialog = (title, message) => {
		if (showing) return

		setTitle(title)
		setMessage(message)
		setShowing(true)

		setTimeout(() => {
			setShowing(false)
		}, 2000)
	}

	const handleSignUp = async (e, body) => {
		e.preventDefault()

		console.log(body)
		if (
			!body?.email ||
			!body?.username ||
			!body?.password ||
			!body?.repeatPassword
		) {
			showDialog('Error', 'Please fill in required details')
			return
		}

		const res = await signUp(body)

		// Show an error if a there was one, otherwise dispatch
		if (!res.error) dispatch({ payload: res, type: 'SIGN_UP' })
		else showDialog('Error', res.error)
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
						<Login />
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
