// @flow strict-local
import { type Node as ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {|
  children: ReactNode,
|}

const ScreenReaderContent = styled.span<Props>({
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '0.0625rem',
  margin: '-0.0625rem',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '0.0625rem',
})

export default ScreenReaderContent
