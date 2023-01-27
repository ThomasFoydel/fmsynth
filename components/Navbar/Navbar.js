import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../context/Store'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const [appState, updateState] = useContext(CTX)
  const { currentPage } = appState
  const handleRotate = (rotationValue, page) => {
    updateState({ type: 'CHANGE_ROTATION', payload: rotationValue, page })
  }
  return (
    <div className={styles.navbar}>
      <div
        className={cn(styles.option, currentPage === 'osc' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 270deg)`, 'osc')
        }}
      >
        osc
      </div>
      <div
        className={cn(styles.option, currentPage === 'fm' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 180deg)`, 'fm')
        }}
      >
        fm
      </div>
      <div
        className={cn(styles.option, currentPage === 'env' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 90deg)`, 'env')
        }}
      >
        env
      </div>
      <div
        className={cn(styles.option, currentPage === 'fx' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 0deg)`, 'fx')
        }}
      >
        fx
      </div>
      <div
        className={cn(styles.option, currentPage === 'fxII' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 100, 180deg)`, 'fxII')
        }}
      >
        fxII
      </div>
      <div
        className={cn(styles.option, currentPage === 'auth' && styles.active)}
        onClick={() => {
          handleRotate(`rotate3d(100, 0, 0, 270deg)`, 'auth')
        }}
      >
        auth
      </div>
    </div>
  )
}

export default Navbar
