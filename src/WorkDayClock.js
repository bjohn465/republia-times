// @flow strict-local
import React from 'react'
import t from 'format-message'
import SRContent from './ScreenReaderContent'

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

type Props = {|
  gameDate: Date,
|}

function WorkDayClock({ gameDate }: Props) {
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
