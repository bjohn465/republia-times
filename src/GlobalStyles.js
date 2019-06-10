// @flow strict-local
import React, { Fragment } from 'react'
import vt323 from './vt323/VT323-Regular.ttf'
import { Global, css } from '@emotion/core'

function GlobalStyles() {
  return (
    <Fragment>
      <Global
        styles={css`
          @font-face {
            font-family: 'VT323-Webfont';
            src: url('${vt323}');
          }
        `}
      />
      <Global
        styles={css`
          html,
          body {
            font-family: 'VT323', 'VT323-Webfont', monospace;
            font-size: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
        `}
      />
    </Fragment>
  )
}

export default GlobalStyles