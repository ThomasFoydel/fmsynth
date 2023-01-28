import React, { useContext } from 'react'
import LogarithmicSlider from '../Logarithmic/Slider'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './LfoFilter.module.scss'
import Selector from '../Selector/Selector'
import Slider from '../Slider/Slider'

const LfoFilter = () => {
  const [appState, updateState] = useContext(CTX)

  const updateFilter = (prop, value) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop, value }
    })
  }

  const handleMix = ({ value }) => updateFilter('wet', value)

  const handleDepth = ({ value }) => updateFilter('depth', value)

  const handleType = ({ value }) => updateFilter('type', value)

  const handleRate = ({ value }) => updateFilter('frequency', value)

  const handleBFrequency = (value) => updateFilter('baseFrequency', value)

  const handleOctaves = ({ value }) => updateFilter('octaves', value)

  const handleFilter = ({ prop, value }, stateProp) => {
    updateState({
      type: 'CHANGE_LFO_FILTER_FILTER',
      payload: { prop, value, stateProp }
    })
  }

  const handleQ = (e) => handleFilter(e, 'filterQ')

  const sliders = [
    {
      name: 'mix',
      handleChange: handleMix,
      property: 'wet',
      max: 1,
      step: 0.1
    },
    {
      name: 'depth',
      handleChange: handleDepth,
      property: 'depth',
      max: 1,
      step: 0.1
    },
    {
      name: 'range',
      handleChange: handleOctaves,
      property: 'octaves',
      max: 8,
      step: 0.5
    },
    {
      name: 'Q',
      handleChange: handleQ,
      property: 'filterQ',
      max: 10,
      step: 0.5
    }
  ]

  return (
    <div className={styles.lfoFilter}>
      <div className={styles.title}>lfo filter</div>
      <div className={styles.selectors}>
        <div className={styles.param}>
          <Selector
            onChange={handleType}
            size='medium'
            value={appState.lfoFilter.type}
            options={[
              { text: 'sine', value: 'sine' },
              { text: 'sawtooth', value: 'sawtooth' },
              { text: 'square', value: 'square' },
              { text: 'triangle', value: 'triangle' }
            ]}
          />
        </div>
        <div className={styles.param}>
          <Selector
            onChange={handleRate}
            size='medium'
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
              { text: '64t', value: '64t' }
            ]}
          />
        </div>
        <div className={styles.param}>
          <Selector
            size='medium'
            onChange={(e) =>
              handleFilter({ value: e.value, prop: 'filterType' }, 'filterType')
            }
            value={appState.lfoFilter.filterType}
            options={[
              { text: 'lowpass', value: 'lowpass' },
              { text: 'highpass', value: 'highpass' },
              { text: 'bandpass', value: 'bandpass' },
              { text: 'lowshelf', value: 'lowshelf' },
              { text: 'highshelf', value: 'highshelf' },
              { text: 'allpass', value: 'allpass' },
              { text: 'peaking', value: 'peaking' }
            ]}
          />
        </div>
        <div className={styles.param}>
          <Selector
            onChange={(e) =>
              handleFilter({ value: e.value, prop: 'rolloff' }, 'filterRolloff')
            }
            size='medium'
            value={appState.lfoFilter.filterRolloff}
            options={[
              { text: '-12', value: -12 },
              { text: '-24', value: -24 },
              { text: '-48', value: -48 }
            ]}
          />
        </div>
      </div>
      <div className={styles.basefreqSlider}>
        <LogarithmicSlider
          onChange={handleBFrequency}
          maxVal={20000}
          value={appState.lfoFilter.baseFrequency.value}
          label='Hz'
        />
      </div>

      <div className={styles.sliders}>
        {sliders.map(({ name, property, handleChange, max, step }) => (
          <div className={styles.slider} key={name}>
            <Slider
              onChange={handleChange}
              value={appState.lfoFilter[property]}
              min={0}
              max={max}
              step={step}
              property={property}
            />
            <div className={styles.paramName}>{name}</div>
          </div>
        ))}
        {/* <div className={styles.slider}>
          <Slider
            onChange={handleMix}
            value={appState.lfoFilter.wet * 100}
            min={0}
            max={100}
            step={1}
            property='wet'
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
            property='depth'
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
            property='octaves'
          />
          <div className={styles.paramName}>range</div>
        </div>
        <div className={styles.slider}>
          <Slider
            onChange={handleQ}
            value={appState.lfoFilter.filterQ}
            min={0}
            max={100}
            step={1}
            property='Q'
          />
          <div className={styles.paramName}>Q</div>
        </div> */}
      </div>
    </div>
  )
}

export default LfoFilter
