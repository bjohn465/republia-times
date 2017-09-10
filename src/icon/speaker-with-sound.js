// @flow
import React from 'react'
import { default as svgProps, type Props } from './svg-props'

const SpeakerWithSoundIcon = (props: Props) =>
  <svg {...svgProps(props)} viewBox='0 0 50 50'>
    <path
      fill='currentColor'
      d='
        M0 15h15v-5h5v-5h5v-5h5v50h-5v-5h-5v-5h-5v-5h-15z
        M35 15h5v20h-5zM40 0h5v5h5v40h-5v5h-5v-5h5v-40h-5z
      '
    />
  </svg>

export default SpeakerWithSoundIcon
