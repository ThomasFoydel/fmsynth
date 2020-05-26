import React, { useContext, useEffect } from 'react';

import { CTX } from 'context/Store';
const PresetsListSelector = () => {
  const [appState, updateState] = useContext(CTX);
  const presets = appState.presets;

  useEffect(() => {}, [appState.currentPreset]);

  const handleSelection = (e) => {
    const { id } = e.target;
    if (id !== appState.currentPreset) {
      const presetParams = presets.filter((preset) => preset.text === id);
      updateState({
        type: 'LOAD_PRESET',
        payload: { value: presetParams[0].value },
        text: id,
      });
    }
  };
  return (
    <div className='presetlistselector'>
      {presets.map((preset) => (
        <div
          key={preset.text}
          className={`preset-option current-${
            preset.text === appState.currentPreset
          }`}
          onClick={handleSelection}
          id={preset.text}
        >
          {preset.text}
        </div>
      ))}
    </div>
  );
};

export default PresetsListSelector;
