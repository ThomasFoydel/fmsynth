import { createContext, useReducer } from 'react'

let RotationProvider = () => <></>
let RotationCTX

if (typeof window !== 'undefined') {
  RotationCTX = createContext()

  function reducer(state, action) {
    let { payload } = action
    switch (action.type) {
      case 'CHANGE_ROTATION':
        return {
          ...state,
          currentTransform: payload,
          currentPage: action.page
        }

      default:
        console.error('ROTATION REDUCER ERROR: action: ', action)
        return { ...state }
    }
  }

  RotationProvider = (props) => {
    const stateHook = useReducer(reducer, {
      currentTransform: `rotate3d(0, 100, 0, 270deg)`
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
