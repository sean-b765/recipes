import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { IoNotificationsOutline } from 'react-icons/io5'

const Navbar = () => {
	const [open, setOpen] = useState(false)

	const user = useSelector((state) => state.auth.user)

	const location = useLocation()
	const history = useHistory()

	useEffect(() => {
		setOpen(false)
	}, [location])

	return (
		<header className="navbar">
			<nav className="navbar__navigation">
				<div
					aria-label="Open the menu"
					className={
						open
							? 'navbar__navigation__mobile close'
							: 'navbar__navigation__mobile'
					}
					onClick={() => setOpen(!open)}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div className={open ? 'menu mobile-variant' : 'menu'}>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/discover">Discover</Link>
						</li>
						<li>
							<Link to="/search">Search</Link>
						</li>
					</ul>

					{!user && (
						<div className="menu__mobile__actions">
							<button
								className="btn btn--no-bg"
								onClick={() => history.push('/login')}
							>
								Login
							</button>
							<button
								className="btn btn--pill btn--solid-blue"
								onClick={() => history.push('/signup')}
							>
								Sign up
							</button>
						</div>
					)}
				</div>
			</nav>

			<div className="navbar__brand">
				<Link to="/" className="navbar__brand__logo" aria-label="Recipes Logo">
					R
				</Link>
			</div>

			{/* Login/signup should show when not logged in */}
			{!user && (
				<div className="navbar__actions">
					<button
						className="btn btn--no-bg"
						onClick={() => history.push('/login')}
					>
						Login
					</button>
					<button
						className="btn btn--pill btn--solid-blue"
						onClick={() => history.push('/signup')}
					>
						Sign up
					</button>
				</div>
			)}
			{/* See notification bell / user avatar when logged in */}
			{user && (
				<div className="navbar__notif">
					<IoNotificationsOutline
						aria-label="View your notifications"
						onClick={() => {}}
					/>
					<div
						className="navbar__notif__profile"
						aria-label="Visit your profile"
						onClick={() => history.push(`/profiles/${user._id}`)}
					>
						<img
							src={user.imageUrl ? user.imageUrl : '/images/default-avatar.png'}
							alt="Your profile picture"
						/>
					</div>
				</div>
			)}
		</header>
	)
}

export default Navbar
