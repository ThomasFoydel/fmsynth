import React, { useState } from 'react';
import './Selector.scss';

const Selector = ({ options, initVal, cb, size }) => {
  const [currentVal, setCurrentVal] = useState(initVal || 0);

  const updateOption = (e) => {
    if (e.target.id === 'left') {
      if (currentVal > 0) {
        setCurrentVal(currentVal - 1);
        cb(options[currentVal - 1]);
      } else {
        // user has hit zero, go to end of list
        setCurrentVal(options.length - 1);
        cb(options[options.length - 1]);
      }
    } else if (e.target.id === 'right') {
      if (currentVal < options.length - 1) {
        setCurrentVal(currentVal + 1);
        cb(options[currentVal + 1]);
      } else {
        // user has hit end of list, go back to zero
        setCurrentVal(0);
        cb(options[0]);
      }
    }
  };

  return (
    <div className={`selector selector-${size}`}>
      <div className='option'>
        <div className='left-button' id='left' onClick={updateOption}>
          {'<'}
        </div>
        <div className='value'>{options[currentVal].text}</div>
        <div className='right-button' id='right' onClick={updateOption}>
          {'>'}
        </div>
      </div>
    </div>
  );
};

export default Selector;
