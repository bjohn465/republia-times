// @flow strict-local
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import t from 'format-message'
import underscored_crc32 from 'format-message-generate-id/underscored_crc32'
import locales from './locales'
import RepubliaTimes from './RepubliaTimes'
// import * as serviceWorker from './serviceWorker'

t.setup({
  generateId: underscored_crc32,
  locale: 'en',
  missingTranslation: 'ignore',
  translations: locales,
})

const rootElement = document.createElement('div')
document.body && document.body.appendChild(rootElement)

ReactDOM.render(
  <StrictMode>
    <RepubliaTimes />
  </StrictMode>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
