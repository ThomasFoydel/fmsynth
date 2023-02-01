import cn from 'classnames'
import React, { useContext } from 'react'
import InputRange from 'react-input-range'
import dino from '../../../assets/images//dino.png'
import dino2 from '../../../assets/images/dino2.png'
import { CTX } from '../../../context/Synth/SynthProvider'
import Selector from '../Selector/Selector'
import styles from './Dino.module.scss'

const Dino = () => {
  const [{ nodes, fm1Settings }, updateState] = useContext(CTX)
  const keysPressed = nodes.length > 0

  const handleFmOffset = (payload) => {
    updateState({ type: 'CHANGE_FM_FREQ_OFFSET', payload })
  }

  const handleFmWaveTableChange = ({ value }) => {
    updateState({ type: 'CHANGE_FM_WAVETABLE', payload: value })
  }

  const handleFmGain = (payload) => {
    updateState({ type: 'CHANGE_FM_GAIN', payload })
  }

  return (
    <div className={styles.dinoPage}>
      <div className={cn(styles.dinoContainer, 'center')}>
        <div className={styles.frequencyModulator}>
          <div className={styles.name}>frequency modulator</div>
          <div className={styles.wavetableSelector}>
            <Selector
              onChange={handleFmWaveTableChange}
              value={fm1Settings.type}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' }
              ]}
            />
          </div>
          <div className={cn(styles.param, styles.frequency)}>
            <InputRange
              formatLabel={(value) => `${value}Hz`}
              step={10}
              maxValue={1000}
              minValue={0}
              value={fm1Settings.freqOffset}
              onChange={handleFmOffset}
              showToolTip={false}
            />
            <div className={cn(styles.paramName, 'center')}>frequency</div>
          </div>
          <div className={cn(styles.param, styles.gain)}>
            <InputRange
              formatLabel={(value) => `${value}`}
              step={10}
              maxValue={1000}
              minValue={10}
              value={fm1Settings.gain}
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
              filter: `hue-rotate(${(fm1Settings.freqOffset / 1000) * 360}deg)`,
              transform: `scale(${
                (fm1Settings.gain / 1000) * 0.1 + 0.6
              }) rotate(${(fm1Settings.freqOffset / 1000) * 180}deg)`
            }}
            src={keysPressed ? dino.src : dino2.src}
            alt='dinosaur with boxing gloves'
          />
        </div>
      </div>
    </div>
  )
}

export default Dino
