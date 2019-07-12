// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import ScreenReaderContent from '../ScreenReaderContent'

describe('ScreenReaderContent', () => {
  it('renders its children', () => {
    const content = 'Helpful text'
    const { queryByText } = render(
      <ScreenReaderContent>{content}</ScreenReaderContent>
    )
    expect(queryByText(content)).toBeInTheDocument()
  })

  it('is visible (to screen readers at least)', () => {
    const content = 'Helpful text'
    const { queryByText } = render(
      <ScreenReaderContent>{content}</ScreenReaderContent>
    )
    expect(queryByText(content)).toBeVisible()
  })
})
