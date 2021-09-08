import { Route, Switch, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Discover from './pages/Discover/Discover'
import { AnimatePresence } from 'framer-motion'
import Auth from './pages/Auth/Auth'
import Search from './pages/Search/Search'
import Profile from './pages/Profile/Profile'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		// Initialize the AUTH user state from browser's localstorage
		dispatch({
			type: 'AUTH/INIT',
			payload: JSON.parse(localStorage.getItem('profile')),
		})
	}, [])

	return (
		<>
			<Navbar />
			<main className="container">
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/discover" exact>
							<Discover />
						</Route>
						<Route path="/search" exact>
							<Search />
						</Route>

						<Route path="/login">
							<Auth />
						</Route>
						<Route path="/signup">
							<Auth />
						</Route>

						<Route
							path="/profiles/:id"
							render={(p) => <Profile id={p.match.params.id} />}
						></Route>
					</Switch>
				</AnimatePresence>
			</main>
			<Footer />
		</>
	)
}

export default App
