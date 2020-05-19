import React, { useEffect, useContext } from 'react';
import Keyboard from 'components/Keyboard/Keyboard';
import Navbar from 'components/Navbar/Navbar';
import Cube from 'components/Cube/Cube';

import { CTX } from 'context/Store';
import './App.scss';

function App() {
  const [appState, updateState] = useContext(CTX);

  useEffect(() => {
    const foundToken = localStorage.getItem('fmsynth-token');
    console.log('foundToken: ', foundToken);
    if (!foundToken) {
      //rotate to auth
      console.log('NO TOKEN!');
      updateState({
        type: 'CHANGE_ROTATION',
        payload: `rotate3d(100, 0, 0, 270deg)`,
        page: 'auth',
      });
    } else {
      console.log('TOKENY TOKEN');
      //login with token
    }
  }, []);
  return (
    <div className='App'>
      <Keyboard />
      <Navbar />
      <Cube />
    </div>
  );
}

export default App;
