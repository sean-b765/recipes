import React, { useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Range as _range, createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { isMobile } from 'react-device-detect'

const Range = createSliderWithTooltip(_range)

const Filters = ({ filters, setFilters, setFilterState }) => {
	return (
		<section className="filters">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					setFilters(filters)
				}}
			>
				<div>
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
							onChange={(e) =>
								setFilters({ ...filters, period: e.target.value })
							}
						>
							<option value="alltime">all time</option>
							<option value="year">1 year</option>
							<option value="halfyear">6 months</option>
							<option value="month">1 month</option>
							<option value="week">1 week</option>
							<option value="day">today</option>
						</select>
					</label>
				</div>

				<label>
					<p style={{ marginTop: '0.5rem' }}>Serves</p>
					<Range
						style={{ margin: '0.4rem 0 1rem 0' }}
						value={filters.serves}
						onChange={(value) => setFilterState({ ...filters, serves: value })}
						onAfterChange={(v) => setFilters({ ...filters, serves: v })}
						max={12}
						min={1}
						defaultValue={[1, 12]}
						tipFormatter={(value) => `${value}`}
					/>
				</label>

				<label>
					<p style={{ marginTop: '0.5rem' }}>
						Cook Time<span>(mins)</span>
					</p>

					{!isMobile && (
						<Range
							style={{ margin: '0.4rem 0 1rem 0' }}
							value={filters.cookTime}
							onChange={(value) =>
								setFilterState({ ...filters, cookTime: value })
							}
							onAfterChange={(value) =>
								setFilters({ ...filters, cookTime: value })
							}
							max={240}
							min={0}
							defaultValue={[0, 240]}
							tipFormatter={(value) => `${value}min`}
						/>
					)}

					{isMobile && (
						<>
							<input
								placeholder="Min."
								type="number"
								name="cookTimeLow"
								id="cookTimeLow"
								className="custom_input custom_input--num"
								min={0}
								max={240}
								onChange={(e) => {
									setFilterState({
										...filters,
										cookTime: [e.target.value, filters.cookTime[1]],
									})
								}}
							/>

							<input
								type="number"
								placeholder="Max."
								name="cookTimeHigh"
								id="cookTimeHigh"
								className="custom_input custom_input--num"
								min={0}
								max={240}
								onChange={(e) => {
									setFilterState({
										...filters,
										cookTime: [filters.cookTime[0], e.target.value],
									})
								}}
							/>
						</>
					)}
				</label>

				<label>
					<p style={{ marginTop: '0.5rem' }}>
						Prep. Time <span>(mins)</span>
					</p>

					{!isMobile && (
						<Range
							style={{ margin: '0.4rem 0 1rem 0' }}
							value={filters.prepTime}
							onChange={(value) =>
								setFilterState({ ...filters, prepTime: value })
							}
							onAfterChange={(value) =>
								setFilters({ ...filters, prepTime: value })
							}
							max={120}
							min={0}
							defaultValue={[0, 120]}
							tipFormatter={(value) => `${value}min`}
						/>
					)}

					{isMobile && (
						<>
							<input
								placeholder="Min."
								type="number"
								name="prepTimeLow"
								id="prepTimeLow"
								className="custom_input custom_input--num"
								min={0}
								max={240}
								onChange={(e) => {
									setFilterState({
										...filters,
										prepTime: [e.target.value, filters.prepTime[1]],
									})
								}}
							/>

							<input
								type="number"
								placeholder="Max."
								name="prepTimeHigh"
								id="prepTimeHigh"
								className="custom_input custom_input--num"
								min={0}
								max={240}
								onChange={(e) => {
									setFilterState({
										...filters,
										prepTime: [filters.prepTime[0], e.target.value],
									})
								}}
							/>
						</>
					)}
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
						<AiOutlineSearch />
						<input type="submit" aria-label="Search..." value="" />
					</label>
				</label>
			</form>
		</section>
	)
}

export default Filters
