import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    let { value, id } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };
  const handleSubmit = () => {
    console.log(formValues);
  };
  return (
    <div className='login'>
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
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Login;
