// @flow strict-local
import React, { type Node as ReactNode } from 'react'
import styled from '@emotion/styled'
import { colorBackground, colorTextDefault } from './css-variables'

const StyledButton = styled.button`
  background-color: ${colorBackground};
  border: 0.25rem solid;
  border-radius: 0.375rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  position: relative;
  text-align: center;

  ::before {
    border: 0.125rem solid;
    border-radius: 0.1875rem;
    bottom: 0.125rem;
    content: '';
    left: 0.125rem;
    position: absolute;
    right: 0.125rem;
    top: 0.125rem;
  }

  :focus {
    background-color: ${colorTextDefault};
    border-color: ${colorBackground};
    color: ${colorBackground};
    outline: none;
  }
`

type Props = {|
  children: ReactNode,
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
|}

function Button({ children, ...props }: Props) {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
