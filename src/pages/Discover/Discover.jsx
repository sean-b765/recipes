import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { getDiscover, getPostsWithTags } from '../../_actions/post'
import Filters from '../../components/Filters'
import { formatFilters } from '../../util/util'
import Item from '../../components/RecipeCard/Item'
import Pages from './Pages'
import Tags from '../../components/Tags'

import Spinner from '../../components/Spinner'

const Discover = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()

	const [filters, setFilters] = useState({
		sort: 'rating',
		period: 'alltime',
		serves: [1, 12],
		prepTime: [0, 120],
		cookTime: [0, 240],
		tags: [],
		page: 1,
		perPage: 25,
		pageCount: 1,
		query: '',
	})

	const [loading, setLoading] = useState(false)

	const posts = useSelector((state) => state.post.all)

	// on location change
	useEffect(() => {
		let isMounted = true

		// get tags from URL
		let tags = []

		try {
			tags = location.search.replace('?tags=', '')

			if (tags?.length !== 0) {
				tags = tags.split(',')
				filters.tags = tags
			}
		} catch (err) {
			// error - url params are not correct
		}

		// get with tags
		if (filters?.tags?.length >= 1) {
			getPostsWithTags(formatFilters(filters))
				.then((res) => {
					if (isMounted)
						setFilters({ ...filters, pageCount: Number(res?.pages || 1) })

					dispatch({
						type: 'POST/SET_ALL',
						payload: res.result,
					})
				})
				.catch((err) => {})
			// get discover page
		} else {
			getDiscover(formatFilters(filters, filters.query)).then((res) => {
				if (isMounted)
					setFilters({ ...filters, pageCount: Number(res?.pages || 1) })

				dispatch({
					type: 'POST/SET_ALL',
					payload: res?.result || null,
				})
			})
		}

		return () => {
			isMounted = false
		}
	}, [location])

	const handleSetFilters = (value) => {
		setFilters(value)

		if (value?.tags?.length !== 0) {
			// tags
			getPostsWithTags(formatFilters(value, value.query)).then((res) => {
				setFilters({ ...value, pageCount: Number(res.pages) || 0 })

				dispatch({
					type: 'POST/SET_ALL',
					payload: res.result,
				})
			})
		} else {
			// discover

			getDiscover(formatFilters(value, value.query)).then((res) => {
				setFilters({ ...value, pageCount: Number(res.pages) || 0 })

				dispatch({
					type: 'POST/SET_ALL',
					payload: res.result,
				})
			})
		}
	}

	return (
		<motion.section
			className="discover"
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Spinner showing={loading} />

			<header className="discover__header">
				<h1 data-aos="zoom-out">
					<span>discover</span> a taste
				</h1>
				<Filters
					filters={filters}
					setFilters={(newVal) => {
						console.log(newVal)
						handleSetFilters(newVal)
					}}
					setFilterState={(newVal) => {
						setFilters(newVal)
					}}
				/>
				<Tags
					filters={filters}
					setFilters={(val) => {
						setFilters(val)

						history.push(`/discover?tags=${val?.tags?.join(',')}`)
					}}
					onClickTag={(_tag) => {
						const tags = filters?.tags?.filter((tag) => tag !== _tag)

						setFilters({ ...filters, tags })

						if (tags?.length === 0) {
							history.push('/discover')
						} else {
							history.push(`/discover?tags=${tags.join(',')}`)
						}
					}}
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
					<div>
						<Pages setFilters={handleSetFilters} filters={filters} />
					</div>
					<p>{filters.pageCount} pages total</p>
				</div>
				<div className="discover__pagination__perPage">
					<label className="filters__perPage">
						<select
							name="perPage"
							aria-label="Amount of items per page"
							onChange={(e) =>
								handleSetFilters({
									...filters,
									perPage: Number(e.target.value),
								})
							}
						>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
						<p>Items per page</p>
					</label>
				</div>
			</footer>
		</motion.section>
	)
}

export default Discover
