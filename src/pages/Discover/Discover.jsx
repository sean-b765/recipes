import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscover } from '../../_actions/post'
import Item from '../RecipeCard/Item'
import Filters from './Filters'

const Discover = () => {
	const dispatch = useDispatch()

	const [filters, setFilters] = useState({
		primary: 'rating',
		secondary: 'alltime',
	})

	const posts = useSelector((state) => state.post.all)

	const formatFilters = () => `sort=${filters.primary}&by=${filters.secondary}`

	useEffect(() => {
		getDiscover().then((res) => {
			dispatch({
				type: 'POST/SET_ALL',
				payload: res.result,
			})
		})
	}, [])

	const handleSetFilters = (value) => {
		setFilters(value)
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
				<Filters filters={filters} setFilters={handleSetFilters} />
			</header>
			<section className="discover__grid">
				{posts && posts.map((post, idx) => <Item key={idx} object={post} />)}
			</section>
			<footer className="discover__pagination"></footer>
		</motion.section>
	)
}

export default Discover
