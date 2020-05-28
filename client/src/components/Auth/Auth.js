import React, { useState, useEffect, useContext } from 'react';
import Register from 'components/Auth/Register/Register';
import Login from 'components/Auth/Login/Login';
import Presets from 'components/Auth/Presets/Presets';

import './Auth.scss';
import { CTX } from 'context/Store';

const Auth = () => {
  const [appState] = useContext(CTX);
  const [currentShow, setCurrentShow] = useState('login');

  return (
    <div className='auth'>
      {appState.isLoggedIn ? (
        <Presets />
      ) : (
        <>
          {currentShow === 'register' && (
            <Register setCurrentShow={setCurrentShow} />
          )}
          {currentShow === 'login' && <Login setCurrentShow={setCurrentShow} />}
        </>
      )}
    </div>
  );
};

export default Auth;
