// @flow
import React, { PureComponent, type Node as ReactNode } from 'react'
import styles from './index.css'

export default class ScreenReaderContent extends PureComponent<{
  children?: ReactNode,
}> {
  render () {
    return (
      <span className={styles.screenReaderContent}>{this.props.children}</span>
    )
  }
}
