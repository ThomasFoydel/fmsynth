import { createContext, useReducer } from 'react'

let AuthProvider = () => <></>
let AuthCTX

if (typeof window !== 'undefined') {
  AuthCTX = createContext()

  function reducer(state, action) {
    const { payload } = action
    switch (action.type) {
      case 'LOGIN':
        const { user, token } = payload
        localStorage.setItem('fmsynth-token', token)

        return {
          ...state,
          isLoggedIn: true,
          user: { name: user.name, email: user.email }
        }

      case 'LOGOUT':
        localStorage.removeItem('fmsynth-token')
        return {
          ...state,
          isLoggedIn: false,
          user: { name: '', email: '' }
        }

      default:
        console.error('AUTH REDUCER ERROR: action: ', action)
        return { ...state }
    }
  }

  AuthProvider = (props) => {
    const stateHook = useReducer(reducer, {
      isLoggedIn: false,
      user: { name: '', email: '' }
    })

    return (
      <AuthCTX.Provider value={stateHook}>{props.children}</AuthCTX.Provider>
    )
  }
}

export default AuthProvider
export { AuthCTX }
