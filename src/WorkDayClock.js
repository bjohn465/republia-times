// @flow strict-local
import React, { useEffect, useState } from 'react'
import t from 'format-message'
import SRContent from './ScreenReaderContent'

const millisecondsInASecond = 1000
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

function getWorkDayTime(elapsedSeconds: number) {
  const workDayTime = new Date(dayStart)
  workDayTime.setSeconds(elapsedSeconds)
  return workDayTime < dayEnd ? workDayTime : dayEnd
}

type Props = {
  onDayEnd: () => void,
}

function WorkDayClock({ onDayEnd }: Props) {
  const gameSecondsSpeedFactor = 360
  const [elapsedGameSeconds, setElapsedGameSeconds] = useState(0)
  const workDayTime = getWorkDayTime(elapsedGameSeconds)
  const hasWorkDayEnded = workDayTime === dayEnd
  const previousActualTime = performance.now()
  useEffect(() => {
    function tick() {
      console.log('tick called')
      const elapsedMilliseconds = performance.now() - previousActualTime
      const elapsedSeconds = elapsedMilliseconds / millisecondsInASecond
      const additionalGameSeconds = elapsedSeconds * gameSecondsSpeedFactor
      setElapsedGameSeconds(elapsedGameSeconds + additionalGameSeconds)
    }
    if (!hasWorkDayEnded) {
      const id = setTimeout(tick, updateFequencyInMilliseconds)
      return () => clearTimeout(id)
    } else {
      onDayEnd()
    }
  })

  return (
    <section aria-labelledby="clock-heading">
      <SRContent>
        <h2 id="clock-heading">{t('Work day clock')}</h2>
      </SRContent>
      <time dateTime={getDatetimeValue(workDayTime)}>
        {t.time(workDayTime, 'H:mm')}
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
