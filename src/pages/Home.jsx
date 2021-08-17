import React from 'react'
import { AiOutlineSearch, AiOutlineShareAlt } from 'react-icons/ai'
import { RiCompassDiscoverFill } from 'react-icons/ri'
import { BiUserPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

const Home = () => {
	const history = useHistory()

	return (
		<motion.section
			className="home"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="home__wrapper">
				<div className="home__wrapper__landing">
					<header className="home__wrapper__landing__split">
						<h1>Your favourite recipes,</h1>
						<p>all in one place.</p>
					</header>
					<div className="home__wrapper__landing__split home__wrapper__landing__split--center">
						<button
							className="btn btn--large"
							onClick={() => history.push('/signup')}
						>
							Get Started
						</button>
					</div>
				</div>

				<section className="home__wrapper__showcase">
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--discover">
						<header>
							<RiCompassDiscoverFill />
							<h2>Discover new tastes</h2>
						</header>
						<article>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Voluptatibus ratione facilis dolorum cupiditate rem enim non
								perferendis laborum quibusdam consequuntur?
							</p>
						</article>
					</div>
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--reverse home__wrapper__showcase__item--search">
						<article>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
								dolorum voluptate sapiente.
							</p>
						</article>
						<header>
							<AiOutlineSearch />
							<h2>Search for a dish</h2>
						</header>
					</div>
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--features">
						<div className="split">
							<header>
								<BiUserPlus />
								<h2>Follow your friends</h2>
							</header>
							<article>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Atque placeat rerum error consectetur minus nulla ad,
									necessitatibus rem et.
								</p>
							</article>
						</div>

						<div className="split">
							<header>
								<AiOutlineShareAlt />
								<h2>Share your own creations</h2>
							</header>
							<article>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Illum, nam?
								</p>
							</article>
						</div>
					</div>
				</section>
			</div>
		</motion.section>
	)
}

export default Home
