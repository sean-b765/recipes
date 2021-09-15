import React from 'react'

const Filters = ({ filters, setFilters }) => {
	return (
		<section className="filters">
			<div>
				<div className="filters__sort">
					<select
						aria-label="Sort by"
						onChange={(e) =>
							setFilters({ ...filters, primary: e.target.value })
						}
					>
						<option value="rating">rating</option>
						<option value="new">new</option>
					</select>
				</div>
				<div className="filters__period">
					<select
						aria-label="Sort with date filters"
						onChange={(e) =>
							setFilters({ ...filters, secondary: e.target.value })
						}
					>
						<option value="alltime">all time</option>
						<option value="year">1 year</option>
						<option value="halfyear">6 months</option>
						<option value="month">1 month</option>
						<option value="week">1 week</option>
						<option value="day">today</option>
					</select>
				</div>
			</div>
		</section>
	)
}

export default Filters
