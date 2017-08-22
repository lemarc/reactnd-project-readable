import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import store from './utils/store'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'))
registerServiceWorker()
