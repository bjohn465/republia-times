// @flow
import React, { PureComponent } from 'react'
import AudioControls from '../audio-controls'
import Button from '../button'
import getMessage from './get-message'
import styles from './index.css'

export default class MorningScreen extends PureComponent {
  props: {
    day: Day,
    governmentName: GovernmentName,
    isSoundOn: boolean,
    onSoundOnChange: (isSoundOn: boolean) => any
  }

  render () {
    const { day, governmentName, isSoundOn, onSoundOnChange } = this.props
    const paperName = `The ${governmentName} Times`
    const message = getMessage({ governmentName })

    return (
      <div className={styles.morningScreen}>
        <div className={styles.header}>
          <h1 className={styles.paperName}>{paperName}</h1>
          <h2 className={styles.day}>Day {day}</h2>
        </div>
        <div className={styles.message}>
          {message.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <div className={styles.actions}>
          <Button className={styles.button}>Start Work</Button>
        </div>
        <div className={styles.footer}>
          <AudioControls isOn={isSoundOn} onChange={onSoundOnChange} />
          <div className={styles.byLines}>
            <div>
              by Lucas Pope <a href='https://twitter.com/dukope'>@dukope</a>
            </div>
            <div>
              ported by Brandon Johnson <a
                href='https://twitter.com/bjohn465'
              >@bjohn465</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
