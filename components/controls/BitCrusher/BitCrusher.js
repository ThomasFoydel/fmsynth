import React, { useContext } from 'react'
import styles from './BitCrusher.module.scss'
import { CTX } from '../../../context/Store'
import Slider from '../Slider/Slider'

const BitCrusher = () => {
  const [appState, updateState] = useContext(CTX)

  const handleDepth = (e) => {
    updateState({ type: 'CHANGE_BITCRUSH_DEPTH', payload: e.value })
  }

  const handleMix = (e) => {
    let { value } = e
    value /= 100
    updateState({ type: 'CHANGE_BITCRUSH_MIX', payload: value })
  }

  return (
    <div className={styles.bitcrusher}>
      <h4 className={styles.titleName}>bitcrusher</h4>
      <div className={styles.slidersContainer}>
        <div className={styles.param}>
          <div className={styles.name}>depth</div>

          <div className={styles.slider}>
            <Slider
              onChange={handleDepth}
              value={appState.bitCrusher.depth}
              property="depth"
              max={8}
            />
          </div>
        </div>

        <div className={styles.param}>
          <div className={styles.name}>mix</div>
          <div className={styles.slider}>
            <Slider
              onChange={handleMix}
              value={appState.bitCrusher.wet * 100}
              property="wet"
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BitCrusher
