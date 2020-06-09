import React, { useContext } from 'react';
import Slider from 'components/controls/Slider/Slider';
import { CTX } from 'context/Store';
import './MasterBPM.scss';

const MasterBPM = () => {
  const [appState, updateState] = useContext(CTX);
  const handleBPM = (e) => {
    updateState({ type: 'CHANGE_MASTER_BPM', payload: e.value });
  };
  return (
    <div className='master-bpm'>
      <div className='name'>master tempo</div>
      <Slider
        onChange={handleBPM}
        value={appState.masterBpm}
        property='bpm'
        max={190}
        min={1}
      />
    </div>
  );
};

export default MasterBPM;
