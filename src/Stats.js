// @flow strict-local
import React from 'react'
import t from 'format-message'
import SRContent from './ScreenReaderContent'

type Props = {|
  loyaltyValue: number,
  readerCount: number,
|}

function Stats({ loyaltyValue, readerCount }: Props) {
  return (
    <section aria-labelledby="stats-heading">
      <SRContent>
        <h2 id="stats-heading">{t('Paper Stats')}</h2>
      </SRContent>

      <div>
        <div aria-hidden="true">{t('Readers')}</div>
        <div aria-hidden="true">{t.number(readerCount)}</div>
        <SRContent>
          {t('{readerCount, plural, one {# Reader} other {# Readers}}', {
            readerCount,
          })}
        </SRContent>
      </div>

      <div>
        <div aria-hidden="true">{t('Loyalty')}</div>
        <div aria-hidden="true">{t.number(loyaltyValue)}</div>
        <SRContent>
          {t('Loyalty: {loyaltyValue, number}', { loyaltyValue })}
        </SRContent>
      </div>
    </section>
  )
}

export default Stats
