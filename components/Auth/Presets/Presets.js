import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import { CTX } from '../../../context/Synth/SynthProvider'
import PresetsListSelector from './PresetsListSelector'
import PresetsSelector from './PresetsSelector'
import styles from './Presets.module.scss'

const filterOut = [
  'presets',
  'nodes',
  'currentPreset',
  'keyboardOctaveOffset',
  '_id'
]

const Presets = () => {
  const [appState, updateState] = useContext(CTX)
  const [presetName, setPresetName] = useState('')
  const [windowOpen, setWindowOpen] = useState(null)

  const handleName = (e) => setPresetName(e.target.value)

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
        if (result.data.status === 'error') toast.error(result.data.message)
        else {
          toast.success(result.data.message)
          updateState({ type: 'UPDATE_PRESET', payload: result?.data?.preset })
        }
        setWindowOpen(null)
      })
      .catch(() => toast.error('Save preset error'))
  }

  const handleSaveNew = async () => {
    if (!presetName) {
      setWindowOpen(null)
      return toast.error('Name value required')
    }
    const filteredState = Object.keys(appState)
      .filter((key) => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = appState[key]
        return obj
      }, {})

    Axios.post('/api/preset', { name: presetName, state: filteredState })
      .then((result) => {
        if (result.data.status === 'error') toast.error(result.data.message)
        else {
          toast.success(result.data.message)
          updateState({
            type: 'ADD_PRESET',
            payload: result.data.preset
          })
          setPresetName('')
        }
        setWindowOpen(null)
      })
      .catch((err) => toast.error('Save preset error: ', err))
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
        if (result.data.status === 'error') toast.error(result.data.message)
        else {
          toast.success(result.data.message)
          updateState({
            type: 'REMOVE_PRESET',
            payload: result?.data?.presetId
          })
        }
        setWindowOpen(null)
      })
      .catch((err) => toast.error('Delete preset error: ', err))
  }

  const openTheSave = () => setWindowOpen('save')

  const openTheSaveAs = () => setWindowOpen('saveAs')

  const openTheDelete = () => setWindowOpen('delete')

  const closeSaveDelete = () => {
    setPresetName('')
    setWindowOpen(null)
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

      {windowOpen === 'saveAs' && (
        <div className={styles.saveAs}>
          <div className={styles.closeBtn} onClick={closeSaveDelete} />
          <input
            className={cn('center', styles.saveAsInput)}
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
      {windowOpen === 'save' && (
        <div className={styles.saveOver}>
          <div className={styles.closeBtn} onClick={closeSaveDelete} />
          <div className={styles.confirmText}>
            <p className='center'>overwrite preset</p>
            <p className='center'>{appState.currentPreset?.name}?</p>
          </div>
          <button
            className={cn(styles.confirmBtn, 'center')}
            onClick={handleSave}>
            confirm
          </button>
        </div>
      )}

      {windowOpen === 'delete' && (
        <div className={styles.deleteOpen}>
          <div className={styles.closeBtn} onClick={closeSaveDelete} />
          <div className={styles.confirmText}>
            <p className='center'>delete preset</p>
            <p className='center'>{appState.currentPreset?.name}?</p>
          </div>
          <button
            className={cn(styles.confirmBtn, 'center')}
            onClick={handleDelete}>
            confirm
          </button>
        </div>
      )}
    </div>
  )
}

export default Presets
