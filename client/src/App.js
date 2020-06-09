import React, { useEffect, useContext } from 'react';
import Axios from 'axios';

import Keyboard from 'components/Keyboard/Keyboard';
import Navbar from 'components/Navbar/Navbar';
import Cube from 'components/Cube/Cube';
import MasterVol from 'components/controls/MasterVol/MasterVol';
import MasterBPM from 'components/controls/MasterBPM/MasterBPM';

import { CTX } from 'context/Store';
import './App.scss';

function App() {
  const [, updateState] = useContext(CTX);

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      const foundToken = localStorage.getItem('fmsynth-token');

      if (!foundToken) {
        updateState({
          type: 'LOGOUT',
        });

        //rotate to auth
        updateState({
          type: 'CHANGE_ROTATION',
          payload: `rotate3d(100, 0, 0, 270deg)`,
          page: 'auth',
        });
      } else {
        const setAuthInfo = (async) => {
          Axios.get('/auth/user', {
            headers: { 'x-auth-token': foundToken },
          })
            .then((result) => {
              if (!result.data.err) {
                updateState({
                  type: 'LOGIN',
                  payload: { user: result.data, token: foundToken },
                });
              } else {
                console.log('err: ', result.data.err);
              }
            })
            .catch((err) => {
              updateState({
                type: 'LOGOUT',
              });
            });
        };
        setAuthInfo();
      }
    }

    return () => {
      subscribed = false;
    };
  }, [updateState]);

  return (
    <div className='App'>
      <Keyboard />
      <Navbar />
      <Cube />
      <div className='hidden-masters'>
        <MasterVol />
        <MasterBPM />
      </div>
    </div>
  );
}

export default App;
