// @flow strict-local
import React from 'react'
import vt323 from './vt323/VT323-Regular.ttf'
import englishTowne from './EnglishTowne.ttf'
import { Global, css } from '@emotion/core'

function GlobalStyles() {
  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'VT323-Webfont';
            src: url('${vt323}');
          }
          @font-face {
            font-family: 'EnglishTowne-Webfont';
            src: url('${englishTowne}');
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
    </>
  )
}

export default GlobalStyles
