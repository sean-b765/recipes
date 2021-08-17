import React from 'react'
import { useState } from 'react'
import {
	AiFillFacebook,
	AiFillGoogleCircle,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Signup = () => {
	const [showPass, setShowPass] = useState(false)

	return (
		<section className="auth__signup" data-aos="fade-in" data-aos-delay="150">
			<div className="auth__container">
				<div>
					<button
						className="btn btn--no-border btn--no-bg"
						aria-label="Sign up with your Facebook account"
					>
						<AiFillFacebook />
					</button>

					<button
						className="btn btn--no-border btn--no-bg"
						aria-label="Sign up with a Google account"
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
						type="text"
						name="username"
						id="username"
						placeholder="Username"
					/>

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

					<label for="repeatPassword">
						<input
							className="custom_input custom_input--underline"
							type={showPass ? 'text' : 'password'}
							name="repeatPassword"
							id="repeatPassword"
							placeholder="Repeat Password"
						/>
						<div onClick={() => setShowPass(!showPass)}>
							{showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</div>
					</label>

					<input type="submit" className="btn btn--pill" value="Sign up" />
				</form>

				<Link to="/login" aria-label="Switch to login form">
					Already have an account? Login
				</Link>
			</div>
		</section>
	)
}

export default Signup
