import React, { useContext } from 'react'
import { useSpring, animated, config } from 'react-spring'
import Oscillator1Controller from '../controls/Oscillators/Oscillators'
import { RotationCTX } from '../../context/Rotation/RotationProvider'
import { CTX } from '../../context/SynthProvider/Store'
import Envelope from '../controls/Envelope/Envelope'
import Effects2 from '../controls/Effects2/Effects2'
import Effects from '../controls/Effects/Effects'
import Dino from '../controls/Dino/Dino'
import styles from './Cube.module.scss'
import Auth from '../Auth/Auth'
import cn from 'classnames'

const Cube = () => {
  const [appState] = useContext(CTX)
  const [{ currentTransform, currentPage }] = useContext(RotationCTX)
  const { springConfig } = appState

  const animationProps = useSpring({
    from: { transform: 'rotate3d(0, 100, 0, 270deg)' },
    transform: currentTransform,
    config: config[springConfig]
  })

  return (
    <div className={styles.scene}>
      <animated.div className={styles.cube} style={animationProps}>
        <div
          className={cn(
            styles.side,
            styles.right,
            currentPage === 'osc' && styles.currentSide
          )}>
          <Oscillator1Controller />
        </div>
        <div
          className={cn(
            styles.side,
            styles.back,
            currentPage === 'fm' && styles.currentSide
          )}>
          <Dino />
        </div>
        <div
          className={cn(
            styles.side,
            styles.left,
            currentPage === 'env' && styles.currentSide
          )}>
          <Envelope />
        </div>
        <div
          className={cn(
            styles.side,
            styles.front,
            currentPage === 'fx' && styles.currentSide
          )}>
          <Effects />
        </div>
        <div
          className={cn(
            styles.side,
            styles.bottom,
            currentPage === 'fxII' && styles.currentSide
          )}>
          <Effects2 />
        </div>
        <div
          className={cn(
            styles.side,
            styles.top,
            currentPage === 'auth' && styles.currentSide
          )}>
          <Auth />
        </div>
      </animated.div>
    </div>
  )
}

export default Cube
