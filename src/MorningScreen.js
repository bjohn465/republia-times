// @flow strict-local
import React from 'react'
import t from 'format-message'

function MorningScreen() {
  return (
    <>
      <h1>{t('The Republia Times')}</h1>
      <h2>{t('Day {n, number}', { n: 1 })}</h2>
      <p>
        {t('Welcome to The Republia Times. You are the new editor-in-chief.')}
      </p>
      <p>
        {t(
          'The war with Antegria is over ' +
            'and the rebellion uprising has been crushed. ' +
            'Order is slowly returning to Republia.'
        )}
      </p>
      <p>{t('The public is not loyal to the government.')}</p>
      <p>
        {t(
          'It is your job to increase their loyalty ' +
            'by editing The Republia Times carefully. ' +
            'Pick only stories that highlight the good things ' +
            'about Republia and its government.'
        )}
      </p>
      <p>{t("You have 3 days to raise the public's loyalty to 20")}</p>
      <p>
        {t(
          'As a precaution against influence, ' +
            'we are keeping your wife and child in a safe location.'
        )}
      </p>
      <button type="button">{t('Start Work')}</button>
      <footer>
        <p>
          {t.rich('by <a>Lucas Pope</a>', {
            // TODO: The format-message/translation-match-params rule
            // has a problem with the `a` param here.
            a: ({ children }) => (
              <a href="https://twitter.com/dukope" key="a">
                {children}
              </a>
            ),
          })}
        </p>
        <p>
          {t.rich('ported by <a>Brandon Johnson</a>', {
            a: ({ children }) => (
              <a href="https://twitter.com/bjohn465" key="a">
                {children}
              </a>
            ),
          })}
        </p>
      </footer>
    </>
  )
}

export default MorningScreen
