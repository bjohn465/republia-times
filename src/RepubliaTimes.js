// @flow strict-local
import React from 'react'
import GlobalStyles from './GlobalStyles'
import styled from '@emotion/styled'
import MorningScreen from './MorningScreen'

const Wrapper = styled.div`
  background: #fff;
  color: #24292e;
  margin-bottom: 1rem;
`

function RepubliaTimes() {
  return (
    <Wrapper>
      <GlobalStyles />
      <MorningScreen />
    </Wrapper>
  )
}

export default RepubliaTimes
