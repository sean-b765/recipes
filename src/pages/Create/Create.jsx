import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { FiUpload } from 'react-icons/fi'
import FilePreview from './FilePreview'
import Preview from './Preview'
import ListIngredients from './ListIngredients'
import ListTags from './ListTags'
import { connect } from 'react-redux'
import { createRef } from 'react'
import { createPost } from '../../_actions/post'
import { bufferToBase64 } from '../../util/util'

class Create extends Component {
	constructor() {
		super()

		this.state = {
			formData: {
				title: '',
				serves: '',
				prepTime: '',
				cookTime: '',
				ingredients: [],
				tags: [],
				content: '',
				method: '',
			},
			files: [],
		}

		this.ingredientsRef = createRef()
		this.tagsRef = createRef()

		this.handleFiles = async (e) => {
			const _files = e.target.files

			let filesToAdd = []

			for (let i = 0; i < _files?.length; i++) {
				let file = _files[i]

				// Don't allow upload if more than 10 MB
				if (file.size >= 10 * 1000 * 1000) return

				// Only allow images
				if (!file.type.includes('image')) return

				// Get buffer from File.arrayBuffer method
				let bfr = await file.arrayBuffer()

				filesToAdd.push({
					name: file.name,
					type: file.type,
					size: file.size,
					lastModified: file.lastModified,
					base64: `data:${file.type};base64,${bufferToBase64(bfr)}`,
					originalFile: file,
				})
			}

			this.setState({
				...this.state,
				files: [...this.state.files, ...filesToAdd],
			})
		}

		this.addIngredient = () => {
			if (this.state.formData.ingredients.length >= 30) return

			if (!this.ingredientsRef) return

			const { value } = this.ingredientsRef.current
			if (value.length > 20 || this.state.formData.ingredients.includes(value))
				return

			this.setState({
				...this.state,
				formData: {
					...this.state.formData,
					ingredients: [...this.state.formData.ingredients, value],
				},
			})

			this.ingredientsRef.current.value = ''
		}

		this.addTag = () => {
			if (this.state.formData.tags.length >= 6) return

			if (!this.tagsRef) return

			const { value } = this.tagsRef.current
			if (value.length > 20 || this.state.formData.tags.includes(value)) return

			this.setState({
				...this.state,
				formData: {
					...this.state.formData,
					tags: [...this.state.formData.tags, value],
				},
			})

			this.tagsRef.current.value = ''
		}

		this.post = async () => {
			const result = await createPost({
				formData: this.state?.formData,
				files: this.state?.files,
			})
			console.log(result)
		}
	}

	componentDidMount() {
		this.props.formData && this.setState(this.props)
	}

	componentWillUnmount() {
		this.props.setStore(this.state)
	}

