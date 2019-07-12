// @flow strict-local
import React, { useState } from 'react'
import t from 'format-message'
import WorkDayClock from './WorkDayClock'

type Props = {
  day: number,
}

function WorkScreen({ day }: Props) {
  const [hasDayEnded, setHasDayEnded] = useState(false)

  return (
    <>
      <h1>{t('Day {n, number}', { n: day })}</h1>
      <WorkDayClock
        onDayEnd={() => {
          setHasDayEnded(true)
        }}
      />
      {hasDayEnded && 'Day has ended!'}
    </>
  )
}

export default WorkScreen
