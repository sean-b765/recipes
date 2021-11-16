import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Discover from './pages/Discover/Discover'
import Auth from './pages/Auth/Auth'
import Profile from './pages/Profile/Profile'
import Recipe from './pages/Recipe/Recipe'
import Create from './pages/Create/Create'
import Edit from './pages/Create/Edit'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Settings from './pages/Settings/Settings'
import Spinner from './components/Spinner'

import emitter from './_services/emitter'

function App() {
	const dispatch = useDispatch()
	const location = useLocation()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// Initialize the AUTH user state from browser's localstorage
		dispatch({
			type: 'AUTH/INIT',
			payload: JSON.parse(localStorage.getItem('profile')),
		})

		// Listen to axios events via our emitter to handle request/response event
		emitter.on('REQUEST_START', (e) => {
			setLoading(true)
		})
		emitter.on('RESPONSE_FINISH', (e) => {
			setLoading(false)
		})
		emitter.on('RESPONSE_ERROR', (e) => {
			setLoading(false)
		})

		return () => {
			emitter.off('RESPONSE_FINISH')
			emitter.off('RESPONSE_ERROR')
			emitter.off('REQUEST_START')
		}
	}, [])

	return (
		<>
			<Navbar />
			<main className="container">
				<Spinner showing={loading} />
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/discover" exact>
							<Discover />
						</Route>
						<Route path="/post" exact>
							<Create />
						</Route>
						<Route path="/edit" exact>
							<Edit />
						</Route>

						<Route path="/login">
							<Auth />
						</Route>
						<Route path="/signup">
							<Auth />
						</Route>

						<Route path="/settings">
							<Settings />
						</Route>

						<Route
							path="/profiles/:id"
							render={(p) => <Profile id={p.match.params.id} />}
						></Route>
						<Route
							path="/recipe/:id"
							render={(p) => <Recipe id={p.match.params.id} />}
						></Route>
					</Switch>
				</AnimatePresence>
			</main>
			<Footer />
		</>
	)
}

export default App
