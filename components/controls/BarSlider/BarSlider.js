import React, { useRef, useEffect, useState } from 'react'
import { useContainerDimensions } from 'util/customHooks'
import { animated, useSpring, config } from 'react-spring'
import styles from './BarSlider.module.scss'

/********************************************

                E X A M P L E: 

        <BarSlider
          onChange={handleFrequency}
          max={18000}
          property='frequency'
          value={appState.filter.frequency}
          size='large'
          />
       
       
  ********************************************/

const BarSlider = ({ children, onChange, min, max, value, property, size }) => {
  const [springOn, setSpringOn] = useState(false)
  const [yVal, setYVal] = useState(value.toFixed(2))

  useEffect(() => {
    setSpringOn(true)
  }, [])

  const componentRef = useRef()
  const elementHeight = useContainerDimensions(componentRef).height

  const handleMouseMove = (e) => {
    const y = (e.nativeEvent.offsetY / elementHeight).toFixed(2)

    if (y >= 0 && y <= 1) {
      setYVal(y)
      let newY = +y
      newY = 1 - newY

      const multiple = max || 1
      newY *= multiple

      const minimum = min || 0
      newY += minimum

      const newVals = { prop: property, value: newY }
      onChange(newVals)
    }
  }

  const gradientPercentage = (1 - yVal) * 100

  const animationProps = useSpring({
    background: `linear-gradient(0deg, rgba(212,12,12,1) ${gradientPercentage}%, rgba(212,12,12,1) ${gradientPercentage}%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 100%)`,
    config: config.wobbly,
  })

  const nonspringstyle = {
    background: `linear-gradient(0deg, rgba(212,12,12,1) ${gradientPercentage}%, rgba(212,12,12,1) ${gradientPercentage}%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 100%)`,
  }

  return (
    <div className={styles.barSlider}>
      <animated.div
        ref={componentRef}
        onMouseMove={handleMouseMove}
        className={`slider ${size}`}
        style={springOn ? animationProps : nonspringstyle}
      >
        {children}
      </animated.div>
    </div>
  )
}

export default BarSlider
