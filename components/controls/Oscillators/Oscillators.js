import React from 'react'
import styles from './Oscillators.module.scss'
import Selector from '../Selector/Selector'
import { CTX } from '../../../context/SynthProvider/Store'
import Slider from '../Slider/Slider'
import cn from 'classnames'

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX)

  const changeOsc1 = (e) => {
    let { value, prop } = e
    updateState({ type: 'CHANGE_OSC1', payload: { value, prop } })
  }

  const changeOsc1Gain = (e) => {
    let { value } = e
    value /= 100
    updateState({ type: 'CHANGE_OSC1_GAIN', payload: value })
  }

  const changeOsc2 = (e) => {
    let { value, prop } = e
    updateState({ type: 'CHANGE_OSC2', payload: { value, prop } })
  }

  const changeOsc2Gain = (e) => {
    let { value } = e
    value /= 100
    updateState({ type: 'CHANGE_OSC2_GAIN', payload: value })
  }

  const changeSubOsc = (e) => {
    let { value, prop } = e
    updateState({
      type: 'CHANGE_SUB_OSC',
      payload: { prop, value },
    })
  }

  const changeSubOscGain = (e) => {
    let { value } = e
    value /= 100
    updateState({
      type: 'CHANGE_SUB_OSC_GAIN',
      payload: { value, prop: 'gain' },
    })
  }

  const changeNoise = (e) => {
    updateState({
      type: 'CHANGE_NOISE',
      payload: { prop: 'type', value: e.value },
    })
  }

  const changeNoiseGain = (e) => {
    let { value } = e
    value /= 100
    updateState({
      type: 'CHANGE_NOISE_GAIN',
      payload: { prop: 'gain', value },
    })
  }

  return (
    <div className={styles.osc1Controller}>
      <div className={styles.section1}>
        <div className={styles.osc}>
          <div className={styles.oscName}>osc 1</div>
          <div className={styles.oscSelector}>
            <Selector
              onChange={(e) => changeOsc1({ value: e.value, prop: 'type' })}
              value={appState.osc1Settings.type}
              size="small"
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />{' '}
          </div>
          <div className={styles.oscSelector}>
            <Selector
              onChange={(e) => changeOsc1({ value: e.value, prop: 'octaveOffset' })}
              value={appState.osc1Settings.octaveOffset}
              size="small"
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>
          <div className={styles.sliders}>
            <div className={styles.param}>
              <div className={styles.propLabel}>detune</div>
              <div className={styles.oscSlider}>
                <Slider
                  property="detune"
                  min={-30}
                  max={30}
                  onChange={changeOsc1}
                  value={appState.osc1Settings.detune}
                />
              </div>
            </div>
            <div className={styles.param}>
              <div className={styles.propLabel}>gain</div>
              <div className={styles.oscSlider}>
                <Slider
                  property="gain"
                  max={100}
                  onChange={changeOsc1Gain}
                  value={appState.osc1Settings.gain * 100}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.osc}>
          <div className={cn('center', styles.oscName)}>osc 2</div>
          <div className={styles.oscSelector}>
            <Selector
              size="small"
              value={appState.osc2Settings.type}
              onChange={(e) => changeOsc2({ value: e.value, prop: 'type' })}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className={styles.oscSelector}>
            <Selector
              onChange={(e) => changeOsc2({ value: e.value, prop: 'octaveOffset' })}
              value={appState.osc2Settings.octaveOffset}
              size="small"
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>
          <div className={styles.sliders}>
            <div className={styles.param}>
              <div className={styles.propLabel}>detune</div>
              <div className={styles.oscSlider}>
                <Slider
                  property="detune"
                  min={-30}
                  max={30}
                  onChange={changeOsc2}
                  value={appState.osc2Settings.detune}
                />{' '}
              </div>
            </div>

            <div className={styles.param}>
              <div className={styles.propLabel}>gain</div>
              <div className={styles.oscSlider}>
                <Slider
                  property="gain"
                  max={100}
                  onChange={changeOsc2Gain}
                  value={appState.osc2Settings.gain * 100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles.osc}>
          <div className={cn('center', styles.oscName)}>sub osc</div>
          <div className={styles.oscSelector}>
            <Selector
              size="small"
              value={appState.subOscSettings.type}
              onChange={(e) => changeSubOsc({ value: e.value, prop: 'type' })}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className={styles.oscSelector}>
            <Selector
              onChange={(e) => changeSubOsc({ value: e.value, prop: 'octaveOffset' })}
              value={appState.subOscSettings.octaveOffset}
              size="small"
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>

          <div className={cn(styles.param, 'center')}>
            <div className={styles.propLabel}>gain</div>
            <div className={styles.oscSlider}>
              <Slider
                property="gain"
                max={100}
                onChange={changeSubOscGain}
                value={appState.subOscSettings.gain * 100}
              />
            </div>
          </div>
        </div>

        <div className={styles.osc}>
          <div className={cn('center', styles.oscName)}>noise</div>
          <div className={cn(styles.oscSelector, styles.noiseSelector)}>
            <Selector
              size="small"
              value={appState.noiseSettings.type}
              onChange={(e) => changeNoise({ value: e.value, prop: 'type' })}
              options={[
                { text: 'white', value: 'white' },
                { text: 'pink', value: 'pink' },
                { text: 'brown', value: 'brown' },
              ]}
            />
          </div>

          <div className={cn(styles.param, 'center')}>
            <div className={styles.propLabel}>gain</div>
            <div className={styles.oscSlider}>
              <Slider
                property="gain"
                max={100}
                onChange={changeNoiseGain}
                value={appState.noiseSettings.gain * 100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Oscillator1Controller
