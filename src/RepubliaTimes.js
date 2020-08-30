import React, { useState } from 'react'
import MorningScreen from './MorningScreen'

export default function RepubliaTimes() {
  const [screen, setScreen] = useState('morning')
  const onStartWork = () => {
    setScreen('work')
  }

  return (
    <>
      {screen === 'morning' && <MorningScreen onStartWork={onStartWork} />}
      {screen === 'work' && <div />}
    </>
  )
}
