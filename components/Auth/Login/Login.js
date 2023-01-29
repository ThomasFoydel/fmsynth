import cn from 'classnames'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import styles from './Login.module.scss'

const Login = ({ setCurrentShow }) => {
  const [formValues, setFormValues] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const { data } = useSession()

  useEffect(() => {
    let subscribed = true
    setTimeout(() => {
      if (subscribed) {
        setErrorMessage('')
      }
    }, 3400)
    return () => (subscribed = false)
  }, [errorMessage])

  const handleKeyDown = (e) => {
    if (e.keyCode === 'Enter') {
      handleSubmit()
    }
  }

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }
  const handleSubmit = async () => {
    const { email, password } = formValues
    if (email && password) {
      const status = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/'
      })
      console.log({ status, data })
    } else {
      setErrorMessage('all fields required')
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.title}>sign in</div>
      <div className={styles.defaultUserLogin}>
        for testing:
        <br />
        email: test@gmail.com
        <br />
        password: password
      </div>
      <input
        className='center'
        type='email'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder='email'
        id='email'
        dontbubble='true'
      />
      <input
        className='center'
        type='password'
        onKeyDown={handleKeyDown}
        placeholder='password'
        onChange={handleChange}
        id='password'
        dontbubble='true'
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.signinBtn} onClick={handleSubmit}>
          sign in
        </button>
        <button
          className={styles.signupBtn}
          onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
      <div className={cn(styles.loginErr, 'center')}>{errorMessage}</div>
    </div>
  )
}

export default Login
