import { toast } from 'react-toastify'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import Log, { calcPos } from './log'

const Range = ({
  value = { highFrequency: 50, lowFrequency: 0 },
  minPos = 0,
  maxPos = 100,
  minVal = 5,
  maxVal = 1600,
  label,
  onChange
}) => {
  const { highFrequency: max, lowFrequency: min } = value

  const log = new Log({
    minVal,
    maxVal,
    minPos,
    maxPos
  })

  const handleChange = ({ min, max }) => {
    if (!onChange) {
      return toast.error('LogarithmicRange requires an onChange method')
    }

    const newVals = {
      min,
      max,
      logMin: calcPos(log, min),
      logMax: calcPos(log, max)
    }
    onChange(newVals)
  }

  const formatLabel = (value) => `${calcPos(log, value)}${label}`

  return (
    <InputRange
      step={1}
      formatLabel={formatLabel}
      maxValue={100}
      minValue={0}
      value={{ min, max }}
      onChange={handleChange}
    />
  )
}

export default Range
