import { motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import FilePreview from './FilePreview'

const Create = () => {
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		serves: '',
		prep_time: '',
		cook_time: '',
	})

	const [files, setFiles] = useState([])

	const bufferToBase64 = (buffer) => {
		var binary = ''
		var bytes = new Uint8Array(buffer)
		var len = bytes.byteLength
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i])
		}
		return window.btoa(binary)
	}

	const handleFiles = async (e) => {
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

		setFiles([...files, ...filesToAdd])
	}

	return (
		<motion.section
			transition={{ duration: 0.25 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="create"
		>
			<div className="create__container">
				<form
					action=""
					onSubmit={(e) => {
						e.preventDefault()
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
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</label>

					<label htmlFor="serves" className="label">
						<input
							type="text"
							className="custom_input custom_input--underline"
							id="serves"
							placeholder="Serves"
							value={formData.serves}
							onChange={(e) =>
								setFormData({ ...formData, serves: e.target.value })
							}
						/>
					</label>

					<label htmlFor="prepTime" className="label">
						<input
							type="text"
							id="prepTime"
							placeholder="Prep. Time"
							className="custom_input custom_input--underline"
							value={formData.prep_time}
							onChange={(e) =>
								setFormData({ ...formData, prep_time: e.target.value })
							}
						/>
					</label>

					<label htmlFor="cookTime" className="label">
						<input
							type="text"
							id="cookTime"
							placeholder="Cook Time"
							className="custom_input custom_input--underline"
							value={formData.cook_time}
							onChange={(e) =>
								setFormData({ ...formData, cook_time: e.target.value })
							}
						/>
					</label>

					<label htmlFor="content" className="label label--content">
						<textarea
							cols="30"
							rows="10"
							name="content"
							id="content"
							placeholder="Recipe content..."
							value={formData.content}
							onChange={(e) =>
								setFormData({ ...formData, content: e.target.value })
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
							onChange={handleFiles}
						/>
					</label>

					<input type="submit" className="btn btn--pill" value="Post" />
				</form>

				<FilePreview files={files} setFiles={setFiles} />
			</div>
		</motion.section>
	)
}

export default Create
