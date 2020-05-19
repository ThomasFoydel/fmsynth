import React, { useState, useEffect, useContext } from 'react';
import Register from 'components/Auth/Register/Register';
import Login from 'components/Auth/Login/Login';
import './Auth.scss';
import { CTX } from 'context/Store';

const Auth = () => {
  const [appState, updateState] = useContext(CTX);

  const [currentShow, setCurrentShow] = useState('register');
  const [showLogOut, setShowLogOut] = useState(false);

  useEffect(() => {
    const foundToken = localStorage.getItem('fmsynth-token');
    if (foundToken) {
      setShowLogOut(true);
    } else {
      setShowLogOut(false);
    }
  }, [setShowLogOut, appState.isLoggedIn]);

  const handleLogOut = (e) => {
    updateState({ type: 'LOGOUT' });
  };
  return (
    <div className='auth'>
      {currentShow === 'register' && (
        <Register setCurrentShow={setCurrentShow} />
      )}
      {currentShow === 'login' && <Login setCurrentShow={setCurrentShow} />}
      {showLogOut && <button onClick={handleLogOut}>logout</button>}
    </div>
  );
};

export default Auth;
