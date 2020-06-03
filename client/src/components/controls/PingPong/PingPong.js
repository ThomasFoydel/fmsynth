import React, { useContext } from 'react';
import Slider from 'components/controls/Slider/Slider';

import { CTX } from 'context/Store';
import './PingPong.scss';

const PingPong = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_PINGPONG_MIX', payload: value });
  };

  const handleTime = (e) => {
    let { value } = e;
    value = 10 - value;
    value *= 4;
    updateState({ type: 'CHANGE_PINGPONG_TIME', payload: value });
  };

  const handleFeedback = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_PINGPONG_FEEDBACK', payload: value });
  };

  return (
    <div className='pingpong'>
      <div className='title-name'>ping-pong</div>

      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>mix</div>
          <div className='slider'>
            <Slider
              onChange={handleMix}
              value={appState.pingPong.wet * 100}
              property='wet'
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>time</div>
          <div className='slider'>
            <Slider
              onChange={handleTime}
              value={appState.pingPong.delayTime}
              property='delayTime'
              max={9}
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>feed</div>
          <div className='slider'>
            <Slider
              onChange={handleFeedback}
              value={appState.pingPong.feedback * 100}
              property='feedback'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PingPong;
