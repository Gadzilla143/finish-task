import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/index'
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("root")
)