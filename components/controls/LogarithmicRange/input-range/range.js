import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import Log from '../logarithmic/log'

const calcPos = (log, pos) => {
  if (pos === 0) return 0
  const val = log.value(pos)
  if (val > 1000) return Math.round(val / 100) * 100
  if (val > 500) return Math.round(val / 10) * 10
  return Math.round(val)
}

const LogarithmicRange = ({
  value = { highFrequency: 50, lowFrequency: 0 },
  minpos = 0,
  maxpos = 100,
  minval = 5,
  maxval = 1600,
  label,
  onChange
}) => {
  const { highFrequency: max, lowFrequency: min } = value

  const log = new Log({
    minval,
    maxval,
    minpos,
    maxpos
  })

  const handleChange = ({ min, max }) => {
    if (!onChange) {
      return console.error('LogarithmicRange requires an onChange ethod')
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
    <RangeInput
      value={{ min, max }}
      onChange={handleChange}
      formatLabel={formatLabel}
    />
  )
}

const RangeInput = ({ value, onChange, formatLabel }) => (
  <InputRange
    step={1}
    formatLabel={formatLabel}
    maxValue={100}
    minValue={0}
    value={value}
    onChange={onChange}
  />
)

export default LogarithmicRange
