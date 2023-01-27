import React, { useContext } from 'react'
import Selector from '..//Selector/Selector'
import { CTX } from '../../../context/Store'
import styles from './PingPong.module.scss'
import Slider from '../Slider/Slider'
import cn from 'classnames'

const PingPong = () => {
  const [appState, updateState] = useContext(CTX)

  const handleMix = (e) => {
    let { value } = e
    value /= 100
    updateState({ type: 'CHANGE_PINGPONG_MIX', payload: value })
  }

  const handleTime = (e) => {
    let { value } = e
    updateState({ type: 'CHANGE_PINGPONG_TIME', payload: value })
  }

  const handleFeedback = (e) => {
    let { value } = e
    value /= 100
    updateState({ type: 'CHANGE_PINGPONG_FEEDBACK', payload: value })
  }

  return (
    <div className={styles.pingPong}>
      <div className={styles.titleName}>ping-pong</div>

      <div className={styles.slidersContainer}>
        <div className={styles.param}>
          <div className={styles.name}>mix</div>
          <div className={styles.slider}>
            <Slider onChange={handleMix} value={appState.pingPong.wet * 100} property="wet" />
          </div>
        </div>

        <div className={cn(styles.param, styles.timeParam)}>
          <div className={styles.name}>time</div>
          <div className={styles.timeSelector}>
            <Selector
              onChange={handleTime}
              value={appState.pingPong.delayTime}
              size="xs"
              options={[
                { value: '1n', text: '1n' },
                { value: '1t', text: '1t' },
                { value: '2n', text: '2n' },
                { value: '2t', text: '2t' },
                { value: '4n', text: '4n' },
                { value: '4t', text: '4t' },
                { value: '8n', text: '8n' },
                { value: '8t', text: '8t' },
                { value: '16n', text: '16n' },
                { value: '16t', text: '16t' },
                { value: '32n', text: '32n' },
                { value: '32t', text: '32t' },
              ]}
            />
          </div>
        </div>

        <div className={styles.param}>
          <div className={styles.name}>feed</div>
          <div className={styles.slider}>
            <Slider
              onChange={handleFeedback}
              value={appState.pingPong.feedback * 100}
              property="feedback"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PingPong
