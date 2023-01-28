import React, { useContext } from 'react'
import { useSpring, animated, config } from 'react-spring'
import Oscillator1Controller from '../controls/Oscillators/Oscillators'
import { RotationCTX } from '../../context/Rotation/RotationProvider'
import Envelope from '../controls/Envelope/Envelope'
import Effects2 from '../controls/Effects2/Effects2'
import Effects from '../controls/Effects/Effects'
import Dino from '../controls/Dino/Dino'
import styles from './Cube.module.scss'
import Auth from '../Auth/Auth'
import cn from 'classnames'

const Cube = () => {
  const [{ rotation, page }] = useContext(RotationCTX)

  const animationProps = useSpring({
    from: { transform: 'rotate3d(0, 100, 0, 270deg)' },
    transform: rotation,
    config: config.molasses
  })

  return (
    <div className={styles.scene}>
      <animated.div className={styles.cube} style={animationProps}>
        <div
          className={cn(
            styles.side,
            styles.right,
            page === 'osc' && styles.currentSide
          )}>
          <Oscillator1Controller />
        </div>
        <div
          className={cn(
            styles.side,
            styles.back,
            page === 'fm' && styles.currentSide
          )}>
          <Dino />
        </div>
        <div
          className={cn(
            styles.side,
            styles.left,
            page === 'env' && styles.currentSide
          )}>
          <Envelope />
        </div>
        <div
          className={cn(
            styles.side,
            styles.front,
            page === 'fx' && styles.currentSide
          )}>
          <Effects />
        </div>
        <div
          className={cn(
            styles.side,
            styles.bottom,
            page === 'fxII' && styles.currentSide
          )}>
          <Effects2 />
        </div>
        <div
          className={cn(
            styles.side,
            styles.top,
            page === 'auth' && styles.currentSide
          )}>
          <Auth />
        </div>
      </animated.div>
    </div>
  )
}

export default Cube
