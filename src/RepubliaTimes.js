// @flow strict-local
import React from 'react'
import GlobalStyles from './GlobalStyles'
import styled from '@emotion/styled'
import t from 'format-message'

const Wrapper = styled.div`
  background: #fff;
  color: #24292e;
  margin-bottom: 1rem;
`

function RepubliaTimes() {
  return (
    <Wrapper>
      <GlobalStyles />
      <h1>{t('The Republia Times')}</h1>
      <h2>{t('Day {n, number}', { n: 1 })}</h2>
    </Wrapper>
  )
}

export default RepubliaTimes
