// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import WorkDayClock from '../WorkDayClock'

describe('WorkDayClock', () => {
  const defaults = {
    gameDate: new Date('2019-01-01T06:00:00Z'),
  }

  it('is labelled', () => {
    const { queryByLabelText } = render(<WorkDayClock {...defaults} />)
    expect(queryByLabelText(/work day clock/i)).toBeInTheDocument()
  })

  it('displays the current time', () => {
    const { queryByText } = render(
      <WorkDayClock {...defaults} gameDate={new Date('2019-01-01T09:11:00Z')} />
    )
    expect(queryByText('9:11 AM')).toBeInTheDocument()
  })

  describe('work day hours', () => {
    it('has a label', () => {
      const { queryByText } = render(<WorkDayClock {...defaults} />)
      expect(queryByText(/work day hours/i)).toBeInTheDocument()
    })

    it('displays the work day hours', () => {
      const { queryByText } = render(<WorkDayClock {...defaults} />)
      expect(queryByText('6 AM - 6 PM')).toBeInTheDocument()
    })
  })
})
