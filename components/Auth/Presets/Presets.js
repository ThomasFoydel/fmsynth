import Axios from 'axios'
import cn from 'classnames'
import { signOut } from 'next-auth/react'
import React, { useContext, useState, useEffect } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import PresetsListSelector from './PresetsListSelector'
import PresetsSelector from './PresetsSelector'
import styles from './Presets.module.scss'

const Presets = () => {
  const [appState, updateState] = useContext(CTX)
  const [presetName, setPresetName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openSaveAs, setOpenSaveAs] = useState(false)
  const [saveOverOpen, setSaveOverOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const filterOut = [
    'presets',
    'nodes',
    'currentPreset',
    'keyboardOctaveOffset',
    '_id'
  ]

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('')
    }, 2800)
  }, [errorMessage])

  const handleName = (e) => {
    setPresetName(e.target.value)
  }

  const handleSave = async () => {
    if (!appState.currentPreset) return
    const filteredState = Object.keys(appState)
      .filter((key) => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = appState[key]
        return obj
      }, {})
    Axios.put(`/api/preset/${appState.currentPreset._id}`, {
      state: filteredState
    })
      .then((result) => {
        if (result.data.err) {
          setSaveOverOpen(false)
          setErrorMessage(result.data.err)
        } else {
          updateState({
            type: 'UPDATE_PRESET',
            payload: result?.data?.preset
          })
        }
        setSaveOverOpen(false)
      })
      .catch((err) => console.error('Save preset error: ', err.message))
  }

  const handleSaveNew = async () => {
    if (!presetName) {
      setOpenSaveAs(false)
      return setErrorMessage('name value required')
    }
    const filteredState = Object.keys(appState)
      .filter((key) => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = appState[key]
        return obj
      }, {})

    Axios.post('/api/preset', { name: presetName, state: filteredState })
      .then((result) => {
        if (result.data.err) {
          setOpenSaveAs(false)
          setPresetName('')
          setErrorMessage(result.data.err)
        } else {
          updateState({
            type: 'ADD_PRESET',
            payload: result.data.preset
          })
          setOpenSaveAs(false)
          setPresetName('')
        }
      })
      .catch((err) => console.error('save preset error: ', err))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 'Enter') {
      handleSaveNew()
    }
  }

  const handleDelete = async () => {
    if (!appState.currentPreset) return
    Axios.delete(`/api/preset/${appState.currentPreset._id}`)
      .then((result) => {
        if (result.data.err) {
          setDeleteOpen(false)
          setErrorMessage(result.data.err)
        } else {
          updateState({
            type: 'REMOVE_PRESET',
            payload: result?.data?.presetId
          })
          setDeleteOpen(false)
        }
      })
      .catch((err) => {
        console.error('Delete preset error: ', err)
      })
  }

  const openTheSave = () => {
    setErrorMessage('')
    setSaveOverOpen(!saveOverOpen)
    setOpenSaveAs(false)
    setDeleteOpen(false)
  }

  const openTheSaveAs = () => {
    setErrorMessage('')
    setOpenSaveAs(!openSaveAs)
    setSaveOverOpen(false)
    setDeleteOpen(false)
  }

  const openTheDelete = () => {
    setErrorMessage('')
    setDeleteOpen(!deleteOpen)
    setOpenSaveAs(false)
    setSaveOverOpen(false)
  }

  const closeSaveDelete = () => {
    setDeleteOpen(false)
    setOpenSaveAs(false)
    setSaveOverOpen(false)
  }

  return (
    <div className={styles.presets}>
      <button
        className={styles.logoutBtn}
        onClick={() => signOut({ redirect: false })}>
        logout
      </button>

      <PresetsSelector closeSaveDelete={closeSaveDelete} />
      <PresetsListSelector closeSaveDelete={closeSaveDelete} />

      <div className={styles.openBtns}>
        {appState.currentPreset && <button onClick={openTheSave}>save</button>}
        <button onClick={openTheSaveAs}>save new</button>
        <button onClick={openTheDelete}>delete</button>
      </div>

      {openSaveAs && (
        <div className={styles.saveAs}>
          <div
            className={styles.closeBtn}
            onClick={() => setOpenSaveAs(false)}
          />
          <input
            className={styles.saveAsInput}
            type='text'
            placeholder='name...'
            onChange={handleName}
            onKeyDown={handleKeyDown}
            value={presetName}
            dontbubble='true'
            maxLength='20'
          />
          <button
            className={cn(styles.confirmBtn, 'center')}
            onClick={handleSaveNew}>
            save
          </button>
        </div>
      )}
      {saveOverOpen && (
        <div className={styles.saveOver}>
          <div
            className={styles.closeBtn}
            onClick={() => setSaveOverOpen(false)}
          />
          <div className={styles.confirmText}>
            save over
            <br />
            {appState.currentPreset?.name}?
          </div>
          <button
            className={cn(styles.confirmBtn, 'center')}
            onClick={handleSave}>
            confirm
          </button>
        </div>
      )}

      {deleteOpen && (
        <div className={styles.deleteOpen}>
          <div
            className={styles.closeBtn}
            onClick={() => setDeleteOpen(false)}
          />
          <div className={styles.confirmText}>
            delete
            <br />
            {appState.currentPreset?.name}?
          </div>
          <button
            className={cn(styles.confirmBtn, 'center')}
            onClick={handleDelete}>
            confirm
          </button>
        </div>
      )}

      <div className={cn(styles.errorMessage, 'center')}>{errorMessage}</div>
    </div>
  )
}

export default Presets
