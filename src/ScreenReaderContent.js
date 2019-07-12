// @flow strict-local
import React, { type Node as ReactNode } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.0625rem;
  margin: -0.0625rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.0625rem;
`

type Props = {
  children: ReactNode,
}

function ScreenReaderContent({ children }: Props) {
  return <Wrapper>{children}</Wrapper>
}

export default ScreenReaderContent
