import { motion } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdFileUpload } from 'react-icons/md'
import {
	VscEye,
	VscEyeClosed,
	VscUnverified,
	VscVerified,
} from 'react-icons/vsc'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { bufferToBase64 } from '../../util/util'
import { editUser } from '../../_actions/user'
import TopMostLogger from '../../components/TopMostLogger'

const Settings = () => {
	const dispatch = useDispatch()
	const fileRef = useRef()
	const user = useSelector((state) => state.auth.user)

	const [message, setMessage] = useState('')
	const [title, setTitle] = useState('')
	const [showLog, setShowLog] = useState(false)

	const [details, setDetails] = useState({
		_id: user?._id || null,
		username: user?.username || null,
		bio: user?.bio || null,
		email: user?.email || null,
		imageUrl: user?.imageUrl || null,
		verified: user?.verified || null,
		deactivated: user?.deactivated || null,
	})

	useEffect(() => {
		setDetails({
			_id: user?._id,
			username: user?.username,
			bio: user?.bio,
			email: user?.email,
			imageUrl: user?.imageUrl,
			verified: user?.verified,
			deactivated: user?.deactivated,
		})
	}, [user])

	const submitEdit = async () => {
		const result = await editUser(details?._id, {
			imageUrl: details?.imageUrl,
			bio: details?.bio,
			username: details?.username,
		})

		if (result.error) {
			setMessage(result.error)
			setTitle('Error')
			setShowLog(true)

			setTimeout(() => {
				setShowLog(false)
			}, 2000)
		} else {
			dispatch({
				type: 'AUTH/EDIT_STORED_USER',
				payload: result,
			})

			setMessage('Saved details')
			setTitle('Alert')
			setShowLog(true)

			setTimeout(() => {
				setShowLog(false)
			}, 2000)
		}
	}

	return (
		<motion.section
			className="settings"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<TopMostLogger message={message} show={showLog} title={title} />
			<div className="settings__container">
				<div className="settings__edit">
					<p
						className={
							!details?.verified
								? 'email email--unverified'
								: 'email email--verified'
						}
					>
						{details?.email}
						{!details?.verified ? <VscUnverified /> : <VscVerified />}
					</p>

					<form
						onSubmit={(e) => {
							e.preventDefault()
							submitEdit()
						}}
					>
						<label className="file_upload">
							<img src={details?.imageUrl} alt="Your profile avatar" />
							<span>
								<MdFileUpload /> Upload
							</span>
							<input
								type="file"
								name="avatar"
								multiple={false}
								ref={fileRef}
								onChange={async (e) => {
									// check that it's less than 10 MB
									if (e.target.files[0].size > 100 ** 6) return

									const buffer = await e.target.files[0].arrayBuffer()

									const b64 = `data:${
										e.target.files[0].type
									};base64,${bufferToBase64(buffer)}`

									setDetails({ ...details, imageUrl: b64 })
								}}
								style={{ display: 'none' }}
							/>
						</label>

						<label htmlFor="username">
							<input
								className="custom_input"
								type="text"
								name="username"
								placeholder="Username"
								value={details?.username}
								onChange={({ target }) =>
									setDetails({ ...details, username: target.value })
								}
							/>
						</label>

						<label htmlFor="bio">
							<textarea
								className="custom_input custom_input--bio"
								name="bio"
								placeholder="bio"
								value={details?.bio}
								onChange={({ target }) =>
									setDetails({ ...details, bio: target.value })
								}
							/>
						</label>

						<input
							type="submit"
							value="Edit Profile"
							className="btn btn--pill"
						/>
					</form>
				</div>
				<div className="settings__visibility">
					{details?.deactivated ? (
						<>
							<p className="privacy">
								Your profile is set to private <VscEyeClosed />
							</p>
						</>
					) : (
						<>
							<p className="privacy">
								Your profile is public <VscEye />
							</p>
						</>
					)}
					<Link to="/settings/privacy">Change visibility</Link>
				</div>
				<div className="settings__password">
					<RiLockPasswordLine />
					<Link to="/settings/password">Reset password</Link>
				</div>
			</div>
		</motion.section>
	)
}

export default Settings
