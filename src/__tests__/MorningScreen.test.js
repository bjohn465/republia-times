// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import MorningScreen from '../MorningScreen'

describe('MorningScreen', () => {
  it('shows the paper name', () => {
    const { queryByText } = render(<MorningScreen />)
    expect(queryByText('The Republia Times')).toBeInTheDocument()
  })

  it('shows the day number', () => {
    const { queryByText } = render(<MorningScreen />)
    expect(queryByText(/day [0-9]+/i)).toBeInTheDocument()
  })

  it('has a button to start work', () => {
    const { queryByText } = render(<MorningScreen />)
    expect(queryByText('Start Work')).toBeInTheDocument()
  })
})
