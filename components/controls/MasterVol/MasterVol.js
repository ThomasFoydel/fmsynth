import React, { useContext } from 'react'
import { CTX } from '../../../context/Store'
import Slider from '../Slider/Slider'
import styles from './MasterVol.module.scss'

const MasterVol = () => {
  const [appState, updateState] = useContext(CTX)
  const handleVol = (e) => {
    let { value } = e
    updateState({ type: 'CHANGE_MASTER_VOLUME', payload: value })
  }

  return (
    <div className={styles.masterVol}>
      <div>master volume</div>
      <Slider onChange={handleVol} value={appState.masterVol} property="volume" max={0} min={-50} />
    </div>
  )
}

export default MasterVol
