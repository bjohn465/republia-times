/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import MorningScreen from '../../morning-screen'
import RepubliaTimes from '../index'

describe('app', () => {
  it('renders the morning screen', () => {
    const tree = shallow(<RepubliaTimes />)
    expect(tree.type()).toBe(MorningScreen)
  })
})
