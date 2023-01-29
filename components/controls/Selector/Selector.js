import React from 'react'
import cn from 'classnames'
import styles from './Selector.module.scss'

function findValueIndex(array, val) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].value === val) {
      return i
    }
  }
  return 0
}

const Selector = ({ options, value, onChange, size }) => {
  const currentIndex = findValueIndex(options, value)

  const updateOption = (e) => {
    let newIndex
    if (e.target.id === 'left') {
      if (currentIndex > 0) newIndex = currentIndex - 1
      else newIndex = options.length - 1
    }
    if (e.target.id === 'right') {
      if (currentIndex < options.length - 1) newIndex = currentIndex + 1
      else newIndex = 0
    }
    onChange(options[newIndex])
  }

  return (
    <div className={cn(styles.selector, styles[`selector-${size}`])}>
      <div className={styles.option}>
        <div className={styles.leftButton} id='left' onClick={updateOption}>
          {'<'}
        </div>
        <div className={styles.value}>
          {options[currentIndex] && options[currentIndex].text}
        </div>
        <div className={styles.rightButton} id='right' onClick={updateOption}>
          {'>'}
        </div>
      </div>
    </div>
  )
}

export default Selector
