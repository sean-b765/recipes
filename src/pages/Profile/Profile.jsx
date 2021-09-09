import { motion } from 'framer-motion'
import React from 'react'
import { useEffect } from 'react'
import {
	AiOutlineLogout,
	AiOutlineMessage,
	AiOutlineUserAdd,
	AiOutlineUserDelete,
} from 'react-icons/ai'
import { IoOptionsOutline } from 'react-icons/io5'
import { CgBlock, CgUnblock } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
	blockUser,
	followUser,
	getFollowers,
	getFollowing,
	getUser,
	unblockUser,
	unfollowUser,
} from '../../_actions/user'
import Modal from './Modal'
import { useState } from 'react'

const Profile = ({ id }) => {
	// get the profile via id on mount (useEffect)
	const dispatch = useDispatch()
	const history = useHistory()

	const [modal, setModal] = useState({
		showing: false,
		title: '',
		children: [],
	})

	const profile = useSelector((state) => state.user.single) || null

	const me = useSelector((state) => state.auth.user) || null

	useEffect(() => {
		getUser(id).then((res) => {
			// Skip if error
			if (res.error) return

			dispatch({
				type: 'USER/SET_USER',
				payload: res,
			})

			getFollowers(id).then((response) => {
				dispatch({
					type: 'USER/SET_USER_FOLLOWERS',
					payload: response.result,
				})
			})

			getFollowing(id).then((response) => {
				dispatch({
					type: 'USER/SET_USER_FOLLOWING',
					payload: response.result,
				})
			})
		})
	}, [])

	const _followUser = async (_id) => {
		const { user, target } = await followUser(_id)

		dispatch({
			type: 'AUTH/EDIT_STORED_USER',
			payload: {
				user: user,
				token: JSON.parse(localStorage.getItem('profile')).token,
			},
		})

		dispatch({
			type: 'USER/EDIT_USER',
			payload: target,
		})
	}
	const _unfollowUser = async (_id) => {
		const { user, target } = await unfollowUser(_id)

		dispatch({
			type: 'AUTH/EDIT_STORED_USER',
			payload: {
				user: user,
				token: JSON.parse(localStorage.getItem('profile')).token,
			},
		})

		dispatch({
			type: 'USER/EDIT_USER',
			payload: target,
		})
	}

	const _blockUser = async (_id) => {
		const { user } = me.blockList.includes(profile._id)
			? await unblockUser(_id)
			: await blockUser(_id)

		dispatch({
			type: 'AUTH/EDIT_STORED_USER',
			payload: {
				user,
				token: JSON.parse(localStorage.getItem('profile')).token,
			},
		})
	}

	const showFollowers = () => {
		let showing = false

		if (profile._followers?.length === 0 || profile.followers?.length === 0) {
			showing = false
		} else {
			showing = true
		}

		setModal({
			...modal,
			title: 'Followers',
			showing,
			children: profile._followers,
		})
	}

	const showFollowing = () => {
		let showing = false

		if (profile._following?.length === 0) {
			showing = false
		} else {
			showing = true
		}

		setModal({
			...modal,
			title: 'Following',
			showing,
			children: profile._following,
		})
	}

	const closeModal = () => {
		setModal({ ...modal, showing: false })
	}

	return (
		<>
			<Modal closeModal={closeModal} modal={modal} />

			<motion.section className="profile">
				{profile && me ? (
					<div className="profile__card">
						<header className="profile__card__header">
							<div className="profile__card__header__avatar">
								<img
									src={
										profile.imageUrl
											? profile.imageUrl
											: '/images/default-avatar.png'
									}
									alt={`Picture of ${profile.username}`}
								/>
							</div>
							<div className="profile__card__header__details">
								<h1>{profile.username}</h1>
								<div className="profile__card__header__details__stats">
									<button className="btn btn--no-bg" aria-label="User Score">
										{profile?.score} Score
									</button>
									<button
										aria-label={
											profile?.followers?.length === 0
												? '0 followers'
												: `View ${profile?.followers?.length} followers`
										}
										className="btn btn--no-bg"
										onClick={() => showFollowers()}
									>
										{profile?.followers?.length} Followers
									</button>
									<button
										className="btn btn--no-bg"
										onClick={() => showFollowing()}
										aria-label={
											profile.following.length === 0
												? '0 following'
												: `View ${profile.following.length} following`
										}
									>
										{profile.following.length} Following
									</button>
								</div>
							</div>
						</header>

						{me?._id !== id ? (
							<section className="profile__card__actions">
								<button
									className="btn btn--pill"
									aria-label={
										profile.followers.includes(me._id)
											? 'Unfollow this user'
											: 'Follow this user'
									}
									onClick={() =>
										profile.followers.includes(me._id)
											? _unfollowUser(id)
											: _followUser(id)
									}
								>
									{profile.followers.includes(me._id) ? (
										<AiOutlineUserDelete />
									) : (
										<AiOutlineUserAdd />
									)}
									{profile.followers.includes(me._id) ? 'Unfollow' : 'Follow'}
								</button>
								<button
									className="btn btn--pill"
									aria-label="Message this user"
								>
									<AiOutlineMessage />
									Message
								</button>
								<button
									className="btn btn--no-bg"
									aria-label={
										me.blockList.includes(profile._id)
											? 'Unblock this user'
											: 'Block this user'
									}
									onClick={() => _blockUser(id)}
								>
									{me.blockList.includes(profile._id) ? (
										<CgUnblock />
									) : (
										<CgBlock />
									)}
									{me.blockList.includes(profile._id) ? 'Unblock' : 'Block'}
								</button>
							</section>
						) : (
							<section className="profile__card__actions">
								<button
									className="btn btn--no-bg"
									aria-label="Logout"
									onClick={() => {
										dispatch({ type: 'AUTH/LOG_OUT' })
										history.goBack()
									}}
								>
									<AiOutlineLogout />
									Logout
								</button>
								<button
									className="btn btn--pill"
									aria-label="Message this user"
								>
									<IoOptionsOutline />
									Settings
								</button>
							</section>
						)}

						<article className="profile__card__bio" aria-label="Profile bio">
							{profile.bio}
						</article>
					</div>
				) : (
					<p>Cannot find this user.</p>
				)}

				<section className="profile__activity"></section>
			</motion.section>
		</>
	)
}

export default Profile
