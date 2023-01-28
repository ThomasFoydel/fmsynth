import React, { useContext } from 'react'
import LogarithmicRange from '../Logarithmic/Range'
import { CTX } from '../../../context/Synth/SynthProvider'
import Slider from '../Slider/Slider'
import styles from './EQ.module.scss'

const EQ = () => {
  const [appState, updateState] = useContext(CTX)

  const handleGain = (payload) => {
    updateState({ type: 'CHANGE_EQ_GAIN', payload })
  }
  const handleRange = (payload) => {
    updateState({ type: 'CHANGE_EQ_RANGE', payload })
  }
  return (
    <div className={styles.EQ}>
      <div className={styles.rangeSlider}>
        <LogarithmicRange
          onChange={handleRange}
          label={'Hz'}
          maxVal={20000}
          value={appState.EQ}
        />
        <div className={styles.titleName}>EQ</div>
      </div>
      <div className={styles.sliders}>
        <div className={styles.param}>
          <Slider
            onChange={handleGain}
            value={appState.EQ.low}
            min={0}
            max={24}
            step={1}
            property='low'
          />
          <div className={styles.label}>low</div>
        </div>
        <div className={styles.param}>
          <Slider
            onChange={handleGain}
            value={appState.EQ.mid}
            min={0}
            max={24}
            step={1}
            property='mid'
          />
          <div className={styles.label}>mid</div>
        </div>
        <div className={styles.param}>
          <Slider
            onChange={handleGain}
            value={appState.EQ.high}
            min={0}
            max={24}
            step={1}
            property='high'
          />
          <div className={styles.label}>high</div>
        </div>
      </div>
    </div>
  )
}

export default EQ
