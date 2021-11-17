import React from 'react'
import { AiOutlineSearch, AiOutlineShareAlt } from 'react-icons/ai'
import { RiCompassDiscoverFill } from 'react-icons/ri'
import { BiUserPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
	const history = useHistory()
	const user = useSelector((state) => state.auth.user)

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
						<h1
							data-aos="fade"
							data-aos-duration="750"
							data-aos-delay="500"
							data-aos-timing=""
						>
							Your favourite recipes,
						</h1>
						<p
							data-aos="fade-right"
							data-aos-delay="800"
							data-aos-duration="850"
						>
							all in one place.
						</p>
					</header>
					{!user?._id && (
						<div className="home__wrapper__landing__split home__wrapper__landing__split--center">
							<button
								className="btn btn--large"
								onClick={() => history.push('/signup')}
								data-aos-delay="1200"
								data-aos-duration="500"
								data-aos="zoom-in-up"
							>
								Get Started
							</button>
						</div>
					)}
				</div>

				<section className="home__wrapper__showcase">
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--discover">
						<header data-aos="fade" data-aos-duration="750">
							<RiCompassDiscoverFill />
							<h2>Discover new tastes</h2>
						</header>
						<article data-aos="zoom-in-up" data-aos-duration="750">
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Voluptatibus ratione facilis dolorum cupiditate rem enim non?
							</p>
						</article>
					</div>
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--reverse home__wrapper__showcase__item--search">
						<article data-aos="zoom-in-up" data-aos-duration="750">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
								dolorum voluptate sapiente.
							</p>
						</article>
						<header data-aos="fade" data-aos-duration="750">
							<AiOutlineSearch />
							<h2>Search for a dish</h2>
						</header>
					</div>
					<div className="home__wrapper__showcase__item home__wrapper__showcase__item--features">
						<div className="split">
							<header data-aos="fade" data-aos-duration="750">
								<BiUserPlus />
								<h2>Follow your friends</h2>
							</header>
							<article data-aos="zoom-in-up" data-aos-duration="750">
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Atque placeat rerum error consectetur minus nulla ad.
								</p>
							</article>
						</div>

						<div className="split">
							<header data-aos="fade" data-aos-duration="750">
								<AiOutlineShareAlt />
								<h2>Share your own creations</h2>
							</header>
							<article data-aos="zoom-in-up" data-aos-duration="750">
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
