// @flow strict-local
import React from 'react'
import { render, act } from '@testing-library/react'
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
    // Have 1000 milliseconds elapse
    // between the first call to `performance.now` and the second
    jest
      .spyOn(global.performance, 'now')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1000)

    const { queryByText } = render(<WorkDayClock {...defaults} />)

    // Ensure the update doesn't happen too fast
    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(queryByText('6:00 AM')).toBeInTheDocument()

    // Ensure the update happens,
    // but it will use the 1000 milliseconds we set up before,
    // so the time should advance by 6 minutes.
    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(queryByText('6:06 AM')).toBeInTheDocument()
  })

  it('calls onDayEnd when the work day ends', () => {
    jest
      .spyOn(global.performance, 'now')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(60 * 1000)
      .mockReturnValueOnce(60 * 1000)
      .mockReturnValueOnce(120 * 1000)

    const onDayEnd = jest.fn()
    const { queryByText } = render(
      <WorkDayClock {...defaults} onDayEnd={onDayEnd} />
    )

    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(queryByText('6:00 PM')).toBeInTheDocument()
    expect(onDayEnd).toHaveBeenCalled()
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
