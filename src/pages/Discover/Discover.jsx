import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscover } from '../../_actions/post'
import Filters from '../../components/Filters'
import { formatFilters } from '../../util/util'
import Item from '../../components/RecipeCard/Item'
import Pages from './Pages'

const Discover = () => {
	const dispatch = useDispatch()

	const [filters, setFilters] = useState({
		sort: 'rating',
		period: 'alltime',
		serves: [1, 12],
		prepTime: [1, 120],
		cookTime: [1, 240],
		page: 0,
		perPage: 25,
		query: '',
	})

	const posts = useSelector((state) => state.post.all)

	useEffect(() => {
		getDiscover(
			filters.query
				? formatFilters(filters, filters.query)
				: formatFilters(filters)
		).then((res) => {
			dispatch({
				type: 'POST/SET_ALL',
				payload: res.result,
			})
		})
	}, [])

	const handleSetFilters = (value) => {
		setFilters(value)

		console.log(value)

		getDiscover(formatFilters(value, filters.query)).then((res) => {
			dispatch({
				type: 'POST/SET_ALL',
				payload: res.result,
			})
		})
	}

	return (
		<motion.section
			className="discover"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<header className="discover__header">
				<h1 data-aos="zoom-out">
					<span>discover</span> a taste
				</h1>
				<Filters
					filters={filters}
					setFilters={handleSetFilters}
					setFilterState={setFilters}
				/>
			</header>
			<section className="discover__grid">
				{posts &&
					posts.map((post, idx) => (
						<Item delay={idx} key={idx} object={post} />
					))}
			</section>
			<footer className="discover__pagination">
				<div className="discover__pagination__pages">
					<Pages setFilters={setFilters} filters={filters} />
				</div>
				<div className="discover__pagination__perPage">
					<form onSubmit={(e) => e.preventDefault()}>
						<select
							name="perPage"
							aria-label="Amount of items per page"
							onChange={(e) =>
								setFilters({ ...filters, perPage: Number(e.target.value) })
							}
						>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</form>
				</div>
			</footer>
		</motion.section>
	)
}

export default Discover
