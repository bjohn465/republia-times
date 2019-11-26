// @flow strict-local
import React, { type Node as ReactNode } from 'react'
import styled from '@emotion/styled'
import { colorBackground, colorTextDefault } from './css-variables'

type Props = {|
  children: ReactNode,
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
|}

type StyledButtonProps = {|
  ...Props,
  type: 'button',
|}

const StyledButton = styled.button<StyledButtonProps>({
  backgroundColor: colorBackground,
  border: '0.25rem solid',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '1.5rem',
  padding: '0.25rem 0.5rem',
  position: 'relative',
  textAlign: 'center',

  '::before': {
    border: '0.125rem solid',
    borderRadius: '0.1875rem',
    bottom: '0.125rem',
    content: '""',
    left: '0.125rem',
    position: 'absolute',
    right: '0.125rem',
    top: '0.125rem',
  },

  ':focus': {
    backgroundColor: colorTextDefault,
    borderColor: colorBackground,
    color: colorBackground,
    outline: 'none',
  },
})

function Button({ children, ...props }: Props) {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
