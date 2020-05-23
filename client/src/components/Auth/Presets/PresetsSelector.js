import React, { useContext, useState, useEffect } from 'react';
import { CTX } from 'context/Store';
import Selector from 'components/controls/Selector/Selector';

const PresetsSelector = () => {
  const [appState, updateState] = useContext(CTX);
  const [presetsArray, setPresetsArray] = useState([]);

  console.log('appstate presets', appState.presets);
  //   useEffect(() => {
  //     const newArray = [];
  //     appState.presets.forEach((preset, i) => {
  //       console.log('I: ', i);
  //       const presetObj = {
  //         text: preset.name,
  //         value: preset.params,
  //       };
  //       newArray.push(presetObj);
  //     });
  //     console.log('new array: ', newArray);
  //   }, [appState.presets]);
  //   setPresetsArray([...presetsArray, newArray]);

  //   useEffect(() => {
  //     console.log('USE EFFFECT');
  //     if (!appState.presets) {
  //       console.log('NO PRESETS. state: ', appState);
  //     } else {
  //       console.log('the keys: ', appState.presets.length);

  //       const newArray = [];
  //       appState.presets.forEach((preset, i) => {
  //         console.log('I: ', i);
  //         const presetObj = {
  //           text: preset.name,
  //           value: preset.params,
  //         };
  //         newArray.push(presetObj);
  //       });
  //       setPresetsArray([...presetsArray, newArray]);
  //     }
  //   }, []);
  const handleSelector = (e) => {
    console.log('EEE: ', e);
    updateState({ type: 'LOAD_PRESET', payload: e });
  };
  return (
    <div>
      {/* <Selector options={presetsArray} /> */}
      {appState.presets.length > 0 && (
        <Selector options={appState.presets} onChange={handleSelector} />
      )}
      <h1>cool!</h1>
    </div>
  );
};

export default PresetsSelector;
