import React from 'react'
import { useHistory } from 'react-router'

const Pages = ({ setFilters, filters }) => {
	const history = useHistory()

	let page_arr = []
	for (
		let i = filters.page - 2 < 1 ? 1 : filters.page - 2;
		i < filters.page + 3 && i <= filters.pageCount;
		i++
	) {
		page_arr.push(i)
	}
	return (
		<>
			{page_arr.map((page, idx) =>
				page === filters.page ? (
					<span
						style={{ cursor: 'default' }}
						key={idx}
						aria-label={`Showing results for current page`}
						className="btn btn--no-bg btn--page btn--page-selected"
					>
						{page}
					</span>
				) : (
					<button
						key={idx}
						aria-label={`Show results for page ${page}`}
						className="btn btn--no-bg btn--page"
						onClick={() => {
							setFilters({ ...filters, page: page })
						}}
					>
						{page}
					</button>
				)
			)}
		</>
	)
}

export default Pages
