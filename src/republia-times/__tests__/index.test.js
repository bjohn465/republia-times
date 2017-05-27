/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import RepubliaTimes from '../index'

describe('app', () => {
  it('renders', () => {
    const tree = shallow(<RepubliaTimes />)
    expect(tree.type()).toBe('div')
  })
})
