// @flow strict-local
import React, { type Node as ReactNode } from 'react'
import t from 'format-message'
import styled from '@emotion/styled'
import ministryBuilding from './ministry-building.png'
import {
  colorBackground,
  colorTextDefault,
  normalFontSize,
} from './css-variables'
import Button from './Button'

type WrapperProps = {|
  children: ReactNode,
|}

const Wrapper = styled.div<WrapperProps>({
  fontSize: normalFontSize,
  margin: '1rem auto',
  maxWidth: '65rem',
})

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
`

const PaperName = styled.h1`
  font-family: EnglishTowne-Webfont, serif;
  font-size: 4rem;
  font-weight: normal;
  line-height: 0.85;
  margin: 0;
`

const DayNumber = styled.h2`
  font-size: ${normalFontSize};
  margin: 0;
`

const Message = styled.main`
  margin: auto;
  text-align: justify;
  width: 66%;
`

const StartWorkButton = styled(Button)`
  display: block;
  margin: auto;
  width: 14rem;
`

const ByLine = styled.p`
  margin: 0.25rem 0;
  text-align: right;
`

const Link = styled.a`
  color: ${colorTextDefault};

  :focus {
    background: ${colorTextDefault};
    color: ${colorBackground};
    outline: 0.125rem solid ${colorTextDefault};
  }
`

type Props = {|
  day: number,
  onStartWork: () => void,
|}

function MorningScreen({ day, onStartWork }: Props) {
  return (
    <Wrapper>
      <Header>
        <PaperName>{t('The Republia Times')}</PaperName>
        <DayNumber>{t('Day {n, number}', { n: day })}</DayNumber>
      </Header>
      <Message>
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
        <StartWorkButton onClick={onStartWork}>
          {t('Start Work')}
        </StartWorkButton>
      </Message>
      <footer>
        <ByLine>
          {t.rich('by <a>Lucas Pope</a>', {
            // TODO: The format-message/translation-match-params rule
            // has a problem with the `a` param here.
            a: ({ children }) => (
              <Link href="https://twitter.com/dukope" key="a">
                {children}
              </Link>
            ),
          })}
        </ByLine>
        <ByLine>
          {t.rich('ported by <a>Brandon Johnson</a>', {
            a: ({ children }) => (
              <Link href="https://twitter.com/bjohn465" key="a">
                {children}
              </Link>
            ),
          })}
        </ByLine>
      </footer>
    </Wrapper>
  )
}

export default MorningScreen
