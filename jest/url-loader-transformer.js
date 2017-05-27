/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path')
const basepath = path.resolve(__dirname, 'src')

// eslint-disable-next-line immutable/no-mutation
module.exports = {
  process (src, filename) {
    return 'module.exports = ' + JSON.stringify(path.relative(basepath, filename))
  },
  getCacheKey (src, filename) {
    return path.basename(filename)
  }
}
