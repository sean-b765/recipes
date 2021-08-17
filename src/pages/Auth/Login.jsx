import React from 'react'
import { Link } from 'react-router-dom'
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiFillFacebook,
	AiFillGoogleCircle,
} from 'react-icons/ai'
import { useState } from 'react'

const Login = () => {
	const [showPass, setShowPass] = useState(false)
	return (
		<section className="auth__login" data-aos="fade-in" data-aos-delay="150">
			<div className="auth__container">
				<div>
					<button
						className="btn btn--no-border btn--no-bg"
						aria-label="Login with your Facebook account"
					>
						<AiFillFacebook />
					</button>

					<button
						className="btn btn--no-border btn--no-bg"
						aria-label="Login with a Google account"
					>
						<AiFillGoogleCircle />
					</button>
				</div>
				<form
					action=""
					onSubmit={(e) => {
						e.preventDefault()
					}}
					className="auth__form"
				>
					<input
						className="custom_input custom_input--underline"
						type="email"
						name="email"
						id="email"
						placeholder="Email"
					/>

					<label for="password">
						<input
							className="custom_input custom_input--underline"
							type={showPass ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="Password"
						/>
						<div onClick={() => setShowPass(!showPass)}>
							{showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</div>
					</label>

					<input type="submit" className="btn btn--pill" value="Login" />
				</form>

				<Link to="/forgot-password" aria-label="Forgot password link">
					Forgot your password?
				</Link>
				<Link to="/signup" aria-label="Switch to signup form">
					Don't have an account? Sign up
				</Link>
			</div>
		</section>
	)
}

export default Login
