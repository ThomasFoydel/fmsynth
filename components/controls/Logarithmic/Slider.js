import React from 'react'
import { toast } from 'react-toastify'
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
      return toast.error('pass an onChange method to <LogarithmicSlider />')
    }
    onChange({ value, logValue: calcPos(log, value) })
  }

  const formatLabel = (value) => `${calcPos(log, value)}${label}`

  return (
    <InputRange
      step={1}
      formatLabel={formatLabel}
      maxValue={100}
      minValue={0}
      value={value}
      onChange={handleChange}
    />
  )
}

export default LogarithmicSlider
