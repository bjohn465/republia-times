/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react'
import { shallow } from 'enzyme'
import MorningScreen from '../index'

describe('morning screen', () => {
  const defaults = {
    day: 1,
    governmentName: 'Republia'
  }

  it('renders the paper name', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const paperName = tree.find('.paperName')
    expect(paperName.exists()).toBe(true)
    expect(paperName.text()).toBe('The Republia Times')
  })

  it('renders the day number', () => {
    const tree = shallow(<MorningScreen {...defaults} day={2} />)
    const day = tree.find('.day')
    expect(day.exists()).toBe(true)
    expect(day.text()).toBe('Day 2')
  })

  it('renders the day’s message', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const message = tree.find('.message')
    expect(message.exists()).toBe(true)
    expect(message.text().length).not.toBe(0)
  })

  it('has a "Start Work" button', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const button = tree.find('.button')
    expect(button.exists()).toBe(true)
    expect(button.children().text()).toBe('Start Work')
  })

  it('has by line', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const byLine = tree.find('.footer > div').first()
    expect(byLine.exists()).toBe(true)
    expect(byLine.text()).toBe('by Lucas Pope @dukope')
  })

  it('has link in by line', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const byLineLink = tree.find('.footer > div').first().find('a')
    expect(byLineLink.exists()).toBe(true)
    expect(byLineLink.text()).toBe('@dukope')
    expect(byLineLink.prop('href')).toBe('https://twitter.com/dukope')
  })

  it('has ported by line', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const byLine = tree.find('.footer > div').last()
    expect(byLine.exists()).toBe(true)
    expect(byLine.text()).toBe('ported by Brandon Johnson @bjohn465')
  })

  it('has link in ported by line', () => {
    const tree = shallow(<MorningScreen {...defaults} />)
    const byLineLink = tree.find('.footer > div').last().find('a')
    expect(byLineLink.exists()).toBe(true)
    expect(byLineLink.text()).toBe('@bjohn465')
    expect(byLineLink.prop('href')).toBe('https://twitter.com/bjohn465')
  })
})
