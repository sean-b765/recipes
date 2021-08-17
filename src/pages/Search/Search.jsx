import { motion } from 'framer-motion'
import React from 'react'

const Search = () => {
	return (
		<motion.section
			className="search"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<header className="search__header">
				<h1 data-aos="zoom-out">
					<span>search</span>
				</h1>
			</header>
			<section className="discover__grid">
				{/* {data.map((datum, idx) => (
					<Item key={idx} object={datum} />
				))} */}
			</section>
			<footer className="discover__pagination"></footer>
		</motion.section>
	)
}

export default Search
