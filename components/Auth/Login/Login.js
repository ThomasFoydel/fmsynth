import Axios from 'axios'
import cn from 'classnames'
import React, { useState, useEffect, useContext } from 'react'
import { CTX } from '../../../context/Store'
import styles from './Login.module.scss'

const Login = ({ setCurrentShow }) => {
  const [, updateState] = useContext(CTX)
  const [formValues, setFormValues] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

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
    if (e.charCode === 13) {
      handleSubmit()
    }
  }

  const handleChange = (e) => {
    let { value, id } = e.target
    setFormValues({ ...formValues, [id]: value })
  }
  const handleSubmit = async () => {
    let { email, password } = formValues
    if (email && password) {
      Axios.post('/auth/login', formValues).then((result) => {
        if (result.data.err) {
          setErrorMessage(result.data.err)
        } else {
          updateState({ type: 'LOGIN', payload: result.data.data })
          updateState({
            type: 'CHANGE_ROTATION',
            payload: `rotate3d(0, 100, 0, 270deg)`,
            page: 'osc',
          })
        }
      })
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
        className="center"
        type="email"
        onKeyPress={handleKeyDown}
        onChange={handleChange}
        placeholder="email"
        id="email"
        dontbubble="true"
      />
      <input
        className="center"
        type="password"
        onKeyPress={handleKeyDown}
        placeholder="password"
        onChange={handleChange}
        id="password"
        dontbubble="true"
      />
      <div className={cn(styles.btnsContainer, 'center')}>
        <button className={styles.signinBtn} onClick={handleSubmit}>
          sign in
        </button>
        <button className={styles.signupBtn} onClick={() => setCurrentShow('register')}>
          sign up
        </button>
      </div>
      <div className={cn(styles.loginErr, 'center')}>{errorMessage}</div>
    </div>
  )
}

export default Login
