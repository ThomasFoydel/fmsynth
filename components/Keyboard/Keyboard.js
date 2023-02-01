import QwertyHancock from 'qwerty-hancock'
import React, { useEffect, useContext } from 'react'
import { CTX } from '../../context/Synth/SynthProvider'
import styles from './keyboard.module.scss'

const Keyboard = () => {
  const [{ keyboardOctaveOffset }, updateState] = useContext(CTX)

  useEffect(() => {
    const setUpKeyboard = async () => {
      const keyboard = new QwertyHancock({
        id: 'keyboard',
        width: 515,
        height: 125,
        octaves: 1.5,
        startNote: 'C5',
        whiteKeyColour: '#1c1c1c',
        blackKeyColour: '#f7f7f7',
        activeColour: '#c70c0c',
        borderColour: '#1c1c1c'
      })

      keyboard.keyDown = (freq) => {
        updateState({ type: 'MAKE_OSC', payload: freq })
      }

      keyboard.keyUp = (freq) => {
        updateState({ type: 'KILL_OSC', payload: freq })
      }
    }
    setUpKeyboard()
  }, [])

  const updateKeyboard = (payload) => {
    updateState({ type: 'SHIFT_KEYBOARD_OCTAVE', payload })
  }

  const handleOctaveShift = ({ target }) => {
    if (target.id === 'up') {
      keyboardOctaveOffset < 1 && updateKeyboard(keyboardOctaveOffset + 1)
    }
    if (target.id === 'down') {
      keyboardOctaveOffset > -1 && updateKeyboard(keyboardOctaveOffset - 1)
    }
  }
  
  return (
    <div className={styles.keyboardArea}>
      <div className={styles.keyboardContainer}>
        <div className={styles.keyboard} id='keyboard'></div>
      </div>
      <div className={styles.btnsContainer}>
        {keyboardOctaveOffset > -1 ? (
          <div
            className={styles.downBtn}
            id='down'
            onClick={handleOctaveShift}></div>
        ) : (
          <div className={styles.arrowSpacing} />
        )}
        <div className={styles.spacing}></div>
        {keyboardOctaveOffset < 1 ? (
          <div
            className={styles.upBtn}
            id='up'
            onClick={handleOctaveShift}></div>
        ) : (
          <div className={styles.arrowSpacing} />
        )}
      </div>
    </div>
  )
}

export default Keyboard
