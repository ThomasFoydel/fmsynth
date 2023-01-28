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
      const presetParams = presets.filter((preset) => preset.text === id)
      updateState({
        type: 'LOAD_PRESET',
        payload: { value: presetParams[0].value },
        text: id
      })
      closeSaveDelete()
    }
  }
  return (
    <div className={styles.presetListSelector}>
      {presets.map((preset) => (
        <div
          key={preset.text}
          className={cn(
            styles.presetOption,
            preset.text === appState.currentPreset && styles.current
          )}
          onClick={handleSelection}
          id={preset.text}>
          {preset.text}
        </div>
      ))}
    </div>
  )
}

export default PresetsListSelector
