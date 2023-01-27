import React, { useContext } from 'react'
import LogarithmicSlider from '../LogarithmicSlider/LogarithmicSlider'
import { CTX } from '../../../context/Store'
import styles from './LfoFilter.module.scss'
import Selector from '../Selector/Selector'
import Slider from '../Slider/Slider'

const LfoFilter = () => {
  const [appState, updateState] = useContext(CTX)

  const handleMix = (e) => {
    e.value /= 100
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'wet', value: e.value },
    })
  }

  const handleDepth = (e) => {
    e.value /= 100
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'depth', value: e.value },
    })
  }

  const handleType = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'type', value: e.value },
    })
  }

  const handleRate = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'frequency', value: e.value },
    })
  }

  const handleBaseFrequency = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'baseFrequency', value: e },
    })
  }

  const handleOctaves = (e) => {
    let { value } = e
    value /= 10
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'octaves', value },
    })
  }

  const handleFilter = (e, stateProp) => {
    let { prop, value } = e
    updateState({
      type: 'CHANGE_LFO_FILTER_FILTER',
      payload: { prop, value, stateProp },
    })
  }

  return (
    <div className={styles.lfoFilter}>
      <div className={styles.title}>lfo filter</div>
      <div className={styles.selectors}>
        <div className={styles.param}>
          <Selector
            onChange={handleType}
            size="medium"
            value={appState.lfoFilter.type}
            options={[
              { text: 'sine', value: 'sine' },
              { text: 'sawtooth', value: 'sawtooth' },
              { text: 'square', value: 'square' },
              { text: 'triangle', value: 'triangle' },
            ]}
          />
        </div>
        <div className={styles.param}>
          <Selector
            onChange={handleRate}
            size="medium"
            value={appState.lfoFilter.frequency}
            options={[
              { text: '1n', value: '1n' },
              // { text: '1d', value: '1n.' },
              { text: '1t', value: '1t' },

              { text: '2n', value: '2n' },
              // { text: '2d', value: '2n.' },
              { text: '2t', value: '2t' },

              { text: '4n', value: '4n' },
              // { text: '4d', value: '4n.' },
              { text: '4t', value: '4t' },

              { text: '8n', value: '8n' },
              // { text: '8d', value: '8n.' },
              { text: '8t', value: '8t' },

              { text: '16n', value: '16n' },
              // { text: '16d', value: '16n.' },
              { text: '16t', value: '16t' },

              { text: '32n', value: '32n' },
              // { text: '32d', value: '32n.' },
              { text: '32t', value: '32t' },

              { text: '64n', value: '64n' },
              // { text: '64d', value: '64n.' },
              { text: '64t', value: '64t' },
            ]}
          />
        </div>
        <div className={styles.param}>
          <Selector
            size="medium"
            onChange={(e) => handleFilter({ value: e.value, prop: 'filterType' }, 'filterType')}
            value={appState.lfoFilter.filterType}
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
            onChange={(e) => handleFilter({ value: e.value, prop: 'rolloff' }, 'filterRolloff')}
            size="medium"
            value={appState.lfoFilter.filterRolloff}
            options={[
              { text: '-12', value: -12 },
              { text: '-24', value: -24 },
              { text: '-48', value: -48 },
            ]}
          />
        </div>
      </div>
      <div className={styles.basefreqSlider}>
        <LogarithmicSlider
          onChange={handleBaseFrequency}
          maxVal={20000}
          initVal={appState.lfoFilter.baseFrequency.value}
          label="Hz"
        />
      </div>

      <div className={styles.sliders}>
        <div className={styles.slider}>
          <Slider
            onChange={handleMix}
            value={appState.lfoFilter.wet * 100}
            min={0}
            max={100}
            step={1}
            property="wet"
          />
          <div className={styles.paramName}>mix</div>
        </div>
        <div className={styles.slider}>
          <Slider
            onChange={handleDepth}
            value={appState.lfoFilter.depth * 100}
            min={0}
            max={100}
            step={1}
            property="depth"
          />
          <div className={styles.paramName}>depth</div>
        </div>
        <div className={styles.slider}>
          <Slider
            onChange={handleOctaves}
            value={appState.lfoFilter.octaves}
            min={0}
            max={100}
            step={1}
            property="octaves"
          />
          <div className={styles.paramName}>range</div>
        </div>
        <div className={styles.slider}>
          <Slider
            onChange={(e) => handleFilter(e, 'filterQ')}
            value={appState.lfoFilter.filterQ}
            min={0}
            max={100}
            step={1}
            property="Q"
          />
          <div className={styles.paramName}>Q</div>
        </div>
      </div>
    </div>
  )
}

export default LfoFilter
