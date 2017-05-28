/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import Button from '../index'

describe('button', () => {
  it('renders a button element', () => {
    const tree = shallow(<Button />)
    expect(tree.find('button').exists()).toBe(true)
  })

  it('defaults type to "button"', () => {
    const tree = shallow(<Button />)
    expect(tree.find('button').prop('type')).toBe('button')
  })

  it('allows overriding type', () => {
    const tree = shallow(<Button type='submit' />)
    expect(tree.find('button').prop('type')).toBe('submit')
  })

  it('adds root class', () => {
    const tree = shallow(<Button />)
    expect(tree.find('button').prop('className').split(' ')).toContain('root')
  })

  it('includes given classes', () => {
    const tree = shallow(<Button className='one two' />)
    expect(tree.find('button').prop('className')).toContain('one two')
  })

  it('passes props through', () => {
    const tree = shallow(<Button aria-disabled id='test' />)
    expect(tree.find('button').props()).toMatchObject({
      'aria-disabled': true,
      id: 'test'
    })
  })

  it('includes inner span', () => {
    const tree = shallow(<Button />)
    const innerSpan = tree.find('.inner')
    expect(innerSpan.exists()).toBe(true)
    expect(innerSpan.type()).toBe('span')
  })

  it('renders children within inner span', () => {
    const tree = shallow(<Button>Click me</Button>)
    expect(tree.find('.inner').text()).toBe('Click me')
  })
})
