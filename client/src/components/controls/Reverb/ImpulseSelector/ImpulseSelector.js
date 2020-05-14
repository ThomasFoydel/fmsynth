import React, { useState, useContext } from 'react';

import './ImpulseSelector.scss';
import { CTX } from 'context/Store';

const ImpulseSelector = ({ options, initVal }) => {
  const [appState, updateState] = useContext(CTX);

  const [currentVal, setCurrentVal] = useState(initVal);

  const updateOption = (e) => {
    if (e.target.id === 'left') {
      if (currentVal > 0) {
        console.log('LEFT');
        setCurrentVal(currentVal - 1);
        updateState({
          type: 'CHANGE_REVERB_IMPULSE',
          payload: options[currentVal - 1],
        });
      } else {
        // user has hit zero, go to end of list
        setCurrentVal(options.length - 1);
        updateState({
          type: 'CHANGE_REVERB_IMPULSE',
          payload: options[options.length - 1],
        });
      }
    } else if (e.target.id === 'right') {
      console.log('RIGHT');
      if (currentVal < options.length - 1) {
        setCurrentVal(currentVal + 1);
        updateState({
          type: 'CHANGE_REVERB_IMPULSE',
          payload: options[currentVal + 1],
        });
      } else {
        // user has hit end of list, go back to zero
        setCurrentVal(0);
        updateState({
          type: 'CHANGE_REVERB_IMPULSE',
          payload: options[0],
        });
      }
    }
  };

  return (
    <div className={`impulse-selector`}>
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

export default ImpulseSelector;
