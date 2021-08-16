import { Route, Switch, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Discover from './pages/Discover/Discover'
import { AnimatePresence } from 'framer-motion'

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
						<Route path="/search" exact></Route>
					</Switch>
				</AnimatePresence>
			</main>
			<Footer />
		</>
	)
}

export default App
