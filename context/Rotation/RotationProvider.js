import { createContext, useReducer } from 'react'

let RotationProvider = () => <></>
let RotationCTX

if (typeof window !== 'undefined') {
  RotationCTX = createContext()

  function reducer(state, action) {
    const { payload } = action
    const { rotation, page } = payload

    switch (action.type) {
      case 'CHANGE_ROTATION':
        return {
          ...state,
          rotation,
          page
        }

      default:
        console.error('ROTATION REDUCER ERROR: action: ', action)
        return { ...state }
    }
  }

  RotationProvider = (props) => {
    const stateHook = useReducer(reducer, {
      rotation: 'rotate3d(0, 100, 0, 270deg)',
      page: 'osc'
    })

    return (
      <RotationCTX.Provider value={stateHook}>
        {props.children}
      </RotationCTX.Provider>
    )
  }
}

export default RotationProvider
export { RotationCTX }
