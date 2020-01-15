// @flow strict-local
import React, { useState } from 'react'
import t from 'format-message'
import { getNewsItemsForDay } from './news-items'
import { type GovernmentID, type GoalStatus } from './common-types'

type Props = {|
  day: number,
  governmentId: GovernmentID,
  goalStatus: GoalStatus,
|}

export default function NewsFeed({ day, goalStatus, governmentId }: Props) {
  const [newsItems] = useState(() => {
    const usedNewsItemIds = new Set()
    return getNewsItemsForDay(day, usedNewsItemIds)
  })
  const newsItemState = {
    goalStatus,
    governmentId,
  }

  return (
    <>
      <h2 id="news-feed-heading">{t('News Feed')}</h2>
      <ul aria-labelledby="news-feed-heading">
        {newsItems.map(item => (
          <li key={item.id}>{item.getBlurb(newsItemState)}</li>
        ))}
      </ul>
    </>
  )
}
