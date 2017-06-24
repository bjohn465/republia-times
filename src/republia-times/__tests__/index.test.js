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

  it('handles soundOn change', () => {
    const tree = shallow(<RepubliaTimes />)
    expect(tree.state('isSoundOn')).toBe(false)
    tree.simulate('soundOnChange', true)
    expect(tree.state('isSoundOn')).toBe(true)
    tree.simulate('soundOnChange', false)
    expect(tree.state('isSoundOn')).toBe(false)
  })
})
