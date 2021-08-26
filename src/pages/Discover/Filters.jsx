import React from 'react'

const Filters = () => {
	return (
		<section className="discover__filters">
			<div className="discover__filters__sort">
				<select aria-label="Sort by" onChange={(e) => {}}>
					<option value="rating">rating</option>
					<option value="new">new</option>
				</select>
			</div>
			<div className="discover__filters__period">
				<select aria-label="Sort with date filters" onChange={(e) => {}}>
					<option value="alltime">all time</option>
					<option value="year">1 year</option>
					<option value="halfyear">6 months</option>
					<option value="month">1 month</option>
					<option value="week">1 week</option>
					<option value="day">today</option>
				</select>
			</div>
		</section>
	)
}

export default Filters
