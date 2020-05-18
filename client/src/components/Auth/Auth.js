import React from 'react';
import Register from 'components/Auth/Register/Register';
import Login from 'components/Auth/Login/Login';
import './Auth.scss';

const Auth = () => {
  return (
    <div className='auth'>
      <Register />
      <Login />
    </div>
  );
};

export default Auth;
