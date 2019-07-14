// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import WorkDayClock from '../WorkDayClock'

describe('WorkDayClock', () => {
  const defaults = { onDayEnd() {} }

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('is labelled', () => {
    const { queryByLabelText } = render(<WorkDayClock {...defaults} />)
    expect(queryByLabelText(/clock/i)).toBeInTheDocument()
  })

  it('displays the current time', () => {
    const { queryByText } = render(<WorkDayClock {...defaults} />)
    expect(queryByText('6:00 AM')).toBeInTheDocument()
  })

  it('updates the time at the correct rate', () => {
    // TODO: Fill this in
  })

  describe('work day hours', () => {
    it('has a heading', () => {
      const { queryByText } = render(<WorkDayClock {...defaults} />)
      const el = queryByText(/hours/i)
      expect(el && el.tagName).toBe('H3')
    })

    it('displays the work day hours', () => {
      const { queryByText } = render(<WorkDayClock {...defaults} />)
      expect(queryByText('6 AM - 6 PM')).toBeInTheDocument()
    })
  })
})