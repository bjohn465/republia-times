// @flow strict-local
import React, { type Node as ReactNode } from 'react'
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

type HoursLabelProps = {|
  children: ReactNode,
|}

function HoursLabel({ children }: HoursLabelProps) {
  return <SRContent key="hiddenLabel">{children}</SRContent>
}

type Props = {|
  gameDate: Date,
|}

function WorkDayClock({ gameDate }: Props) {
  return (
    <section aria-label={t('Work day clock')}>
      <time dateTime={getDatetimeValue(gameDate)}>
        {t.time(gameDate, 'H:mm')}
      </time>

      <div>
        {t.rich('<hoursLabel>Work day hours:</hoursLabel>6 AM - 6 PM', {
          hoursLabel: HoursLabel,
        })}
      </div>
    </section>
  )
}

export default WorkDayClock
