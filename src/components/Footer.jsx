import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__logo">
				<h3>Recipes</h3>
			</div>
			<nav className="footer__navigation">
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
					<li>
						<Link to="/post">Post</Link>
					</li>
				</ul>
			</nav>
			<div className="footer__info">
				<div className="footer__info__legal">
					<Link to="/">Privacy Policy</Link>
					<Link to="/">Terms &amp; Conditions</Link>
				</div>
				<div className="footer__info__copyright">
					<a href="https://github.com/sean-b765" target="_blank">
						Copyright &copy; 2021 | Sean Boaden
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
