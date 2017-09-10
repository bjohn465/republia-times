// @flow
import classnames from 'classnames'
import styles from './svg.css'

export type Props = {
  className?: string
}

const svgProps = ({className, ...props}: Props = {}) => ({
  'aria-hidden': true,
  focusable: false,
  role: 'img',
  ...props,
  className: classnames(styles.icon, className)
})

export default svgProps
