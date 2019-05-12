// @flow strict
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import RepubliaTimes from './RepubliaTimes'
// import * as serviceWorker from './serviceWorker'

const rootElement = document.createElement('div')
document.body && document.body.appendChild(rootElement)

ReactDOM.render(<RepubliaTimes />, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
