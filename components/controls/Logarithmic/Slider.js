import React from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import Log, { calcPos } from './log'

const LogarithmicSlider = ({
  value = 0,
  minPos,
  maxPos,
  minVal,
  maxVal,
  label,
  onChange
}) => {
  const log = new Log({
    minPos: minPos || 0,
    maxPos: maxPos || 100,
    minVal: minVal || 5,
    maxVal: maxVal || 1600
  })

  const handleChange = (value) => {
    if (!onChange) {
      return console.error('pass an onChange method to <LogarithmicSlider />')
    }
    onChange({ value, logValue: calcPos(log, value) })
  }

  const formatLabel = (value) => `${calcPos(log, value)}${label}`

  return (
    <RangeInput
      value={value}
      onChange={handleChange}
      formatLabel={formatLabel}
    />
  )
}

const RangeInput = ({ value, onChange, formatLabel, initVal }) => (
  <InputRange
    step={1}
    formatLabel={formatLabel}
    maxValue={100}
    minValue={0}
    value={value}
    initVal={initVal}
    onChange={onChange}
  />
)

export default LogarithmicSlider
