import React, { useEffect, useContext } from 'react';
import Keyboard from 'components/Keyboard/Keyboard';
import Navbar from 'components/Navbar/Navbar';
import Cube from 'components/Cube/Cube';

import { CTX } from 'context/Store';
import './App.scss';
import Axios from 'axios';

function App() {
  const [appState, updateState] = useContext(CTX);

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      const foundToken = localStorage.getItem('fmsynth-token');

      if (!foundToken) {
        console.log('no token');
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
              console.log('RESULT: ', result);
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
              console.log(err);
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
