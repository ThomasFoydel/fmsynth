import React, { useContext } from 'react'
import InputRange from 'react-input-range'
import styles from './CombFilter.module.scss'
import { CTX } from '../../../context/Store'
import Selector from '../Selector/Selector'
import Slider from '../Slider/Slider'

const CombFilter = () => {
  const [appState, updateState] = useContext(CTX)

  const handleChange = (e) => {
    e /= 100
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value: e, prop: 'resonance' }
    })
  }

  const handleDelay = (e) => {
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value: e.value, prop: 'delayTime' }
    })
  }

  const handleMix = (e) => {
    let { value, prop } = e
    value /= 100
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value, prop }
    })
  }
  return (
    <div className={styles.combFilter}>
      <div className='flex'>
        <div>
          <div className={styles.delaySelector}>
            <Selector
              onChange={handleDelay}
              value={appState.combFilter.delayTime}
              options={[
                { text: '2n', value: '2n' },
                { text: '2t', value: '2t' },
                { text: '4n', value: '4n' },
                { text: '4t', value: '4t' },
                { text: '8n', value: '8n' },
                { text: '8t', value: '8t' },
                { text: '16n', value: '16n' },
                { text: '16t', value: '16t' },
                { text: '32n', value: '32n' },
                { text: '32t', value: '32t' },
                { text: '64n', value: '64n' },
                { text: '64t', value: '64t' },
                { text: '128n', value: '128n' },
                { text: '128t', value: '128t' }
              ]}
            />
          </div>

          <div className={styles.resonance}>
            <InputRange
              value={Math.floor(appState.combFilter.resonance * 100)}
              maxValue={100}
              type='range'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.mixSlider}>
          <div className={styles.name}>comb delay</div>
          <Slider
            onChange={handleMix}
            value={appState.combFilter.wet * 100}
            min={0}
            max={100}
            step={1}
            property='wet'
          />
        </div>
      </div>
      <div className={styles.resonanceName}>resonance</div>
    </div>
  )
}

export default CombFilter
