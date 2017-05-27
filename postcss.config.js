/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path')

// eslint-disable-next-line immutable/no-mutation
module.exports = {
  plugins: {
    'postcss-import': null,
    'postcss-url': {
      url (asset, dir) {
        const relative = path.posix.normalize(
          path.relative(dir.to, asset.absolutePath)
        )
        return `./${relative}${asset.search}${asset.hash}`
      }
    },
    'postcss-cssnext': {
      // browsers pulled from browerslist in package.json
    },
    'postcss-browser-reporter': null,
    'postcss-reporter': null
  }
}
