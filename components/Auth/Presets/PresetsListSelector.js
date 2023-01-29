import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

const PresetsListSelector = ({ closeSaveDelete }) => {
  const [appState, updateState] = useContext(CTX)
  const presets = appState.presets

  const handleSelection = (e) => {
    const name = e.target.id
    if (name !== appState.currentPreset?.name) {
      const payload = appState.presets.find((p) => p.name === name)
      updateState({ type: 'LOAD_PRESET', payload })
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
            preset.name === appState.currentPreset?.name && styles.current
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
