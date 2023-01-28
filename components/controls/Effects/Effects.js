import React from 'react'
import Distortion from '../Distortion/Distortion'
import PingPong from '../PingPong/PingPong'
import styles from './Effects.module.scss'
import Vibrato from '../Vibrato/Vibrato'
import Reverb from '../Reverb/Reverb'
import EQ from '../EQ/EQ'

const Effects = () => {
  return (
    <div className={styles.effects}>
      <EQ />
      <Distortion />
      <div className='flex'>
        <Vibrato />
        <PingPong />
      </div>
      <Reverb />
    </div>
  )
}

export default Effects
