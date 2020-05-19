import React, { useState, useEffect } from 'react';
import './Register.scss';
import Axios from 'axios';

const Register = ({ setCurrentShow }) => {
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

  const handleSubmit = () => {
    let { email, name, password, confirmpassword } = formValues;
    if (email && name && password && confirmpassword) {
      Axios.post('/auth/register', formValues)
        .then((result) => {
          console.log('RESULT: ', result);
          if (result.data.err) {
            setErrorMessage(result.data.err);
          } else {
            console.log('SUCCES: ', result);
            setCurrentShow('login');
          }
        })
        .catch((err) => console.log('registration error: ', err));
    } else {
      console.log('all inputs required!');
    }
  };
  return (
    <div className='register'>
      <div className='center'>register</div>
      <input
        type='text'
        onChange={handleChange}
        placeholder='name'
        id='name'
        dontbubble='true'
      />
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
      <input
        type='password'
        onChange={handleChange}
        placeholder='confirmpassword'
        id='confirmpassword'
        dontbubble='true'
      />
      <button onClick={handleSubmit}>submit</button>
      <button onClick={() => setCurrentShow('login')}>
        i already have an account
      </button>

      {errorMessage}
    </div>
  );
};

export default Register;
