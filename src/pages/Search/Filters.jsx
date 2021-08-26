import React from 'react'

const Filters = () => {
	return (
		<section className="search__filters">
			<div className="search__filters__sort">
				<select aria-label="Search for" onChange={(e) => {}}>
					<option value="recipes">recipes</option>
					<option value="people">people</option>
				</select>
			</div>
		</section>
	)
}

export default Filters
