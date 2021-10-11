import React, { useEffect, useRef, useState } from 'react'

const FilePreview = ({ files, onFilesChange }) => {
	const inputRef = useRef()
	const [open, setOpen] = useState({ open: false, file: null })

	const handleClick = (e, file) => {
		e.preventDefault()

		const _files = []
		files.map((f) => {
			if (f !== file) _files.push(f)
		})

		onFilesChange(_files)
	}

	useEffect(() => {
		if (open) {
			inputRef.current.focus()
			inputRef.current.select(inputRef.current.value.length)
		}
	}, [open])

	return (
		<section className="create__filepreview">
			<div
				className="create__filepreview__modal create__filepreview__modal--showing"
				style={{ display: open.open && open.file ? 'flex' : 'none' }}
			>
				<label htmlFor="refName">
					Give a name to this image <span>*</span>
				</label>
				<div>
					<input
						id="refName"
						ref={inputRef}
						name="refName"
						type="text"
						placeholder="Reference name"
						className="custom_input custom_input--underline"
						onKeyPress={(e) => {
							if (e.key !== 'Enter' && e.key !== 'NumpadReturn') return
							const _files = files.map((f) => {
								if (f === open.file) f = { ...f, name: e.target.value }
								return f
							})

							onFilesChange(_files)

							setOpen({ open: false, file: null })
						}}
					/>
					<button
						className="btn"
						onClick={() => {
							if (!open.open && !open.file) return

							const _files = files.map((f) => {
								if (f === open.file) f = { ...f, name: inputRef.current.value }
								return f
							})

							onFilesChange(_files)

							setOpen({ open: false, file: null })
							inputRef.current.value = ''
						}}
					>
						Save
					</button>
				</div>
				<span>
					* A reference name makes it easier to position an image within your
					recipe content
				</span>
			</div>
			{files.map((file, index) => (
				<button
					aria-label="Rename this image"
					className="create__filepreview__file"
					key={index}
					onContextMenu={(e) => handleClick(e, file)}
					onClick={() => {
						// alter the 'name' field of this file object. used to reference in markdown content
						inputRef.current.value = file.name
						setOpen({ open: true, file: file })
					}}
				>
					<header>
						{file.name.substring(0, 15)}
						{file.name.length > 15 && '...'}
					</header>
					<img src={file.base64} alt={file.name} />
				</button>
			))}
		</section>
	)
}

export default FilePreview
