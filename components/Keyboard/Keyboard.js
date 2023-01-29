import QwertyHancock from 'qwerty-hancock'
import React, { useEffect, useContext } from 'react'
import { CTX } from '../../context/Synth/SynthProvider'
import styles from './keyboard.module.scss'

const Keyboard = () => {
  const [appState, updateState] = useContext(CTX)

  const makeOsc = (freq, note) => {
    updateState({ type: 'MAKE_OSC', payload: freq })
  }

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
        borderColour: '#1c1c1c',
      })
      let nodes = []

      keyboard.keyDown = (note, freq) => {
        const newOsc1 = makeOsc(freq, note)
        nodes.push(newOsc1)
      }

      keyboard.keyUp = (note, freq) => {
        updateState({ type: 'KILL_OSC', payload: freq })
      }
    }
    setUpKeyboard()
  }, [])

  const handleOctaveShift = (e) => {
    let { id } = e.target
    if (id === 'up') {
      if (appState.keyboardOctaveOffset < 1) {
        updateState({
          type: 'SHIFT_KEYBOARD_OCTAVE',
          payload: appState.keyboardOctaveOffset + 1,
        })
      }
    } else {
      if (appState.keyboardOctaveOffset > -1) {
        updateState({
          type: 'SHIFT_KEYBOARD_OCTAVE',
          payload: appState.keyboardOctaveOffset - 1,
        })
      }
    }
  }
  return (
    <div className={styles.keyboardArea}>
      <div className={styles.keyboardContainer}>
        <div className={styles.keyboard} id="keyboard"></div>
      </div>
      <div className={styles.btnsContainer}>
        {appState.keyboardOctaveOffset > -1 ? (
          <div className={styles.downBtn} id="down" onClick={handleOctaveShift}></div>
        ) : (
          <div className={styles.arrowSpacing} />
        )}
        <div className={styles.spacing}></div>
        {appState.keyboardOctaveOffset < 1 ? (
          <div className={styles.upBtn} id="up" onClick={handleOctaveShift}></div>
        ) : (
          <div className={styles.arrowSpacing} />
        )}
      </div>
    </div>
  )
}

export default Keyboard