	render() {
		return (
			<motion.section
				transition={{ duration: 0.25 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="create"
			>
				<header>
					<h1>create a recipe</h1>
					<ul>
						<li>- Use up to 6 tags to gain a wider audience.</li>
						<li>- Add up to 30 ingredients.</li>
						<li>- Remove a tag or ingredient by clicking on it.</li>
						<li>
							- Upload images and name them to control where they appear in the
							recipe.
						</li>
						<li>
							- Format recipe information and method with markdown syntax.
						</li>
					</ul>
					<button className="btn btn--pill">View Formatting Help</button>
				</header>

				<div className="create__container">
					<form
						action=""
						onSubmit={(e) => {
							e.preventDefault()
							this.post()
						}}
						className="create__form"
					>
						<label htmlFor="title" className="label label--title">
							<input
								className="custom_input custom_input--underline"
								type="text"
								name="title"
								id="title"
								placeholder="Title"
								value={this.state.formData.title}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: { ...this.state.formData, title: e.target.value },
									})
								}
							/>
						</label>

						<label htmlFor="serves" className="label label--serves">
							<input
								type="text"
								className="custom_input custom_input--underline"
								id="serves"
								placeholder="Serves"
								value={this.state.formData.serves}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											serves: e.target.value,
										},
									})
								}
							/>
						</label>

						<label htmlFor="prepTime" className="label label--preptime">
							<input
								type="text"
								id="prepTime"
								placeholder="Prep. Time"
								className="custom_input custom_input--underline"
								value={this.state.formData.prepTime}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											prepTime: e.target.value,
										},
									})
								}
							/>
						</label>

						<label htmlFor="cookTime" className="label label--cooktime">
							<input
								type="text"
								id="cookTime"
								placeholder="Cook Time"
								className="custom_input custom_input--underline"
								value={this.state.formData.cookTime}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											cookTime: e.target.value,
										},
									})
								}
							/>
						</label>

						<label htmlFor="ingredients" className="label label--ingredients">
							<header>
								<input
									type="text"
									name="ingredients"
									id="ingredients"
									placeholder="Add Ingredients..."
									className="custom_input custom_input--underline"
									ref={this.ingredientsRef}
									onKeyPress={(e) => {
										const enterPressed =
											e.key === 'NumpadEnter' || e.key === 'Enter'
										if (!enterPressed) return

										this.addIngredient()
										e.preventDefault()
									}}
								/>
								<button
									className="btn btn--no-bg"
									aria-label="Add this ingredient"
									onClick={() => this.addIngredient()}
								>
									<svg
										stroke="currentColor"
										fill="currentColor"
										strokeWidth="0"
										viewBox="0 0 24 24"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill="none"
											stroke="#ffffff"
											strokeWidth="2"
											d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,18 L12,6 M6,12 L18,12"
										></path>
									</svg>
								</button>
							</header>

							<ListIngredients
								ingredients={this.state.formData.ingredients}
								onClickIngredient={(item) => {
									const newIngredients = this.state.formData.ingredients.filter(
										(_item) => _item !== item
									)

									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											ingredients: newIngredients,
										},
									})
								}}
							/>
						</label>

						<label htmlFor="tags" className="label label--tags">
							<header>
								<input
									type="text"
									name="tags"
									id="tags"
									placeholder="Add Tags..."
									className="custom_input custom_input--underline"
									ref={this.tagsRef}
									onKeyPress={(e) => {
										const enterPressed =
											e.key === 'NumpadEnter' || e.key === 'Enter'
										if (!enterPressed) return

										this.addTag()
										e.preventDefault()
									}}
								/>
								<button
									className="btn btn--no-bg"
									aria-label="Add this tag"
									onClick={() => this.addTag()}
								>
									<svg
										stroke="currentColor"
										fill="currentColor"
										strokeWidth="0"
										viewBox="0 0 24 24"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill="none"
											stroke="#ffffff"
											strokeWidth="2"
											d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,18 L12,6 M6,12 L18,12"
										></path>
									</svg>
								</button>
							</header>
							<ListTags
								tags={this.state.formData.tags}
								onClickTag={(item) => {
									const newTags = this.state.formData.tags.filter(
										(_item) => _item !== item
									)

									this.setState({
										...this.state,
										formData: { ...this.state.formData, tags: newTags },
									})
								}}
							/>
						</label>

						<label htmlFor="content" className="label label--content">
							<textarea
								cols="30"
								rows="10"
								name="content"
								id="content"
								placeholder="Recipe information... allergens, gluten-free, vegan-friendly?"
								value={this.state.formData.content}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											content: e.target.value,
										},
									})
								}
								className="custom_input custom_input--underline"
							></textarea>
						</label>

						<label htmlFor="method" className="label label--method">
							<textarea
								cols="30"
								rows="10"
								name="method"
								id="method"
								placeholder="Recipe method... describe the steps needed to complete this recipe"
								value={this.state.formData.method}
								onChange={(e) =>
									this.setState({
										...this.state,
										formData: {
											...this.state.formData,
											method: e.target.value,
										},
									})
								}
								className="custom_input custom_input--underline"
							></textarea>
						</label>

						<label htmlFor="upload" className="label label--upload">
							<p className="btn btn--pill btn--solid-blue">
								<FiUpload style={{ margin: '0 10px 0 0' }} /> Upload
							</p>
							<input
								type="file"
								multiple
								name="upload"
								id="upload"
								className="custom_input custom_input--underline"
								encType="multipart/form-data"
								style={{ display: 'none' }}
								onChange={this.handleFiles}
							/>
						</label>

						<input type="submit" className="btn btn--pill" value="Post" />
					</form>

					<FilePreview
						files={this.state.files}
						onFilesChange={(files) => {
							this.setState({ ...this.state, files })
						}}
					/>
				</div>

				<Preview formData={this.state.formData} files={this.state.files} />
			</motion.section>
		)
	}
}

// On mount get state of redux and set props
const mapStateToProps = (state) => {
	return {
		formData: state.postForm.formData,
		files: state.postForm.files,
	}
}

// On unmount set the state of redux with component state
const mapDispatchToProps = (dispatch) => {
	return {
		setStore: (newState) =>
			dispatch({ type: 'POST_FORM/SET', payload: { ...newState } }),
	}
}

// Connect helps by implementing redux store in a class component
export default connect(mapStateToProps, mapDispatchToProps)(Create)
