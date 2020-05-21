import React, { useContext, useState } from 'react';
import { CTX } from 'context/Store';
import Axios from 'axios';

const Presets = () => {
  const [appState, updateState] = useContext(CTX);
  const [presetName, setPresetName] = useState('');

  const handleLogOut = (e) => {
    updateState({ type: 'LOGOUT' });
  };

  const handleName = (e) => {
    setPresetName(e.target.value);
  };
  const handleSave = async (e) => {
    const foundToken = localStorage.getItem('fmsynth-token');
    console.log('FOUND TOKEN PRESETSJS: ', foundToken);
    Axios.post(
      '/presets/savenew',
      { name: presetName, state: appState },
      { headers: { 'x-auth-token': foundToken } }
    )
      .then((result) => console.log('save preset, result: ', result))
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
    </div>
  );
};

export default Presets;
