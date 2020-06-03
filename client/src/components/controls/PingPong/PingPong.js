import React, { useContext } from 'react';
import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

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

        <div className='param time-param'>
          <div className='name'>time</div>
          <div className='time-selector'>
            <Selector
              onChange={handleTime}
              value={appState.pingPong.delayTime}
              size='xs'
              options={[
                { value: '1n', text: '1n' },
                { value: '1t', text: '1t' },
                { value: '2n', text: '2n' },
                { value: '2t', text: '2t' },
                { value: '4n', text: '4n' },
                { value: '4t', text: '4t' },
                { value: '8n', text: '8n' },
                { value: '8t', text: '8t' },
                { value: '16n', text: '16n' },
                { value: '16t', text: '16t' },
                { value: '32n', text: '32n' },
                { value: '32t', text: '32t' },
              ]}
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
