import React, { useContext } from 'react'
import LogarithmicSlider from '..LogarithmicSlider/LogarithmicSlider'
import { CTX } from '../../../context/SynthProvider/Store'
import Selector from '..Selector/Selector'
import styles from './Filter.module.scss'
import Slider from '../Slider/Slider'
import cn from 'classnames'

const Filter = () => {
  const [appState, updateState] = useContext(CTX)

  const handleFrequency = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e, prop: 'frequency' },
    })
  }

  const handleType = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'type' },
    })
  }

  const handleRolloff = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'rolloff' },
    })
  }

  const handleQ = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'Q' },
    })
  }

  return (
    <div className={cn(styles.filter, 'center')}>
      <div className={styles.grid}>
        <div className={styles.gridSection1}>
          <div className={cn(styles.typeSelector, 'center')}>
            <div className={styles.param}>
              <Selector
                size="medium"
                onChange={handleType}
                value={appState.filter.type}
                options={[
                  { text: 'lowpass', value: 'lowpass' },
                  { text: 'highpass', value: 'highpass' },
                  { text: 'bandpass', value: 'bandpass' },
                  { text: 'lowshelf', value: 'lowshelf' },
                  { text: 'highshelf', value: 'highshelf' },
                  { text: 'allpass', value: 'allpass' },
                  { text: 'peaking', value: 'peaking' },
                ]}
              />
            </div>
            <div className={styles.param}>
              <Selector
                size="medium"
                onChange={handleRolloff}
                value={appState.filter.rolloff}
                options={[
                  { text: '-12', value: -12 },
                  { text: '-24', value: -24 },
                  { text: '-48', value: -48 },
                  { text: '-96', value: -96 },
                ]}
              />
            </div>
          </div>
        </div>
        <div className={styles.gridSection2}>
          <div className={styles.qSlider}>
            <div className={styles.q}>Q</div>
            <Slider
              onChange={handleQ}
              // value={appState.lfoFilter.depth * 100}
              min={0}
              max={100}
              step={1}
              property="Q"
            />
          </div>
        </div>
        <div className={styles.gridSection3}>
          <div className={cn(styles.param, styles.frequency, 'center')}>
            <LogarithmicSlider
              onChange={handleFrequency}
              maxVal={20000}
              value={appState.filter.frequency}
              label="Hz"
            />
          </div>
          <div className={styles.name}>filter</div>
        </div>
      </div>
    </div>
  )
}

export default Filter
