import React from 'react'
import BitCrusher from '../BitCrusher/BitCrusher'
import Distortion from '../Distortion/Distortion'
import PingPong from '../PingPong/PingPong'
import styles from './Effects.module.scss'
import Reverb from '../Reverb/Reverb'
import EQ from '../EQ/EQ'

const Effects = () => {
  return (
    <div className={styles.effects}>
      <EQ />
      <Distortion />
      <div className="flex">
        <BitCrusher />
        <PingPong />
      </div>
      <Reverb />
    </div>
  )
}

export default Effects
