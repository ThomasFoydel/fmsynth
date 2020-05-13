import React, { useContext } from 'react';
import { CTX } from 'context/Store';

import './Reverb.scss';

const Reverb = () => {
  const [appState, updateState] = useContext(CTX);

  const handleImpulse = (e) => {
    updateState({ type: 'CHANGE_REVERB_IMPULSE', payload: e.target.value });
  };
  const handleTime = (e) => {
    let { value } = e.target;
    value /= 100;
    updateState({ type: 'CHANGE_REVERB_MIX', payload: value });
  };
  return (
    <div>
      <div className='param'>
        <div className='name'>impulse</div>
        <select onChange={handleImpulse}>
          <option value='block'>block</option>
          <option value='bottleHall'>bottle hall</option>
          <option value='french'>french</option>
          <option value='home'>home</option>
        </select>
      </div>

      <div className='param'>
        <div className='name'>mix</div>
        <input type='range' onChange={handleTime} />
      </div>
    </div>
  );
};

export default Reverb;
