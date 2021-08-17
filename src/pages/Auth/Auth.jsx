import { motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
	const location = useLocation()

	return (
		<motion.section className="auth">
			<div className="auth__wrapper">
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
						<Signup />
					</>
				)}
			</div>
		</motion.section>
	)
}

export default Auth
