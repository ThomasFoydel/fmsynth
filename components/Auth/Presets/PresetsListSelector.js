import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

const PresetsListSelector = ({ closeSaveDelete }) => {
  const [appState, updateState] = useContext(CTX)
  const presets = appState.presets

  const handleSelection = (e) => {
    const { id } = e.target
    if (id !== appState.currentPreset) {
      updateState({ type: 'LOAD_PRESET', payload: id })
      closeSaveDelete()
    }
  }

  return (
    <div className={styles.presetListSelector}>
      {presets.map((preset) => (
        <div
          key={preset.name}
          className={cn(
            styles.presetOption,
            preset.name === appState.currentPreset && styles.current
          )}
          onClick={handleSelection}
          id={preset.name}>
          {preset.name}
        </div>
      ))}
    </div>
  )
}

export default PresetsListSelector
