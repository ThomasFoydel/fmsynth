import React, { useContext } from 'react'
import styles from './Distortion.module.scss'
import { CTX } from '../../../context/SynthProvider/Store'
import Selector from '../Selector/Selector'
import Slider from '../Slider/Slider'

const Distortion = () => {
  const [appState, updateState] = useContext(CTX)

  const handleMix = ({ value }) => {
    value /= 100
    updateState({ type: 'CHANGE_DISTORTION_MIX', payload: value })
  }

  const handleOversample = ({ value }) => {
    updateState({ type: 'CHANGE_DISTORTION_OVERSAMPLE', payload: value })
  }

  const handleDistortion = ({ value }) => {
    updateState({ type: 'CHANGE_DISTORTION_AMOUNT', payload: value })
  }

  return (
    <div className={styles.distortion}>
      <div className={styles.titleName}>distortion</div>
      <div className={styles.slidersContainer}>
        <div className={styles.param}>
          <div className={styles.name}>oversample</div>
          <Selector
            value={appState.distortion.oversample}
            onChange={handleOversample}
            size='small'
            options={[
              { text: 'none', value: 'none' },
              { text: '2x', value: '2x' },
              { text: '4x', value: '4x' }
            ]}
          />
        </div>

        <div className={styles.param}>
          <div className={styles.name}>mix</div>
          <Slider
            onChange={handleMix}
            value={appState.distortion.wet * 100}
            property='wet'
            max={100}
          />
        </div>
        <div className={styles.param}>
          <div className={styles.name}>amount</div>
          <Slider
            onChange={handleDistortion}
            value={appState.distortion.distortion}
            property='wet'
            max={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Distortion
