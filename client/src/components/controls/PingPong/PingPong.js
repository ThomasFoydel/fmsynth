import React, { useContext } from 'react';
import { CircleSlider } from 'react-circle-slider';

import { CTX } from 'context/Store';
import './PingPong.scss';

const PingPong = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    e /= 100;
    updateState({ type: 'CHANGE_PINGPONG_MIX', payload: e });
  };

  const handleTime = (e) => {
    e = 10 - e;
    e *= 4;
    updateState({ type: 'CHANGE_PINGPONG_TIME', payload: e });
  };

  const handleFeedback = (e) => {
    e /= 100;
    updateState({ type: 'CHANGE_PINGPONG_FEEDBACK', payload: e });
  };

  return (
    <div className='pingpong'>
      <div className='name'>ping-pong</div>

      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>mix</div>
          <div className='slider'>
            <CircleSlider
              onChange={handleMix}
              value={appState.pingPong.mix * 100}
              knobRadius={4}
              shadow={false}
              size={35}
              circleWidth={3}
              progressWidth={5}
              min={0}
              max={100}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
              stepSize={1}
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>time</div>
          <div className='slider'>
            <CircleSlider
              onChange={handleTime}
              value={appState.pingPong.delayTime}
              knobRadius={4}
              shadow={false}
              size={35}
              circleWidth={3}
              progressWidth={5}
              min={1}
              max={9}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
              stepSize={1}
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>feed</div>
          <div className='slider'>
            <CircleSlider
              onChange={handleFeedback}
              value={appState.pingPong.feedback * 100}
              knobRadius={4}
              shadow={false}
              size={35}
              circleWidth={3}
              progressWidth={5}
              min={0}
              max={100}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
              stepSize={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PingPong;
