import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import styles from './Presets.module.scss'

function findPresetIndex(array, val) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i].text === val) return i
  }
  return 0
}

const PresetsSelector = ({ closeSaveDelete }) => {
  const [appState, updateState] = useContext(CTX)
  const { presets, currentPreset } = appState
  const currentIndex = findPresetIndex(presets, currentPreset)

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
      payload: newCurrent.name
    })
  }

  return (
    <div className={cn(styles.selector, styles.center, styles.presetSelector)}>
      <div className={styles.option}>
        <div className={styles.leftButton} id='left' onClick={handleSelector}>
          {'<'}
        </div>
        {presets[currentIndex] && (
          <div className='value'>{presets[currentIndex].text}</div>
        )}
        <div className={styles.rightButton} id='right' onClick={handleSelector}>
          {'>'}
        </div>
      </div>
    </div>
  )
}

export default PresetsSelector
