import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { FiUpload } from 'react-icons/fi'
import FilePreview from './FilePreview'
import Preview from './Preview'
import ListIngredients from './ListIngredients'
import ListTags from './ListTags'
import { connect } from 'react-redux'
import { createRef } from 'react'
import { editPost } from '../../_actions/post'
import { bufferToBase64 } from '../../util/util'
import { withRouter } from 'react-router'

class Create extends Component {
	constructor() {
		super()

		// As opposed to Create.jsx we need to
		//  know the _id of the existing post
		this.state = {
			formData: {
				_id: '',
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
			posted: false,
		}

		this.ingredientsRef = createRef()
		this.tagsRef = createRef()

		this.handleFiles = async (e) => {
			const _files = e.target.files

			let filesToAdd = []

			for (let i = 0; i < _files?.length; i++) {
				let file = _files[i]

				const name = `image-${this.state.files.length + 1 + i}`

				// Don't allow upload if more than 10 MB
				if (file.size >= 10 * 1000 * 1000) return

				// Only allow images
				if (!file.type.includes('image')) return

				// Get buffer from File.arrayBuffer method
				let bfr = await file.arrayBuffer()

				filesToAdd.push({
					name,
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
			if (
				value.length > 20 ||
				this.state.formData.ingredients.includes(value) ||
				!value
			)
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

			if (
				value.length > 20 ||
				this.state.formData.tags.includes(value) ||
				!value
			)
				return

			this.setState({
				...this.state,
				formData: {
					...this.state.formData,
					tags: [...this.state.formData.tags, value],
				},
			})

			this.tagsRef.current.value = ''
		}

		this.submit = async () => {
			try {
				const result = await editPost(
					{
						formData: {
							title: this.state?.formData?.title,
							serves: String(this.state?.formData?.serves),
							cookTime: String(this.state?.formData?.cookTime),
							prepTime: String(this.state?.formData?.prepTime),
							ingredients: this.state?.formData?.ingredients,
							tags: this.state?.formData?.tags,
							content: this.state?.formData?.content,
							method: this.state?.formData?.method,
						},
						files: this.state?.files,
					},
					this.state?.formData?._id
				)

				console.log(result)

				if (!result?.post?.userFriendlyId) return

				this.setState({ ...this.state, posted: true })

				// remove event listener which sets local storage
				window.removeEventListener('beforeunload', this.setStorage)

				// remove from storage
				localStorage.removeItem('edit_form')

				// set redux editForm as default
				this.props.setStore({ formData: null, files: [] })

				// redirect to post page
				this.props.history.push(`/recipe/${result?.post?.userFriendlyId}`)
			} catch (err) {
				console.log(err)
			}
		}

		this.setStorage = () => {
			localStorage.setItem(
				'edit_form',
				JSON.stringify({
					formData: this.state?.formData,
					files: this.state?.files,
				})
			)
		}
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.setStorage)
		this.props.formData && this.setState(this.props)
	}

	componentWillUnmount() {
		if (this.state?.posted) return

		window.removeEventListener('beforeunload', this.setStorage)
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
					<h1>edit a recipe</h1>
					<button className="btn btn--pill">View Formatting Help</button>
				</header>

				<div className="create__container">
					<form
						action=""
						onSubmit={(e) => {
							e.preventDefault()
							this.submit()
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
								onKeyDownCapture={(e) =>
									e.key === 'Enter' && e.preventDefault()
								}
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
								onKeyDownCapture={(e) =>
									e.key === 'Enter' && e.preventDefault()
								}
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
								onKeyDownCapture={(e) =>
									e.key === 'Enter' && e.preventDefault()
								}
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
								onKeyDownCapture={(e) =>
									e.key === 'Enter' && e.preventDefault()
								}
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
							<button className="btn btn--pill btn--solid-blue">
								<FiUpload style={{ margin: '0 10px 0 0' }} /> Upload
							</button>
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

						<input
							type="submit"
							className="btn btn--pill"
							value="Submit Edit"
						/>
					</form>

					<FilePreview
						files={this.state.files}
						onFilesChange={(files) => {
							this.setState({ ...this.state, files })
						}}
					/>
				</div>

				<Preview state={this.state} />
			</motion.section>
		)
	}
}

// On mount get state of redux and set props
//  if redux has no editForm set, check localStorage
const mapStateToProps = (state) => {
	if (
		state?.editForm?.formData === null ||
		state?.editForm?.files?.length === 0
	) {
		let _form = JSON.parse(localStorage.getItem('edit_form'))

		state = {
			editForm: _form,
		}
	}

	return {
		formData: state?.editForm?.formData || null,
		files: state?.editForm?.files || [],
	}
}

// On unmount set the state of redux with component state
const mapDispatchToProps = (dispatch) => {
	return {
		setStore: (newState) =>
			dispatch({ type: 'EDIT_FORM/SET', payload: { ...newState } }),
	}
}

// Connect helps by implementing redux store in a class component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))
