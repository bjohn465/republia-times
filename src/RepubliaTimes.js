// @flow strict-local
import React, { useState } from 'react'
import GlobalStyles from './GlobalStyles'
import styled from '@emotion/styled'
import MorningScreen from './MorningScreen'
import WorkScreen from './WorkScreen'
import { colorBackground, colorTextDefault } from './css-variables'
import { type GovernmentID, type GoalStatus } from './common-types'

type ScreenState = 'morning' | 'work'

const Wrapper = styled.div`
  background: ${colorBackground};
  color: ${colorTextDefault};
`

function RepubliaTimes() {
  const day = 1
  const loyaltyValue = 0
  const readerCount = 200
  const [screen, setScreen] = useState<ScreenState>('morning')
  const governmentId: GovernmentID = 'republia'
  const goalStatus: GoalStatus = 'notWorking'

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
            goalStatus={goalStatus}
            governmentId={governmentId}
            loyaltyValue={loyaltyValue}
            readerCount={readerCount}
          />
        )}
      </Wrapper>
    </>
  )
}

export default RepubliaTimes
