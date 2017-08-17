// @flow
import React, { PureComponent } from 'react'

type Props = {|
  isOn: boolean,
  src: string,
  volume: number
|}

export default class BackgroundMusic extends PureComponent<Props> {
  static defaultProps = {
    volume: 0.5
  }

  componentDidMount () {
    if (this.el) {
      // eslint-disable-next-line immutable/no-mutation
      this.el.volume = this.props.volume
    }
  }

  componentDidUpdate (prevProps: Props) {
    const { isOn, volume } = this.props

    if (prevProps.isOn && !isOn) {
      this.el && this.el.pause()
    } else if (!prevProps.isOn && isOn) {
      this.el && this.el.play()
    }

    if (prevProps.volume !== volume && this.el) {
      this.el.volume = volume // eslint-disable-line immutable/no-mutation
    }
  }

  el: ?HTMLAudioElement
  setRef = (el: ?HTMLAudioElement) => {
    this.el = el // eslint-disable-line immutable/no-mutation
  }

  render () {
    const { isOn, src } = this.props

    return (
      <audio
        autoPlay={isOn}
        loop
        ref={this.setRef}
        src={src}
      />
    )
  }
}
