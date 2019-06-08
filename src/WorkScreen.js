// @flow strict-local
import React from 'react'
import t from 'format-message'

type Props = {
  day: number,
}

function WorkScreen({ day }: Props) {
  return (
    <>
      <h1>{t('Day {n, number}', { n: day })}</h1>
    </>
  )
}

export default WorkScreen
