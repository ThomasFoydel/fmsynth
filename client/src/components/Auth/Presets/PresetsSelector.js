import React, { useContext } from 'react';
import { CTX } from 'context/Store';

function findWithAttr(array, attr, val) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === val) {
      return i;
    }
  }
  return -1;
}

const PresetsSelector = ({ closeSaveDelete }) => {
  const [appState, updateState] = useContext(CTX);
  const { presets, currentPreset } = appState;
  const currentIndex = findWithAttr(presets, 'text', currentPreset);

  const handleSelector = (e) => {
    const { id } = e.target;

    let newCurrent;
    if (id === 'left') {
      if (currentIndex > 0) {
        newCurrent = presets[currentIndex - 1];
      } else {
        // user has hit zero, go to end of list
        newCurrent = presets[presets.length - 1];
      }
    } else if (id === 'right') {
      if (currentIndex < presets.length - 1) {
        newCurrent = presets[currentIndex + 1];
      } else {
        // user has hit end of list, go back to zero
        newCurrent = presets[0];
      }
    }

    closeSaveDelete();

    updateState({
      type: 'LOAD_PRESET',
      payload: newCurrent,
      text: newCurrent.text,
    });
  };

  return (
    <div className={`selector center presetselector`}>
      <div className='option'>
        <div className='left-button' id='left' onClick={handleSelector}>
          {'<'}
        </div>
        {presets[currentIndex] && (
          <div className='value'>{presets[currentIndex].text}</div>
        )}
        <div className='right-button' id='right' onClick={handleSelector}>
          {'>'}
        </div>
      </div>
    </div>
  );
};

export default PresetsSelector;
