import React from 'react'
import dynamic from 'next/dynamic'
import MasterVol from '../components/controls/MasterVol/MasterVol'
import MasterBPM from '../components/controls/MasterBPM/MasterBPM'
import Navbar from '../components/Navbar/Navbar'
import styles from '../styles/Home.module.scss'
import Cube from '../components/Cube/Cube'

const Keyboard = dynamic(() => import('../components/Keyboard/Keyboard'), {
  ssr: false
})

function Home() {
  return (
    <div>
      <Keyboard />
      <Navbar />
      <Cube />
      <div className={styles.hiddenMasters}>
        <MasterVol />
        <MasterBPM />
      </div>
    </div>
  )
}

export default Home
