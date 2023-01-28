import Axios from 'axios'
import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import styles from './Register.module.scss'

const Register = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('')
    }, 3400)
  }, [errorMessage])

  const handleChange = (e) => {
    let { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }

  const handleSubmit = () => {
    let { email, name, password, confirmpassword } = formValues
    if (email && name && password && confirmpassword) {
      Axios.post('/auth/register', formValues)
        .then((result) => {
          if (result.data.err) {
            setErrorMessage(result.data.err)
          } else {
            setCurrentShow('login')
          }
        })
        .catch((err) => console.error('registration error: ', err))
    } else {
      setErrorMessage('all inputs required!')
    }
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
        id='confirmpassword'
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
      <div className={styles.errMsg}>{errorMessage}</div>
    </div>
  )
}

export default Register
