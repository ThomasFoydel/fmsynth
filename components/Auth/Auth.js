import React, { useState, useEffect, useContext } from 'react'
import { RotationCTX } from '../../context/Rotation/RotationProvider'
import { AuthCTX } from '../../context/Auth/AuthProvider'
import Register from './Register/Register'
import Presets from './Presets/Presets'
import Login from './Login/Login'

const Auth = () => {
  const [authState, updateAuth] = useContext(AuthCTX)
  const [, updateRotation] = useContext(RotationCTX)
  const [currentShow, setCurrentShow] = useState('login')

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const foundToken = localStorage.getItem('fmsynth-token')

      if (!foundToken) {
        updateAuth({ type: 'LOGOUT' })

        updateRotation({
          type: 'CHANGE_ROTATION',
          payload: { rotation: `rotate3d(100, 0, 0, 270deg)`, page: 'auth' }
        })
      } else {
        const setAuthInfo = async () => {
          Axios.get('/auth/user', {
            headers: { 'x-auth-token': foundToken }
          })
            .then((result) => {
              if (!result.data.err) {
                updateAuth({
                  type: 'LOGIN',
                  payload: { user: result.data, token: foundToken }
                })
              } else {
                console.error('err: ', result.data.err)
              }
            })
            .catch(() => {
              updateAuth({ type: 'LOGOUT' })
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
      {authState.isLoggedIn ? (
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
