import React, { useState, useContext } from 'react'
import Register from './Register/Register'
import { CTX } from '../../context/Store'
import Presets from './Presets/Presets'
import styles from './Auth.module.scss'
import Login from './Login/Login'

const Auth = () => {
  const [appState] = useContext(CTX)
  const [currentShow, setCurrentShow] = useState('login')

  return (
    <div className={styles.auth}>
      {appState.isLoggedIn ? (
        <Presets />
      ) : (
        <>
          {currentShow === 'register' && <Register setCurrentShow={setCurrentShow} />}
          {currentShow === 'login' && <Login setCurrentShow={setCurrentShow} />}
        </>
      )}
    </div>
  )
}

export default Auth
