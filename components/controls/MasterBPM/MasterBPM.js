import React, { useContext } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './MasterBPM.module.scss'
import Slider from '../Slider/Slider'

const MasterBPM = () => {
  const [appState, updateState] = useContext(CTX)
  const handleBPM = (e) => {
    updateState({ type: 'CHANGE_MASTER_BPM', payload: e.value })
  }
  return (
    <div className={styles.masterBpm}>
      <div>master tempo</div>
      <Slider onChange={handleBPM} value={appState.masterBpm} property="bpm" max={190} min={1} />
    </div>
  )
}

export default MasterBPM
