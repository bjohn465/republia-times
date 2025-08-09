import { invariant } from './invariant.ts'
import { getTemplate } from './templates.ts'

const root = document.getElementById('root')
invariant(root, 'Unable to find root element')
root.innerHTML = ''
root.appendChild(getTemplate('morning'))
