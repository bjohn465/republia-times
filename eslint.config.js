import { default as defaultConfig } from '@epic-web/config/eslint'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import("eslint").Linter.Config} */
export default [...defaultConfig, reactRefresh.configs.vite]
