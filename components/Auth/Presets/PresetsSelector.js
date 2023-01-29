import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

const PresetsSelector = ({ closeSaveDelete }) => {
  const [appState, updateState] = useContext(CTX)
  const { presets, currentPreset } = appState
  const currentIndex = presets.findIndex((p) => p.name === currentPreset.name)

  const handleSelector = (e) => {
    const { id } = e.target

    let newIndex
    if (id === 'left') {
      if (currentIndex > 0) newIndex = currentIndex - 1
      else newIndex = presets.length - 1
    } else if (id === 'right') {
      if (currentIndex < presets.length - 1) newIndex = currentIndex + 1
      else newIndex = 0
    }

    const newCurrent = presets[newIndex]

    closeSaveDelete()

    updateState({
      type: 'LOAD_PRESET',
      payload: newCurrent
    })
  }

  return (
    <div className={cn(styles.selector, styles.center, styles.presetSelector)}>
      <div className={styles.option}>
        <div className={styles.leftButton} id='left' onClick={handleSelector}>
          {'<'}
        </div>
        {presets[currentIndex] && (
          <div className={styles.value}>
            <p className='center'>{presets[currentIndex].name}</p>
          </div>
        )}
        <div className={styles.rightButton} id='right' onClick={handleSelector}>
          {'>'}
        </div>
      </div>
    </div>
  )
}

export default PresetsSelector
