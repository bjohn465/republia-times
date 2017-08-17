// @flow
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import SRContent from '../screen-reader-content'
import soundOn from './sound-on.png'
import soundOff from './sound-off.png'
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

    return (
      <label className={classnames(
        styles.audioControls,
        this.state.hasFocus && styles.focused
      )}>
        <img
          aria-hidden
          className={styles.controlImage}
          src={isOn ? soundOn : soundOff}
        />
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
