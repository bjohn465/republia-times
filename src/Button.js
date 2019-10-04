// @flow strict-local
import React, { type Node as ReactNode } from 'react'

type Props = {|
  children: ReactNode,
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
|}

function Button({ children, ...props }: Props) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  )
}

export default Button
