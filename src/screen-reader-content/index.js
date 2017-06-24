// @flow
import React, { PureComponent } from 'react'
import styles from './index.css'

export default class ScreenReaderContent extends PureComponent {
  props: {
    children?: React.Element<*>,
  }

  render () {
    return (
      <span className={styles.screenReaderContent}>{this.props.children}</span>
    )
  }
}
