import { Route, Switch, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Discover from './pages/Discover/Discover'
import { AnimatePresence } from 'framer-motion'
import Auth from './pages/Auth/Auth'
import Search from './pages/Search/Search'

function App() {
	const location = useLocation()

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
					</Switch>
				</AnimatePresence>
			</main>
			<Footer />
		</>
	)
}

export default App
