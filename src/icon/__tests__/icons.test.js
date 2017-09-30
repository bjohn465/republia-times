// @flow
import React from 'react'
import { shallow } from 'enzyme'

import SpeakerIcon from '../speaker'
import SpeakerWithSoundIcon from '../speaker-with-sound'

const icons = [
  SpeakerIcon,
  SpeakerWithSoundIcon
]

for (const Icon of icons) {
  describe(`${Icon.displayName}`, () => {
    it('renders an svg', () => {
      const tree = shallow(<Icon />)
      expect(tree.find('svg').exists()).toBe(true)
    })

    it('uses a role of img', () => {
      const tree = shallow(<Icon />)
      expect(tree.find('svg').prop('role')).toBe('img')
    })

    it('is not focusable', () => {
      const tree = shallow(<Icon />)
      expect(tree.find('svg').prop('focusable')).toBe('false')
    })

    it('is aria-hidden', () => {
      const tree = shallow(<Icon />)
      expect(tree.find('svg').prop('aria-hidden')).toBe(true)
    })

    it('uses given className', () => {
      const tree = shallow(<Icon className='water' />)
      expect(tree.find('svg').prop('className').split(' ')).toContain('water')
    })

    it('can overridde aria-hidden', () => {
      const tree = shallow(<Icon aria-hidden={null} />)
      expect(tree.find('svg').prop('aria-hidden')).toBe(null)
    })
  })
}
