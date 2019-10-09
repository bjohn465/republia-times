// @flow strict-local
import React, { useEffect, useState } from 'react'
import t from 'format-message'
import WorkDayClock from './WorkDayClock'

const updateFequencyInMilliseconds = 100
const dayStart = new Date('2019-01-01T06:00:00Z')
const dayEnd = new Date('2019-01-01T18:00:00Z')

function getNewGameDate(previousGameDate: Date, timeToAdd: number) {
  const newGameDate = new Date(previousGameDate.getTime() + timeToAdd)
  return newGameDate < dayEnd ? newGameDate : dayEnd
}

type Props = {|
  day: number,
|}

function WorkScreen({ day }: Props) {
  const gameSpeedFactor = 360
  const [gameDate, setGameDate] = useState(dayStart)
  const [timerTime, setTimerTime] = useState(performance.now())
  const hasDayEnded = gameDate === dayEnd

  useEffect(() => {
    function tick() {
      const newTimerTime = performance.now()
      const elapsedTime = newTimerTime - timerTime
      const additionalGameTime = elapsedTime * gameSpeedFactor
      const newGameDate = getNewGameDate(gameDate, additionalGameTime)
      setGameDate(newGameDate)
      setTimerTime(newTimerTime)
    }
    if (!hasDayEnded) {
      const id = setTimeout(tick, updateFequencyInMilliseconds)
      return () => clearTimeout(id)
    }
  })

  return (
    <>
      <h1>{t('Day {n, number}', { n: day })}</h1>
      <WorkDayClock gameDate={gameDate} />
      {hasDayEnded && 'Day has ended!'}
    </>
  )
}

export default WorkScreen
