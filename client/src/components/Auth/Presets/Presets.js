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
    console.log('HANDLE SAVE');
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
        console.log('PRESETS SAVE /UPDATE: .then RESULT: ', result);
        // if (result.data.err) {
        //   setErrorMessage(result.data.err);
        // } else {
        //   updateState({
        //     type: 'UPDATE_PRESETS',
        //     payload: {
        //       presets: result.data.presets,
        //       current: result.data.current,
        //     },
        // });
        // }
      })
      .catch((err) => console.log('save preset error: ', err));
  };

  const handleSaveAs = async (e) => {
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
  // const handleLoad = async (e) => {
  //   const foundToken = localStorage.getItem('fmsynth-token');
  //   if (foundToken) {
  //     Axios.get('/presets/load', { headers: { 'x-auth-token': foundToken } })
  //       .then((result) => console.log('load presets result: ', result))
  //       .catch((err) => console.log('load presets err: ', err));
  //   }
  // };

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
          setDeleteOpen(false);
        }
      })
      .catch((err) => {
        console.log('save preset error: ', err);
      });
  };

  const openTheSave = () => {
    setSaveOverOpen(!saveOverOpen);
    setOpenSaveAs(false);
    setDeleteOpen(false);
  };

  const openTheSaveAs = () => {
    setOpenSaveAs(!openSaveAs);
    setSaveOverOpen(false);
    setDeleteOpen(false);
  };

  const openTheDelete = () => {
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
        <button onClick={openTheSaveAs}>save as...</button>
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

      <div className='error-message'>{errorMessage}</div>
    </div>
  );
};

export default Presets;
