import React, { useState } from 'react'

const FilePreview = ({ files, onFilesChange }) => {
	const handleClick = (e, file) => {
		e.preventDefault()

		const _files = []
		files.map((f) => {
			if (f !== file) _files.push(f)
		})

		onFilesChange(_files)
	}

	const [open, setOpen] = useState(false)

	return (
		<section className="create__filepreview">
			<div className="create__filepreview__modal create__filepreview__modal--showing">
				<label htmlFor="refName">
					Give a name to this image <span>*</span>
				</label>
				<input
					id="refName"
					name="refName"
					type="text"
					placeholder="Reference name"
					className="custom_input custom_input--underline"
				/>
				<span>
					* A reference name makes it possible to position an image within your
					recipe method/information
				</span>
			</div>
			{files.map((file, index) => (
				<div
					className="create__filepreview__file"
					key={index}
					onContextMenu={(e) => handleClick(e, file)}
					onClick={() => {
						// alter the 'name' field of this file object. used to reference in markdown content
						const _files = files.map((f) => {
							if (f === file) f = { ...f, name: 'test' }
							return f
						})
						console.log(_files)
					}}
				>
					<header>
						{file.name.substring(0, 15)}
						{file.name.length > 15 && '...'}
					</header>
					<img src={file.base64} alt={file.name} />
				</div>
			))}
		</section>
	)
}

export default FilePreview
