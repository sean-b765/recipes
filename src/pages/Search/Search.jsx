import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { getSearch } from '../../_actions/post'
import { formatFilters } from '../../util/util'
import Filters from '../../components/Filters'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../RecipeCard/Item'

const Search = () => {
	const dispatch = useDispatch()
	const posts = useSelector((state) => state.post.all)

	const [filters, setFilters] = useState({
		sort: 'rating',
		period: 'alltime',
		page: 0,
		skip: 0,
	})
	const [terms, setTerms] = useState('')

	useEffect(() => {
		dispatch({ type: 'POST/SET_ALL', payload: [] })
	}, [])

	const search = async () => {
		const { result, message } = await getSearch(formatFilters(filters, terms))
		if (message) return

		dispatch({ type: 'POST/SET_ALL', payload: result })
	}

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
					<Filters filters={filters} setFilters={setFilters} />
				</div>
				<form
					className="search__header__box"
					onSubmit={(e) => {
						e.preventDefault()
						search(e.target.value)
					}}
				>
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search..."
						aria-label="Search query"
						value={terms}
						onChange={(e) => setTerms(e.target.value)}
					/>
					<label htmlFor="search">
						<input type="submit" aria-label="Perform search" value="" />
					</label>
				</form>
			</header>
			<section className="search__grid">
				{posts && posts?.length !== 0 ? (
					posts.map((post, idx) => <Item key={idx} object={post} />)
				) : (
					<h2>Search for a recipe...</h2>
				)}
			</section>
			<footer className="search__pagination"></footer>
		</motion.section>
	)
}

export default Search
