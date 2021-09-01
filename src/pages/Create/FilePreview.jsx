import React from 'react'

const FilePreview = ({ files, setFiles }) => {
	const handleClick = (e, file) => {
		e.preventDefault()

		const _files = []
		files.map((f) => {
			if (f !== file) _files.push(f)
		})

		setFiles(_files)
	}

	return (
		<section className="create__filepreview">
			{files.map((file, index) => (
				<div
					className="create__filepreview__file"
					key={index}
					onContextMenu={(e) => handleClick(e, file)}
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
