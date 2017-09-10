// @flow
import React from 'react'
import { default as svgProps, type Props } from './svg-props'

const SpeakerIcon = (props: Props) =>
  <svg {...svgProps(props)} viewBox='0 0 50 50'>
    <path
      fill='currentColor'
      d='M0 15h15v-5h5v-5h5v-5h5v50h-5v-5h-5v-5h-5v-5h-15z'
    />
  </svg>

export default SpeakerIcon
