import React, { useContext, useState, useEffect } from 'react';
import { CTX } from 'context/Store';
import Axios from 'axios';
// import Selector from 'components/controls/Selector/Selector';
import PresetsSelector from 'components/Auth/Presets/PresetsSelector';

const Presets = () => {
  const [appState, updateState] = useContext(CTX);
  const [presetName, setPresetName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    const foundToken = localStorage.getItem('fmsynth-token');
    console.log('FOUND TOKEN PRESETSJS: ', foundToken);

    const filterOut = [
      'presets',
      'currentPage',
      'currentRotation',
      'nodes',
      'isLoggedIn',
      'user',
    ];
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
          console.log('presets updated: ', result.data);
          updateState({ type: 'UPDATE_PRESETS', payload: result.data });
        }
      })
      .catch((err) => console.log('save preset error: ', err));
  };
  const handleLoad = async (e) => {
    const foundToken = localStorage.getItem('fmsynth-token');
    if (foundToken) {
      Axios.get('/presets/load', { headers: { 'x-auth-token': foundToken } })
        .then((result) => console.log('load presets result: ', result))
        .catch((err) => console.log('load presets err: ', err));
    }
  };
  return (
    <div>
      <button onClick={handleLogOut}>logout</button>
      <input
        type='text'
        placeholder='preset name'
        onChange={handleName}
        value={presetName}
        dontbubble='true'
      />
      <button onClick={handleSave}>save</button>
      <button onClick={handleLoad}>load</button>
      <div className='error-message'>{errorMessage}</div>
      <PresetsSelector />
    </div>
  );
};

export default Presets;
