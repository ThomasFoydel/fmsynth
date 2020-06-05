import React, { useContext } from 'react';
import './MasterVol.scss';
import { CTX } from 'context/Store';
import Slider from 'components/controls/Slider/Slider';

const MasterVol = () => {
  const [appState, updateState] = useContext(CTX);
  const handleVol = (e) => {
    // console.log('EE: ', e);
    let { value } = e;
    // value *= 5;
    updateState({ type: 'CHANGE_MASTER_VOLUME', payload: value });
  };

  return (
    <div className='mastervol'>
      <Slider
        onChange={handleVol}
        value={appState.masterVol}
        property='volume'
        max={0}
        min={-50}
      ></Slider>
    </div>
  );
};

export default MasterVol;
