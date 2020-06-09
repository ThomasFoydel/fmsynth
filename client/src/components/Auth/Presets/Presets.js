import React, { useContext, useState, useEffect } from 'react';
import { CTX } from 'context/Store';
import Axios from 'axios';
import PresetsSelector from 'components/Auth/Presets/PresetsSelector';
import PresetsListSelector from 'components/Auth/Presets/PresetsListSelector';
import './Presets.scss';

const Presets = () => {
  const [appState, updateState] = useContext(CTX);
  const [presetName, setPresetName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSaveAs, setOpenSaveAs] = useState(false);
  const [saveOverOpen, setSaveOverOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const foundToken = localStorage.getItem('fmsynth-token');
  const filterOut = [
    'presets',
    'currentPage',
    'currentTransform',
    'springConfig',
    'nodes',
    'isLoggedIn',
    'user',
    'currentPreset',
    'keyboardOctaveOffset',
  ];

  const handleLogOut = (e) => {
    updateState({ type: 'LOGOUT' });
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 2800);
  }, [errorMessage]);

  const handleName = (e) => {
    setPresetName(e.target.value);
  };

  const handleSave = async (e) => {
    const filteredState = Object.keys(appState)
      .filter((key) => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = appState[key];
        return obj;
      }, {});
    Axios.post(
      '/presets/save',
      {
        name: appState.currentPreset,
        state: filteredState,
        username: appState.user.name,
      },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          setSaveOverOpen(false);
          setErrorMessage(result.data.err);
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current,
            },
          });
        }
        setSaveOverOpen(false);
      })
      .catch((err) => console.log('save preset error: ', err));
  };

  const handleSaveAs = async () => {
    if (!presetName) {
      setOpenSaveAs(false);
      return setErrorMessage('name value required');
    }
    const filteredState = Object.keys(appState)
      .filter((key) => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = appState[key];
        return obj;
      }, {});

    Axios.post(
      '/presets/newsave',
      { name: presetName, state: filteredState, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          setOpenSaveAs(false);
          setPresetName('');
          setErrorMessage(result.data.err);
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current,
            },
          });
          setOpenSaveAs(false);
          setPresetName('');
        }
      })
      .catch((err) => console.log('save preset error: ', err));
  };

  const handleDelete = async (e) => {
    Axios.post(
      '/presets/delete',
      { name: appState.currentPreset, username: appState.user.name },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => {
        if (result.data.err) {
          setDeleteOpen(false);
          setErrorMessage(result.data.err);
        } else {
          updateState({
            type: 'UPDATE_PRESETS',
            payload: {
              presets: result.data.presets,
              current: result.data.current,
            },
          });
          updateState({
            type: 'LOAD_PRESET',
            text: result.data.current,
            payload: result.data.presets[result.data.newCurrentIndex],
          });
          setDeleteOpen(false);
        }
      })
      .catch((err) => {
        console.log('save preset error: ', err);
      });
  };

  const openTheSave = () => {
    setErrorMessage('');
    setSaveOverOpen(!saveOverOpen);
    setOpenSaveAs(false);
    setDeleteOpen(false);
  };

  const openTheSaveAs = () => {
    setErrorMessage('');
    setOpenSaveAs(!openSaveAs);
    setSaveOverOpen(false);
    setDeleteOpen(false);
  };

  const openTheDelete = () => {
    setErrorMessage('');
    setDeleteOpen(!deleteOpen);
    setOpenSaveAs(false);
    setSaveOverOpen(false);
  };

  const closeSaveDelete = () => {
    setDeleteOpen(false);
    setOpenSaveAs(false);
    setSaveOverOpen(false);
  };

  return (
    <div className='presets'>
      <button className='logout-btn' onClick={handleLogOut}>
        logout
      </button>

      <PresetsSelector closeSaveDelete={closeSaveDelete} />
      <PresetsListSelector closeSaveDelete={closeSaveDelete} />

      <div className='open-btns'>
        <button onClick={openTheSave}>save</button>
        <button onClick={openTheSaveAs}>save new</button>
        <button onClick={openTheDelete}>delete</button>
      </div>

      {openSaveAs && (
        <div className='save-as'>
          <div className='close-btn' onClick={() => setOpenSaveAs(false)} />
          <input
            className='save-as-input'
            type='text'
            placeholder='name...'
            onChange={handleName}
            value={presetName}
            dontbubble='true'
            maxLength='20'
          />
          <button className='confirm-btn center' onClick={handleSaveAs}>
            save
          </button>
        </div>
      )}
      {saveOverOpen && (
        <div className='save-over'>
          <div className='close-btn' onClick={() => setSaveOverOpen(false)} />
          <div className='confirm-text'>
            save over
            <br />
            {appState.currentPreset}?
          </div>
          <button className='confirm-btn center' onClick={handleSave}>
            confirm
          </button>
        </div>
      )}

      {deleteOpen && (
        <div className='delete-open'>
          <div className='close-btn' onClick={() => setDeleteOpen(false)} />
          <div className='confirm-text'>
            delete
            <br />
            {appState.currentPreset}?
          </div>
          <button className='confirm-btn center' onClick={handleDelete}>
            confirm
          </button>
        </div>
      )}

      <div className='error-message center'>{errorMessage}</div>
    </div>
  );
};

export default Presets;
