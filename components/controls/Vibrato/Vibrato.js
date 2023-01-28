import React, { useContext } from 'react'
import { CTX } from '../../../context/SynthProvider/Store'
import styles from './Vibrato.module.scss'
import Slider from '../Slider/Slider'

const Vibrato = () => {
  const [{ vibrato }, updateState] = useContext(CTX)

  const updateVibrato = (prop, value) =>
    updateState({
      type: 'CHANGE_VIBRATO',
      payload: { prop, value: +value.toFixed(1) }
    })

  const handleDepth = ({ value }) => updateVibrato('depth', value)

  const handleMix = ({ value }) => updateVibrato('wet', value)

  return (
    <div className={styles.vibrato}>
      <h4 className={styles.titleName}>vibrato</h4>
      <div className={styles.slidersContainer}>
        <div className={styles.param}>
          <div className={styles.name}>depth</div>

          <div className={styles.slider}>
            <Slider
              onChange={handleDepth}
              value={vibrato.depth}
              property='depth'
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </div>

        <div className={styles.param}>
          <div className={styles.name}>mix</div>
          <div className={styles.slider}>
            <Slider
              onChange={handleMix}
              value={vibrato.wet}
              property='wet'
              max={1}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vibrato
