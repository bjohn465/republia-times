/* eslint-disable
  flowtype/require-valid-file-annotation,
  immutable/no-mutation  */

// React 16 requires requestAnimationFrame to be defined
window.requestAnimationFrame = (fn) => { setTimeout(fn, 0) }
window.cancelAnimationFrame = () => {}
