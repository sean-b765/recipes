import React from 'react'
import { useState } from 'react'
import {
	AiFillFacebook,
	AiFillGoogleCircle,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom'
import { googleSignin } from '../../_actions/auth'
import ThirdPartyAuth from './ThirdPartyAuth'
import { useDispatch } from 'react-redux'

const Signup = ({ handleSignUp }) => {
	const dispatch = useDispatch()
	const history = useHistory()

	const [showPass, setShowPass] = useState(false)
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	})

	return (
		<section className="auth__signup" data-aos="fade-in" data-aos-delay="150">
			<div className="auth__container">
				<form
					action=""
					onSubmit={(e) => handleSignUp(e, formData)}
					className="auth__form"
				>
					<input
						className="custom_input custom_input--underline"
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						value={formData.username}
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
						}
					/>

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

					<label htmlFor="repeatPassword">
						<input
							className="custom_input custom_input--underline"
							type={showPass ? 'text' : 'password'}
							name="repeatPassword"
							id="repeatPassword"
							placeholder="Repeat Password"
							value={formData.repeatPassword}
							onChange={(e) =>
								setFormData({ ...formData, repeatPassword: e.target.value })
							}
						/>
						<div onClick={() => setShowPass(!showPass)}>
							{showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</div>
					</label>

					<input type="submit" className="btn btn--pill" value="Sign up" />
				</form>

				<p>Or...</p>

				<ThirdPartyAuth
					onSuccessGoogle={(e) => {
						const { tokenId, profileObj } = e

						console.log(e)

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

				<Link to="/login" aria-label="Switch to login form">
					Already have an account? Login
				</Link>
			</div>
		</section>
	)
}

export default Signup
