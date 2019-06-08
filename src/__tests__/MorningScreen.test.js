// @flow strict-local
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import MorningScreen from '../MorningScreen'

describe('MorningScreen', () => {
  const defaults = {
    day: 1,
    onStartWork() {},
  }

  describe('paper name', () => {
    it('is shown', () => {
      const { queryByText } = render(<MorningScreen {...defaults} />)
      expect(queryByText('The Republia Times')).toBeInTheDocument()
    })

    it('is an h1 element', () => {
      const { getByText } = render(<MorningScreen {...defaults} />)
      expect(getByText('The Republia Times').tagName).toBe('H1')
    })
  })

  describe('day number', () => {
    it('is shown', () => {
      const { queryByText } = render(<MorningScreen {...defaults} />)
      expect(queryByText(/day [0-9]+/i)).toBeInTheDocument()
    })

    it('is an h2 element', () => {
      const { getByText } = render(<MorningScreen {...defaults} />)
      expect(getByText(/day [0-9]+/i).tagName).toBe('H2')
    })

    it('is formatted as a number', () => {
      const { queryByText } = render(<MorningScreen {...defaults} day={1000} />)
      expect(queryByText('Day 1,000')).toBeInTheDocument()
    })
  })

  describe('start work button', () => {
    it('is shown', () => {
      const { queryByText } = render(<MorningScreen {...defaults} />)
      expect(queryByText('Start Work')).toBeInTheDocument()
    })

    it('calls onStartWork when clicked', () => {
      const onStartWork = jest.fn()
      const { getByText } = render(
        <MorningScreen {...defaults} onStartWork={onStartWork} />
      )
      fireEvent.click(getByText('Start Work'))
      expect(onStartWork).toHaveBeenCalled()
    })
  })
})
