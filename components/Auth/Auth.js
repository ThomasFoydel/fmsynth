import React, { useState, useEffect, useContext } from 'react'
import { CTX } from '../../context/SynthProvider/Store'
import Register from './Register/Register'
import Presets from './Presets/Presets'
import Login from './Login/Login'

const Auth = () => {
  const [appState, updateState] = useContext(CTX)
  const [currentShow, setCurrentShow] = useState('login')

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const foundToken = localStorage.getItem('fmsynth-token')

      if (!foundToken) {
        updateState({ type: 'LOGOUT' })

        updateState({
          type: 'CHANGE_ROTATION',
          payload: `rotate3d(100, 0, 0, 270deg)`,
          page: 'auth'
        })
      } else {
        const setAuthInfo = async () => {
          Axios.get('/auth/user', {
            headers: { 'x-auth-token': foundToken }
          })
            .then((result) => {
              if (!result.data.err) {
                updateState({
                  type: 'LOGIN',
                  payload: { user: result.data, token: foundToken }
                })
              } else {
                console.error('err: ', result.data.err)
              }
            })
            .catch(() => {
              updateState({ type: 'LOGOUT' })
            })
        }
        setAuthInfo()
      }
    }

    return () => {
      subscribed = false
    }
  }, [])

  const dontBubble = (e) => e.stopPropagation()

  return (
    <div onKeyDown={dontBubble}>
      {appState.isLoggedIn ? (
        <Presets />
      ) : (
        <>
          {currentShow === 'register' && (
            <Register setCurrentShow={setCurrentShow} />
          )}
          {currentShow === 'login' && <Login setCurrentShow={setCurrentShow} />}
        </>
      )}
    </div>
  )
}

export default Auth
