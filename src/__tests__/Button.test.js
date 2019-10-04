// @flow strict-local
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  const defaults = { onClick() {} }

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const buttonText = 'Click Me'
    const { getByText, queryByText } = render(
      <Button {...defaults} onClick={onClick}>
        {buttonText}
      </Button>
    )
    expect(queryByText(buttonText)).toBeInTheDocument()
    fireEvent.click(getByText(buttonText))
    expect(onClick).toHaveBeenCalledWith(expect.anything())
  })
})
