import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Navbar = () => {
	const [open, setOpen] = useState(false)

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
				</div>
			</nav>

			<div className="navbar__brand">
				<Link to="/" className="navbar__brand__logo" aria-label="Recipes Logo">
					R
				</Link>
			</div>

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
		</header>
	)
}

export default Navbar
