// @flow strict-local
import React, { useState } from 'react'
import GlobalStyles from './GlobalStyles'
import styled from '@emotion/styled'
import MorningScreen from './MorningScreen'
import WorkScreen from './WorkScreen'

type ScreenState = 'morning' | 'work'

const Wrapper = styled.div`
  background: #fff;
  color: #24292e;
  margin-bottom: 1rem;
`

function RepubliaTimes() {
  const day = 1
  const loyaltyValue = 0
  const readerCount = 200
  const [screen, setScreen] = useState<ScreenState>('morning')

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        {screen === 'morning' && (
          <MorningScreen
            day={day}
            onStartWork={() => {
              setScreen('work')
            }}
          />
        )}
        {screen === 'work' && (
          <WorkScreen
            day={day}
            loyaltyValue={loyaltyValue}
            readerCount={readerCount}
          />
        )}
      </Wrapper>
    </>
  )
}

export default RepubliaTimes
