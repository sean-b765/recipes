import { motion } from 'framer-motion'
import React from 'react'
import Filters from './Filters'

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
				<div>
					<h1 data-aos="zoom-out">
						<span>search</span>
					</h1>
					<Filters />
				</div>
				<form
					className="search__header__box"
					onSubmit={(e) => {
						e.preventDefault()
					}}
				>
					<input
						type="text"
						name="search"
						id="search"
						aria-label="Search terms"
					/>
					<label for="search">
						<input type="submit" aria-label="Perform search" value="" />
					</label>
				</form>
			</header>
			<section className="search__grid">
				{/* {data.map((datum, idx) => (
					<Item key={idx} object={datum} />
				))} */}
			</section>
			<footer className="search__pagination"></footer>
		</motion.section>
	)
}

export default Search
