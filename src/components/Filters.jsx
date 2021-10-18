import React from 'react'

const Filters = ({ filters, setFilters, setFilterState }) => {
	return (
		<section className="filters">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					setFilters(filters)
				}}
			>
				<label className="filters__sort" htmlFor="by">
					<select
						name="by"
						aria-label="Sort by"
						onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
					>
						<option value="rating">rating</option>
						<option value="new">new</option>
					</select>
				</label>
				<label className="filters__period" htmlFor="sort">
					<select
						name="sort"
						aria-label="Sort with date filters"
						onChange={(e) => setFilters({ ...filters, period: e.target.value })}
					>
						<option value="alltime">all time</option>
						<option value="year">1 year</option>
						<option value="halfyear">6 months</option>
						<option value="month">1 month</option>
						<option value="week">1 week</option>
						<option value="day">today</option>
					</select>
				</label>

				<label htmlFor="search" className="discover__header__search">
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search..."
						aria-label="Search query"
						value={filters.query}
						onChange={(e) =>
							setFilterState({ ...filters, query: e.target.value })
						}
					/>
					<label htmlFor="search" aria-label="Search...">
						<input type="submit" aria-label="Search..." value="" />
					</label>
				</label>
			</form>
		</section>
	)
}

export default Filters
