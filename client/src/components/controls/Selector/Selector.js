import React, { useState, useEffect } from 'react';
import './Selector.scss';

function findWithAttr(array, attr, val) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === val) {
      return i;
    }
  }
  return -1;
}

const Selector = ({ options, value, initVal, onChange, size }) => {
  //- initVal will set the init index,
  //- value will set the init index to the index of the item
  // in the options array with a value that matches the value prop
  const [currentVal, setCurrentVal] = useState(initVal || 0);

  useEffect(() => {
    // REMOVE INIT INDEX FUNCTIONALITY REPLACE SO
    // SELECTOR DOESNT START AT 0 INDEX
    const foundIndex = findWithAttr(options, 'value', value);
    initVal = initVal ? initVal : 0;
    let initIndex = foundIndex === -1 ? initVal : foundIndex;
    console.log('INIT INDEX: ', initIndex);
    setCurrentVal(initIndex);
  }, [value]);

  const updateOption = (e) => {
    console.log('current val : ', currentVal);
    if (e.target.id === 'left') {
      if (currentVal > 0) {
        setCurrentVal(currentVal - 1);
        onChange(options[currentVal - 1]);
      } else {
        // user has hit zero, go to end of list
        setCurrentVal(options.length - 1);
        onChange(options[options.length - 1]);
      }
    } else if (e.target.id === 'right') {
      if (currentVal < options.length - 1) {
        setCurrentVal(currentVal + 1);
        onChange(options[currentVal + 1]);
      } else {
        // user has hit end of list, go back to zero
        setCurrentVal(0);
        onChange(options[0]);
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
