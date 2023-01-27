import React from 'react'
import { CircleSlider } from 'react-circle-slider'
import styles from './Slider.module.scss'

const Slider = ({ min, max, step, value, property, onChange, disableToolTip }) => {
  return (
    <div className={styles.circleSlider}>
      <CircleSlider
        onChange={(e) => onChange({ value: e, prop: property })}
        value={value}
        knobRadius={4}
        shadow={false}
        size={35}
        circleWidth={3}
        progressWidth={5}
        min={min}
        max={max}
        showTooltip={false}
        tooltipColor={'#eee'}
        progressColor={'#222'}
        stepSize={step}
      />
      {!disableToolTip && <div className={styles.tooltip}>{Number(value).toFixed(0)}</div>}
    </div>
  )
}

export default Slider
