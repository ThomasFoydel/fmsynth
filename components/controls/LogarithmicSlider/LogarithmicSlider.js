import React from 'react'
import LogRange from './input-range/range'

const LogarithmicSlider = ({ onChange, maxVal, label, initVal }) => {
  return <LogRange onChange={onChange} maxval={maxVal} label={label} initVal={initVal} />
}

export default LogarithmicSlider
