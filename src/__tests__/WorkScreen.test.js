// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import WorkScreen from '../WorkScreen'

describe('WorkScreen', () => {
  const defaults = { day: 1 }

  describe('day number', () => {
    it('is shown', () => {
      const { queryByText } = render(<WorkScreen {...defaults} />)
      expect(queryByText(/day [0-9]+/i)).toBeInTheDocument()
    })

    it('is an h1 element', () => {
      const { queryByText } = render(<WorkScreen {...defaults} />)
      const el = queryByText(/day [0-9]+/i)
      expect(el && el.tagName).toBe('H1')
    })

    it('is formatted as a number', () => {
      const { queryByText } = render(<WorkScreen {...defaults} day={1000} />)
      expect(queryByText('Day 1,000')).toBeInTheDocument()
    })
  })
})
