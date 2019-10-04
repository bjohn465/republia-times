// @flow strict-local
import React, { useEffect, useState } from 'react'
import t from 'format-message'
import SRContent from './ScreenReaderContent'

const updateFequencyInMilliseconds = 100
const dayStart = new Date('2019-01-01T06:00:00Z')
const dayEnd = new Date('2019-01-01T18:00:00Z')

function pad(value: number) {
  return value < 10 ? '0' + value : value
}

function getDatetimeValue(date: Date) {
  return (
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds())
  )
}

function getNewGameDate(previousGameDate: Date, timeToAdd: number) {
  const newGameDate = new Date(previousGameDate.getTime() + timeToAdd)
  return newGameDate < dayEnd ? newGameDate : dayEnd
}

type Props = {|
  onDayEnd: () => void,
|}

function WorkDayClock({ onDayEnd }: Props) {
  const gameSpeedFactor = 360
  const [gameDate, setGameDate] = useState(dayStart)
  const [timerTime, setTimerTime] = useState(performance.now())
  const hasWorkDayEnded = gameDate === dayEnd

  useEffect(() => {
    function tick() {
      const newTimerTime = performance.now()
      const elapsedTime = newTimerTime - timerTime
      const additionalGameTime = elapsedTime * gameSpeedFactor
      const newGameDate = getNewGameDate(gameDate, additionalGameTime)
      const didWorkDayJustEnd = newGameDate === dayEnd
      setGameDate(newGameDate)
      setTimerTime(newTimerTime)
      if (didWorkDayJustEnd) {
        onDayEnd()
      }
    }
    if (!hasWorkDayEnded) {
      const id = setTimeout(tick, updateFequencyInMilliseconds)
      return () => clearTimeout(id)
    }
  })

  return (
    <section aria-labelledby="clock-heading">
      <SRContent>
        <h2 id="clock-heading">{t('Work day clock')}</h2>
      </SRContent>
      <time dateTime={getDatetimeValue(gameDate)}>
        {t.time(gameDate, 'H:mm')}
      </time>

      <div>
        <SRContent>
          <h3>{t('Work day hours')}</h3>
        </SRContent>
        {t('6 AM - 6 PM')}
      </div>
    </section>
  )
}

export default WorkDayClock
