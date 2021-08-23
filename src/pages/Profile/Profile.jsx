import { motion } from 'framer-motion'
import React from 'react'
import { AiOutlineMessage, AiOutlineUserAdd } from 'react-icons/ai'
import { MdBlock } from 'react-icons/md'

const Profile = ({ id }) => {
	// get the profile via id on mount (useEffect)

	const profile = {
		id: 1,
		name: 'Jane Cook',
		avatar:
			'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
		bio: 'I love family, friends, Christmas and cooking for all of the above!',
		followers: [
			{
				id: 2,
				name: 'Bathilda Baker',
			},
		],
		following: [
			{
				id: 2,
				name: 'Bathilda Baker',
			},
		],
		posts: [
			{
				id: 0,
				title: 'Chicken Teriyaki',
				image_url:
					'https://www.lecremedelacrumb.com/wp-content/uploads/2018/03/baked-teriyaki-chicken-102.jpg',
				prep_time: 30,
				serves: 4,
			},
			{
				id: 1,
				title: 'Pumpkin Pasties',
				image_url:
					'https://theloopywhisk.com/wp-content/uploads/2018/10/Pumpkin-Flaky-Pastries_730px-featured-500x500.jpg',
				prep_time: 120,
				serves: 4,
			},
		],
		score: 90,
	}

	return (
		<motion.section className="profile">
			<div className="profile__card">
				<header className="profile__card__header">
					<div className="profile__card__header__avatar">
						<img src={profile.avatar} alt={`Picture of ${profile.name}`} />
					</div>
					<div className="profile__card__header__details">
						<h1>{profile.name}</h1>
						<div className="profile__card__header__details__stats">
							<p>{profile.score} Rating</p>
							<p>{profile.followers.length} Followers</p>
							<p>{profile.following.length} Following</p>
						</div>
					</div>
				</header>

				<section className="profile__card__actions">
					<button className="btn btn--pill" aria-label="Follow this user">
						<AiOutlineUserAdd />
						Follow
					</button>
					<button className="btn btn--pill" aria-label="Message this user">
						<AiOutlineMessage />
						Message
					</button>
					<button className="btn btn--no-bg" aria-label="Block this user">
						<MdBlock />
						Block
					</button>
				</section>

				<article className="profile__card__bio" aria-label="Profile bio">
					{profile.bio}
				</article>
			</div>

			<section className="profile__activity"></section>
		</motion.section>
	)
}

export default Profile
