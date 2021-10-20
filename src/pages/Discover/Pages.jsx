import React from 'react'

const Pages = ({ setFilters, filters }) => {
	let page_arr = []
	for (
		let i = filters.page - 4 < 0 ? 0 : filters.page - 4;
		i < filters.page + 4;
		i++
	) {
		page_arr.push(i)
	}
	return (
		<>
			{page_arr.map((page) =>
				page === filters.page ? (
					<span
						aria-label={`Showing results for current page`}
						className="btn btn--no-bg btn--page btn--page-selected"
					>
						{page}
					</span>
				) : (
					<button
						aria-label={`Show results for page ${page}`}
						className="btn btn--no-bg btn--page"
					>
						{page}
					</button>
				)
			)}
		</>
	)
}

export default Pages
