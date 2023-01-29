import cn from 'classnames'
import React, { useContext, useEffect, useRef } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

const PresetsListSelector = ({ closeSaveDelete }) => {
  const [{ presets, currentPreset }, updateState] = useContext(CTX)

  const containerRef = useRef()

  const handleSelection = (e) => {
    const name = e.target.id
    if (name !== currentPreset?.name) {
      const payload = presets.find((p) => p.name === name)
      if (payload) updateState({ type: 'LOAD_PRESET', payload })
      closeSaveDelete()
    }
  }

  useEffect(() => {
    if (containerRef.current && containerRef.current.childNodes) {
      let selectedNode
      for (let child of containerRef.current.childNodes) {
        if (child.textContent === currentPreset.name) {
          selectedNode = child
          break
        }
      }
      if (selectedNode) selectedNode.scrollIntoView({ behavior: 'smooth' })
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
          id={preset.name}>
          {preset.name}
        </div>
      ))}
    </div>
  )
}

export default PresetsListSelector
