import React from 'react'
import CombFilter from '../CombFilter/CombFilter'
import LfoFilter from '../LfoFilter/LfoFilter'
import styles from './Effects2.module.scss'

const Effects2 = () => {
  return (
    <div className={styles.effects2}>
      <LfoFilter />
      <CombFilter />
    </div>
  )
}

export default Effects2
