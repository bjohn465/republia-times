// @flow strict-local
import React from 'react'
import t from 'format-message'
import styled from '@emotion/styled'
import ministryBuilding from './ministry-building.png'
import Button from './Button'

const PaperName = styled.h1`
  font-family: EnglishTowne-Webfont, serif;
  font-size: 4rem;
  font-weight: normal;
  line-height: 0.85;
`

const headerImageWidth = '14rem'
const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 9.5rem;
  padding: 0 calc(${headerImageWidth} + 0.5rem);
  position: relative;
  text-align: center;

  ::before,
  ::after {
    background-image: url('${ministryBuilding}');
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 0;
    content: '';
    /* For Firefox */
    image-rendering: crisp-edges;
    /* For Chrome, Safari, etc. */
    image-rendering: pixelated;
    position: absolute;
    top: 0;
    width: ${headerImageWidth};
  }

  ::before {
    left: 0;
  }

  ::after {
    right: 0;
    transform: rotateY(0.5turn);
  }

  > h1,
  > h2 {
    margin: 0;
  }
`

type Props = {|
  day: number,
  onStartWork: () => void,
|}

function MorningScreen({ day, onStartWork }: Props) {
  return (
    <>
      <Header>
        <PaperName>{t('The Republia Times')}</PaperName>
        <h2>{t('Day {n, number}', { n: day })}</h2>
      </Header>
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
      <Button onClick={onStartWork}>{t('Start Work')}</Button>
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
