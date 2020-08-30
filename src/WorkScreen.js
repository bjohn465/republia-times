import React, { useState } from 'react'
import SRContent from './ScreenReaderContent'

const dayStart = new Date('2019-01-01T06:00:00Z')
// const dayEnd = new Date('2019-01-01T18:00:00Z')

export default function WorkScreen() {
  const [gameDate, setGameDate] = useState(dayStart)

  return (
    <>
      <h1>Day 1</h1>
      <section aria-labelledby="clock-heading">
        <SRContent>
          <h2 id="clock-heading">Work Day Clock</h2>
        </SRContent>
        <time dateTime={getDateTimeValue(gameDate)}>
          {getDisplayTime(gameDate)}
        </time>

        <div>
          <SRContent>
            <h3 id="hours-heading">Work Day Hours</h3>
          </SRContent>
          <span aria-describedby="hours-heading">6 AM - 6 PM</span>
        </div>
      </section>
    </>
  )
}

function getDateTimeValue(date) {
  return (
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds())
  )
}

function getDisplayTime(date) {
  const utcHours = date.getUTCHours()
  let hours = utcHours
  let xm = 'AM'

  if (utcHours > 12) {
    hours = hours - 12
    xm = 'PM'
  }

  return hours + ':' + pad(date.getUTCMinutes()) + ' ' + xm
}

function pad(value) {
  return value < 10 ? '0' + value : value
}
