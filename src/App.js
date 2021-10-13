import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Discover from './pages/Discover/Discover'
import Auth from './pages/Auth/Auth'
import Search from './pages/Search/Search'
import Profile from './pages/Profile/Profile'
import Recipe from './pages/Recipe/Recipe'
import Create from './pages/Create/Create'
import Edit from './pages/Create/Edit'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
