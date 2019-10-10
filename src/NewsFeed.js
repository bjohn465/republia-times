// @flow strict-local
import React from 'react'
import t from 'format-message'

function NewsFeed() {
  return (
    <>
      <h2 id="news-feed-heading">{t('News Feed')}</h2>
      <ul aria-labelledby="news-feed-heading"></ul>
    </>
  )
}

export default NewsFeed
