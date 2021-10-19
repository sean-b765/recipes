import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import ThirdPartyAuth from './ThirdPartyAuth'
import { googleSignin } from '../../_actions/auth'
import { useDispatch } from 'react-redux'

const Login = ({ handleSignIn }) => {
	const dispatch = useDispatch()
	const history = useHistory()

	const [showPass, setShowPass] = useState(false)
	const [formData, setFormData] = useState({ email: '', password: '' })
	return (
		<section className="auth__login" data-aos="fade-in" data-aos-delay="150">
			<div className="auth__container">
				<form
					action=""
					onSubmit={(e) => handleSignIn(e, formData)}
					className="auth__form"
				>
					<input
						className="custom_input custom_input--underline"
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>

					<label htmlFor="password">
						<input
							className="custom_input custom_input--underline"
							type={showPass ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="Password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
						<div onClick={() => setShowPass(!showPass)}>
							{showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</div>
					</label>

					<input type="submit" className="btn btn--pill" value="Login" />
				</form>

				<ThirdPartyAuth
					onSuccessGoogle={(e) => {
						const { tokenId, profileObj } = e

						googleSignin({
							tokenId,
							imageUrl: profileObj.imageUrl,
							googleId: profileObj.googleId,
							email: profileObj.email,
							username: profileObj.name,
						})
							.then((res) => {
								dispatch({
									type: 'AUTH/SIGN_IN',
									payload: { ...res },
								})

								history.push('/discover')
							})
							.catch((err) => {
								console.log(err)
							})
					}}
				/>

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
