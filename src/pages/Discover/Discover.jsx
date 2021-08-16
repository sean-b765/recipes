import { motion } from 'framer-motion'
import React from 'react'
import data from '../../recipes'
import Item from './Item'

const Discover = () => {
	return (
		<motion.section
			className="discover"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<header className="discover__header"></header>
			<section className="discover__grid">
				{data.map((datum, idx) => (
					<Item key={idx} object={datum} />
				))}
			</section>
			<footer className="discover__pagination"></footer>
		</motion.section>
	)
}

export default Discover
