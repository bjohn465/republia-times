// @flow
import React, { PureComponent } from 'react'
import MorningScreen from '../morning-screen'

export default class RepubliaTimes extends PureComponent {
  state: GameState = {
    day: 1,
    governmentName: 'Republia',
    isSoundOn: false,
    loyalty: 0,
    readers: 200,
    screen: MorningScreen
  }

  handleSoundOnChange = (isSoundOn: boolean) => {
    this.setState(() => ({
      isSoundOn
    }))
  }

  render () {
    const { screen: Screen, ...gameState } = this.state
    return <Screen {...gameState} onSoundOnChange={this.handleSoundOnChange} />
  }
}
