import Axios from 'axios'
import cn from 'classnames'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import styles from './Register.module.scss'

const Register = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})

  const handleChange = (e) => {
    let { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }

  const handleSubmit = () => {
    let { email, name, password, confirmPassword } = formValues
    if (!email || !name || !password || !confirmPassword) {
      return toast.error('All inputs required!')
    }
    Axios.post('/auth/register', formValues)
      .then((result) => {
        if (result.data.status === 'error') {
          return toast.error(result.data.message)
        }
        setCurrentShow('login')
        toast.success(result.data.message)
      })
      .catch((err) => toast.error('Registration error: ', err))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={styles.register}>
      <div className={styles.title}>register</div>
      <input
        onKeyDown={handleKeyDown}
        className='center'
        type='text'
        onChange={handleChange}
        placeholder='name'
        id='name'
        dontbubble='true'
      />
      <input
        onKeyDown={handleKeyDown}
        className='center'
        type='email'
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        onKeyDown={handleKeyDown}
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='password'
        id='password'
        dontbubble='true'
      />
      <input
        onKeyDown={handleKeyDown}
        className='center'
        type='password'
        onChange={handleChange}
        placeholder='confirm password'
        id='confirmPassword'
        dontbubble='true'
      />
      <button
        className={cn('center', styles.registerBtn)}
        onClick={handleSubmit}>
        submit
      </button>
      <button
        className={cn('center', styles.signinBtn)}
        onClick={() => setCurrentShow('login')}>
        i already have an account
      </button>
    </div>
  )
}

export default Register
