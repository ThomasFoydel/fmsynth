import React, { useState, useEffect, useContext } from 'react';
import './Login.scss';
import Axios from 'axios';

import { CTX } from 'context/Store';

const Login = ({ setCurrentShow }) => {
  const [appState, updateState] = useContext(CTX);
  const [formValues, setFormValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3400);
  }, [errorMessage]);

  const handleChange = (e) => {
    let { value, id } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };
  const handleSubmit = async () => {
    let { email, password } = formValues;
    if (email && password) {
      Axios.post('/auth/login', formValues).then((result) => {
        console.log('RESULT: ', result);
        if (result.data.err) {
          setErrorMessage(result.data.err);
        } else {
          updateState({ type: 'LOGIN', payload: result.data.data });
          updateState({
            type: 'CHANGE_ROTATION',
            payload: `rotate3d(0, 100, 0, 270deg)`,
            page: 'osc',
          });
        }
      });
    } else {
      setErrorMessage('all field required');
    }
  };
  return (
    <div className='login'>
      <div className='center'>login</div>
      <input
        type='email'
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        type='password'
        onChange={handleChange}
        placeholder='password'
        id='password'
        dontbubble='true'
      />
      <button onClick={handleSubmit}>sign in</button>
      <button onClick={() => setCurrentShow('register')}>sign up</button>
      <div className='center'>{errorMessage}</div>
    </div>
  );
};

export default Login;
