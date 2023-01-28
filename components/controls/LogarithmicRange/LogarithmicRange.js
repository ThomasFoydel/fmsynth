import React from 'react'
import LogRange from './input-range/range'

const LogarithmicSlider = ({ onChange, maxVal, label, value }) => {
  return <LogRange onChange={onChange} maxval={maxVal} label={label} value={value} />
}

export default LogarithmicSlider
