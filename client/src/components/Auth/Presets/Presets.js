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
  const foundToken = localStorage.getItem('fmsynth-token');
  const filterOut = [
    'presets',
    'currentPage',
    'currentRotation',
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
      '/presets/savenew',
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
      })
      .catch((err) => console.log('save preset error: ', err));
  };

  return (
    <div>
      {openSaveAs && (
        <div className='save-as'>
          <div className='close-btn' onClick={() => setOpenSaveAs(false)}></div>
          <input
            type='text'
            placeholder='name...'
            onChange={handleName}
            value={presetName}
            dontbubble='true'
          />
          <button onClick={handleSaveAs}>save as</button>
        </div>
      )}
      {saveOverOpen && (
        <div className='save-over'>
          save over {appState.currentPreset}
          <button
            // className='close-btn'
            onClick={() => setSaveOverOpen(false)}
          >
            cancel
          </button>
          <button onClick={handleSave}>confirm</button>
        </div>
      )}

      <button onClick={() => setSaveOverOpen(true)}>save</button>
      <button onClick={() => setOpenSaveAs(true)}>save as...</button>
      <button onClick={handleDelete}>delete</button>
      <div className='error-message'>{errorMessage}</div>
      <PresetsSelector />
      <PresetsListSelector />
      <button onClick={handleLogOut}>logout</button>
    </div>
  );
};

export default Presets;
