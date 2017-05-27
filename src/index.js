// @flow
import React from 'react'
import { render } from 'react-dom'
import styles from './index.css'
import outputRevision from './util/output-revision'
import RepubliaTimes from './republia-times'

outputRevision()

const root = document.createElement('div')
root.classList.add(styles.root)
document.body && document.body.appendChild(root)

render(<RepubliaTimes />, root)
