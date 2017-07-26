/* eslint-disable
  flowtype/require-valid-file-annotation,
  immutable/no-mutation
*/
import React from 'react'
import { shallow, mount } from 'enzyme'
import BackgroundMusic from '../index'

describe('background music', () => {
  const defaults = {
    isOn: true,
    src: ''
  }

  it('renders an audio element', () => {
    const tree = shallow(<BackgroundMusic {...defaults} />)
    expect(tree.type()).toBe('audio')
  })

  it('sets autoPlay to true when isOn is true', () => {
    const tree = shallow(<BackgroundMusic {...defaults} isOn />)
    expect(tree.prop('autoPlay')).toBe(true)
  })

  it('sets autoPlay to false when isOn is false', () => {
    const tree = shallow(<BackgroundMusic {...defaults} isOn={false} />)
    expect(tree.prop('autoPlay')).toBe(false)
  })

  it('sets loop to true', () => {
    const tree = shallow(<BackgroundMusic {...defaults} />)
    expect(tree.prop('loop')).toBe(true)
  })

  it('sets ref to element', () => {
    const tree = mount(<BackgroundMusic {...defaults} />)
    expect(tree.instance().el).not.toBeUndefined()
  })

  it('sets src correctly', () => {
    const tree = shallow(<BackgroundMusic {...defaults} src='/sound.mp3' />)
    expect(tree.prop('src')).toBe('/sound.mp3')
  })

  it('sets volume on mount', () => {
    const tree = shallow(<BackgroundMusic {...defaults} volume={0.1337} />)
    const mockEl = {}
    tree.instance().el = mockEl
    tree.instance().componentDidMount()
    expect(mockEl.volume).toBe(0.1337)
  })

  it('doesn’t set volume on mount if reference isn’t set', () => {
    const tree = shallow(<BackgroundMusic {...defaults} volume={0.1337} />)
    expect(() => tree.instance().componentDidMount()).not.toThrow()
  })

  it('pauses if isOn changes to false', () => {
    const tree = mount(<BackgroundMusic {...defaults} isOn />)
    const mockEl = { pause: jest.fn() }
    tree.instance().el = mockEl
    tree.setProps({ isOn: false })
    expect(mockEl.pause).toHaveBeenCalled()
  })

  it('plays if isOn changes to true', () => {
    const tree = mount(<BackgroundMusic {...defaults} isOn={false} />)
    const mockEl = { play: jest.fn() }
    tree.instance().el = mockEl
    tree.setProps({ isOn: true })
    expect(mockEl.play).toHaveBeenCalled()
  })

  it('adjusts volume when it changes', () => {
    const tree = mount(<BackgroundMusic {...defaults} volume={0.5} />)
    const mockEl = {}
    tree.instance().el = mockEl
    tree.setProps({ volume: 0.75 })
    expect(mockEl.volume).toBe(0.75)
  })
})
