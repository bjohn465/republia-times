// @flow strict-local
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import RepubliaTimes from '../RepubliaTimes'

jest.mock('../MorningScreen', () => {
  return function MockMorningScreen({ onStartWork }) {
    return (
      <>
        <h1>Morning Screen</h1>
        <button onClick={onStartWork}>Start Work</button>
      </>
    )
  }
})

jest.mock('../WorkScreen', () => {
  return function MockWorkScreen() {
    return 'Work Screen'
  }
})

describe('RepubliaTimes', () => {
  it('shows the morning screen by default', () => {
    const { queryByText } = render(<RepubliaTimes />)
    expect(queryByText('Morning Screen')).toBeInTheDocument()
  })

  it('changes to the work screen', () => {
    const { getByText, queryByText } = render(<RepubliaTimes />)
    fireEvent.click(getByText('Start Work'))
    expect(queryByText('Work Screen')).toBeInTheDocument()
  })
})
