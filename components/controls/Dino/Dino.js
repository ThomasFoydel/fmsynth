import cn from 'classnames'
import React, { useContext } from 'react'
import InputRange from 'react-input-range'
import dino from '../../../assets/images//dino.png'
import dino2 from '../../../assets/images/dino2.png'
import { CTX } from '../../../context/SynthProvider/Store'
import Selector from '../Selector/Selector'
import styles from './Dino.module.scss'

const Dino = () => {
  const [appState, updateState] = useContext(CTX)
  const keysPressed = appState.nodes.length > 0

  const handleFmOffset = (e) => {
    updateState({
      type: 'CHANGE_FM_FREQ_OFFSET',
      payload: e * 20,
    })
  }
  const handleFmWaveTableChange = (e) => {
    let { value } = e
    updateState({
      type: 'CHANGE_FM_WAVETABLE',
      payload: value,
    })
  }
  const handleFmGain = (e) => {
    if (e === 0) {
      e = 0.00001
    }

    updateState({
      type: 'CHANGE_FM_GAIN',
      payload: e * 100,
    })
  }

  return (
    <div className={styles.dinoPage}>
      <div className={cn(styles.dinoContainer, 'center')}>
        <div className={styles.frequencyModulator}>
          <div className={styles.name}>frequency modulator</div>
          <div className={styles.wavetableSelector}>
            <Selector
              onChange={handleFmWaveTableChange}
              value={appState.fm1Settings.type}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className={cn(styles.param, styles.frequency)}>
            <InputRange
              formatLabel={(value, type) => `${value * 20}Hz`}
              step={2}
              maxValue={100}
              minValue={0}
              value={appState.fm1Settings.freqOffset / 20}
              onChange={handleFmOffset}
              showToolTip={false}
            />
            <div className={cn(styles.paramName, 'center')}>frequency</div>
          </div>
          <div className={cn(styles.param, styles.gain)}>
            <InputRange
              formatLabel={(value, type) => `${value * 100}`}
              step={2}
              maxValue={100}
              minValue={0}
              value={appState.fm1Settings.gain / 100}
              onChange={handleFmGain}
            />
          </div>
          <div className={cn(styles.paramName, 'center')}>gain</div>
        </div>
        <div className={cn(styles.dinoInnerContainer, 'center')}>
          <img
            className={styles.dino}
            style={{
              transition: '0.6s ease all',
              filter: `hue-rotate(${(appState.fm1Settings.freqOffset / 2000) * 360}deg)`,
              transform: `scale(${(appState.fm1Settings.gain / 10000) * 0.1 + 0.6}) rotate(${
                (appState.fm1Settings.freqOffset / 2000) * 180
              }deg)`,
            }}
            src={keysPressed ? dino.src : dino2.src}
            alt="dinosaur with boxing gloves"
          />
        </div>
      </div>
    </div>
  )
}

export default Dino
