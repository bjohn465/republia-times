// @flow
import React, { PureComponent } from 'react'
import MorningScreen from '../morning-screen'

export default class RepubliaTimes extends PureComponent {
  state: GameState = {
    day: 1,
    governmentName: 'Republia',
    loyalty: 0,
    readers: 200,
    screen: MorningScreen
  }

  render () {
    const { screen: Screen, ...gameState } = this.state
    return <Screen {...gameState} />
  }
}
