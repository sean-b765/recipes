import React from 'react'
import marked from 'marked'

const Markdown = ({ content, className }) => {
	let text = marked.parse(content || '')

	/* 
    Since the title is reserved for h1, only use h2s and lower
      however if people have lots of nested headings (unlikely),
      it may seem off for the h6's.
    Ultimately accessibility is a more pressing concern
  */
	for (let i = 5; i > 0; i--) {
		const regex = `h${i}`

		text = text.replace(new RegExp(regex), `h${i + 1}`)
	}

	return (
		<div className={className} dangerouslySetInnerHTML={{ __html: text }}></div>
	)
}

export default Markdown
