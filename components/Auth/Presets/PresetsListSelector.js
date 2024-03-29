import cn from 'classnames'
import React, { useContext, useEffect, useRef } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

const PresetsListSelector = ({ closeSaveDelete }) => {
  const [{ presets, currentPreset }, updateState] = useContext(CTX)

  const containerRef = useRef()

  const handleSelection = (e) => {
    if (e.target.id !== currentPreset?.name) {
      const payload = presets.find((p) => p._id === e.target.id)
      if (payload) updateState({ type: 'LOAD_PRESET', payload })
      closeSaveDelete()
    }
  }

  useEffect(() => {
    if (containerRef.current && containerRef.current.childNodes) {
      let selectedNode
      for (let child of containerRef.current.childNodes) {
        if (child.id === currentPreset._id) {
          selectedNode = child
          break
        }
      }
      if (selectedNode)
        selectedNode.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentPreset])

  return (
    <div ref={containerRef} className={styles.presetListSelector}>
      {presets.map((preset, i) => (
        <div
          key={preset.name}
          className={cn(
            styles.presetOption,
            preset.name === currentPreset?.name && styles.current,
            presets.length > 4 && i === presets.length - 1 && styles.lastOption
          )}
          onClick={handleSelection}
          id={preset._id}>
          {preset.name}
        </div>
      ))}
    </div>
  )
}

export default PresetsListSelector
