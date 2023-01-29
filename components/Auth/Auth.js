import Axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect, useContext } from 'react'
import { CTX } from '../../context/Synth/SynthProvider'
import Register from './Register/Register'
import Presets from './Presets/Presets'
import Login from './Login/Login'

const Auth = () => {
  const { status } = useSession()
  const [currentShow, setCurrentShow] = useState('login')
  const [, updateState] = useContext(CTX)

  const fetchUserPresets = () => {
    if (status === 'authenticated') {
      Axios('/api/preset')
        .then((res) =>
          updateState({ type: 'LOAD_PRESETS', payload: res?.data?.presets })
        )
        .catch((err) => console.error('fetchUserPresets error: ', err))
    }
  }

  useEffect(fetchUserPresets, [status])

  const dontBubble = (e) => e.stopPropagation()

  return (
    <div onKeyDown={dontBubble}>
      {status === 'authenticated' ? (
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
