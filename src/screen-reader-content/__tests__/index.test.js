/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import ScreenReaderContent from '../index'

describe('screen reader content', () => {
  it('should only be visible to screen readers', () => {
    const tree = shallow(<ScreenReaderContent />)
    expect(tree.prop('className')).toContain('screenReaderContent')
  })

  it('should render children', () => {
    const tree = shallow(<ScreenReaderContent>hidden</ScreenReaderContent>)
    expect(tree.text()).toBe('hidden')
  })
})
