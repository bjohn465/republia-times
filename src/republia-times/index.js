// @flow
import React, { PureComponent } from 'react'
import MorningScreen from '../morning-screen'

export default class RepubliaTimes extends PureComponent {
  state: {
    day: number,
    loyalty: number,
    readers: number,
    screen: typeof MorningScreen
  } = {
    day: 1,
    loyalty: 0,
    readers: 200,
    screen: MorningScreen
  }

  render () {
    const { screen: Screen, ...gameState } = this.state
    return <Screen {...gameState} />
  }
}
