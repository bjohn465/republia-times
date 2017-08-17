// @flow
import React, { PureComponent, type Node as ReactNode } from 'react'
import classnames from 'classnames'
import styles from './index.css'

export default class Button extends PureComponent<{
  children?: ReactNode,
  className?: string
}> {
  render () {
    const { children, className, ...props } = this.props
    const classes = classnames(
      className,
      styles.button
    )

    return (
      <button type='button' {...props} className={classes}>
        <span className={styles.inner}>{children}</span>
      </button>
    )
  }
}
