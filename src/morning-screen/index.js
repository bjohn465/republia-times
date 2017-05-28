// @flow
import React, { PureComponent } from 'react'
import Button from '../button'
import styles from './index.css'

export default class MorningScreen extends PureComponent {
  props: {
    day: number
  }

  render () {
    const { day } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h1 className={styles.paperName}>The Republia Times</h1>
          <h2 className={styles.day}>Day {day}</h2>
        </div>
        <p className={styles.message}>TODO: Message</p>
        <div className={styles.actions}>
          <Button className={styles.button}>Start Work</Button>
        </div>
        <div className={styles.footer}>
          <div className={styles.by}>
            <div>by</div>
            <div>Lucas Pope</div>
            <div><a href='https://twitter.com/dukope'>@dukope</a></div>
          </div>
          <div className={styles.by}>
            <div>ported by</div>
            <div>Brandon Johnson</div>
            <div><a href='https://twitter.com/bjohn465'>@bjohn465</a></div>
          </div>
        </div>
      </div>
    )
  }
}
