/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import AudioControls from '../index'

describe('audio controls', () => {
  const defaults = {
    isOn: true,
    onChange () {}
  }

  it('should render in a <label>', () => {
    const tree = shallow(<AudioControls {...defaults} />)
    expect(tree.type()).toBe('label')
  })

  it('should use a checkbox <input>', () => {
    const tree = shallow(<AudioControls {...defaults} />)
    const input = tree.find('input')
    expect(input.exists()).toBe(true)
    expect(input.prop('type')).toBe('checkbox')
  })

  it('should have screen-reader-accessible text', () => {
    const tree = shallow(<AudioControls {...defaults} />)
    expect(tree.find('ScreenReaderContent').dive().text())
      .toBe('Toggle sound on (checked) and off (unchecked)')
  })

  it('adds class when focused', () => {
    const tree = shallow(<AudioControls {...defaults} />)
    expect(tree.find('label').prop('className')).not.toContain('focused')
    tree.find('input').simulate('focus')
    expect(tree.find('label').prop('className')).toContain('focused')
  })

  it('removes class when blurred', () => {
    const tree = shallow(<AudioControls {...defaults} />)
    tree.find('input').simulate('focus')
    expect(tree.find('label').prop('className')).toContain('focused')
    tree.find('input').simulate('blur')
    expect(tree.find('label').prop('className')).not.toContain('focused')
  })

  describe('when on', () => {
    const onDefaults = {
      ...defaults,
      isOn: true
    }

    it('should set checked to true', () => {
      const tree = shallow(<AudioControls {...onDefaults} />)
      expect(tree.find('input').prop('checked')).toBe(true)
    })

    it('should call onChange when turned off', () => {
      const onChange = jest.fn()
      const tree = shallow(
        <AudioControls {...onDefaults} onChange={onChange} />
      )
      tree.find('input').simulate('change', { target: { checked: false } })
      expect(onChange).toHaveBeenCalledWith(false)
    })

    it('should use the speaker with sound icon', () => {
      const tree = shallow(<AudioControls {...onDefaults} />)
      expect(tree.find('SpeakerWithSoundIcon').exists()).toBe(true)
    })
  })

  describe('when off', () => {
    const offDefaults = {
      ...defaults,
      isOn: false
    }

    it('should set checked to false', () => {
      const tree = shallow(<AudioControls {...offDefaults} />)
      expect(tree.find('input').prop('checked')).toBe(false)
    })

    it('should call onChange when turned on', () => {
      const onChange = jest.fn()
      const tree = shallow(
        <AudioControls {...offDefaults} onChange={onChange} />
      )
      tree.find('input').simulate('change', { target: { checked: true } })
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should use the speaker icon', () => {
      const tree = shallow(<AudioControls {...offDefaults} />)
      expect(tree.find('SpeakerIcon').exists()).toBe(true)
    })
  })
})
