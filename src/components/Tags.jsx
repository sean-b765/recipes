import React, { useState } from 'react'

const Tags = ({ filters, setFilters, onClickTag }) => {
	const [tag, setTag] = useState('')

	return (
		<div className="discover__header__tags">
			<form
				onSubmit={(e) => {
					e.preventDefault()

					if (tag && !filters?.tags?.includes(tag)) {
						setFilters({ ...filters, tags: [...filters?.tags, tag] })
						setTag('')
					}
				}}
			>
				<input
					value={tag}
					onChange={(e) => setTag(e.target.value)}
					type="text"
					className="custom_input custom_input--border"
					placeholder="Add tags..."
				/>
				<input
					type="submit"
					value="+"
					className="btn btn--solid btn--solid-blue"
				/>
			</form>
			<div>
				{filters?.tags?.map((tag, idx) => (
					<button
						className="btn btn--no-bg btn--tag"
						onClick={() => onClickTag(tag)}
						key={idx}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	)
}

export default Tags
