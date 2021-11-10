import React, { useEffect, useState } from 'react'
import { getUserPosts } from '../../_actions/user'
import Item from '../../components/RecipeCard/Item'

const ProfilePosts = ({ profile }) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (!profile?._id) return

		let isMounted = true

		getUserPosts(profile?._id)
			.then((res) => {
				if (isMounted) setPosts([...res.result])
			})
			.catch((err) => {})

		return () => (isMounted = false)
	}, [profile])

	return (
		<>
			{posts.map((post, idx) => (
				<Item delay={idx} object={post} key={idx} isOnProfile={true} />
			))}
		</>
	)
}

export default ProfilePosts
