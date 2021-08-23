import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { createStore } from 'redux'
import App from './App'
import reducers from './_reducers/index'

const store = createStore(reducers)

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
