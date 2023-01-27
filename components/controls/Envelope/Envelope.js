import React, { useContext } from 'react'
import InputRange from 'react-input-range'
import { CTX } from '../../../context/Store'
import styles from './Envelope.module.scss'

const Envelope = () => {
  const [appState, updateState] = useContext(CTX)

  const handleChange = (value, prop) => {
    if (value === 0) value = 0.1
    updateState({ type: 'CHANGE_ENVELOPE', payload: { value, prop } })
  }

  const values = [
    { name: 'attack', max: 5 },
    { name: 'decay', max: 10 },
    { name: 'sustain', max: 5 },
    { name: 'release', max: 5 }
  ]

  return (
    <div className={styles.envelope}>
      {values.map(({ name, max }) => (
        <div key={name}>
          <div className={styles.param}>
            <div className={styles.paramName}>{name}</div>
            <InputRange
              step={0.1}
              minValue={0.1}
              onChange={(e) => handleChange(e, name)}
              maxValue={max}
              value={appState.envelope[name]}
            />
          </div>
          <div className={styles.valueDisplay}>
            {appState.envelope[name].toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Envelope
