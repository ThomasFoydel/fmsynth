import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    let { value, id } = e.target;
    setFormValues({ ...formValues, [id]: value });
    console.log(value);
    console.log(id);
  };
  const handleSubmit = () => {
    console.log(formValues);
  };
  return (
    <div className='register'>
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
    </div>
  );
};

export default Register;
