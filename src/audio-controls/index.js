// @flow
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import SRContent from '../screen-reader-content'
import SpeakerIcon from '../icon/speaker'
import SpeakerWithSoundIcon from '../icon/speaker-with-sound'
import styles from './index.css'

export default class AudioControls extends PureComponent<{|
  isOn: boolean,
  onChange: (isOn: boolean) => any
|}, {|
  hasFocus: boolean
|}> {
  state = {
    hasFocus: false
  }

  handleBlur = () => {
    this.setState(() => ({
      hasFocus: false
    }))
  }

  handleChange = (event: SyntheticInputEvent<>) => {
    this.props.onChange(event.target.checked)
  }

  handleFocus = () => {
    this.setState(() => ({
      hasFocus: true
    }))
  }

  render () {
    const { isOn } = this.props
    const Icon = isOn ? SpeakerWithSoundIcon : SpeakerIcon

    return (
      <label className={classnames(
        styles.audioControls,
        this.state.hasFocus && styles.focused
      )}>
        <Icon className={styles.controlIcon} />
        <SRContent>
          <input
            type='checkbox'
            name='audioControls'
            checked={isOn}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          Toggle sound on (checked) and off (unchecked)
        </SRContent>
      </label>
    )
  }
}
