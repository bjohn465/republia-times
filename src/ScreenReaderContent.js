import React from 'react'
import styles from './ScreenReaderContent.module.css'

export default function ScreenReaderContent({ children }) {
  return <div className={styles.screenReaderContent}>{children}</div>
}
