// @flow strict-local
import React from 'react'
import { render } from '@testing-library/react'
import Stats from '../Stats'

describe('Stats', () => {
  const defaults = {
    loyaltyValue: 0,
    readerCount: 200,
  }

  describe('loyalty value', () => {
    it('renders a zero loyalty value', () => {
      const { queryByText } = render(<Stats {...defaults} loyaltyValue={0} />)
      expect(queryByText('Loyalty: 0')).toBeInTheDocument()
    })

    it('renders a positive loyalty value', () => {
      const { queryByText } = render(<Stats {...defaults} loyaltyValue={10} />)
      expect(queryByText('Loyalty: 10')).toBeInTheDocument()
    })

    it('renders a negative loyalty value', () => {
      const { queryByText } = render(<Stats {...defaults} loyaltyValue={-10} />)
      expect(queryByText('Loyalty: -10')).toBeInTheDocument()
    })
  })

  describe('reader count', () => {
    it('renders the reader count', () => {
      const { queryByText } = render(<Stats {...defaults} readerCount={300} />)
      expect(queryByText('300 Readers')).toBeInTheDocument()
    })

    describe('pluralization', () => {
      it('handles one reader', () => {
        const { queryByText } = render(<Stats {...defaults} readerCount={1} />)
        expect(queryByText('1 Reader')).toBeInTheDocument()
      })

      it('handles zero readers', () => {
        const { queryByText } = render(<Stats {...defaults} readerCount={0} />)
        expect(queryByText('0 Readers')).toBeInTheDocument()
      })
    })
  })
})
