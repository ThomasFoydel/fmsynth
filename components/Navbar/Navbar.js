import cn from 'classnames'
import React, { useContext } from 'react'
import { RotationCTX } from '../../context/Rotation/RotationProvider'
import styles from './Navbar.module.scss'

const pages = [
  { name: 'osc', rotation: 'rotate3d(0, 100, 0, 270deg)' },
  { name: 'fm', rotation: 'rotate3d(0, 100, 0, 180deg)' },
  { name: 'env', rotation: 'rotate3d(0, 100, 0, 90deg)' },
  { name: 'fx', rotation: 'rotate3d(0, 100, 0, 0deg)' },
  { name: 'fxII', rotation: 'rotate3d(0, 100, 100, 180deg)' },
  { name: 'auth', rotation: 'rotate3d(100, 0, 0, 270deg)' }
]

const Navbar = () => {
  const [{ currentPage }, updateRotation] = useContext(RotationCTX)

  const handleRotate = (rotation, page) => {
    updateRotation({ type: 'CHANGE_ROTATION', payload: {rotation, page} })
  }

  return (
    <div className={styles.navbar}>
      {pages.map(({ name, rotation }) => (
        <div
          key={name}
          className={cn(styles.option, currentPage === name && styles.active)}
          onClick={() => {
            handleRotate(rotation, name)
          }}>
          {name}
        </div>
      ))}
    </div>
  )
}

export default Navbar
