import React, { useContext } from 'react';
import './Chebyshev.scss';
import { CTX } from 'context/Store';
import { CircleSlider } from 'react-circle-slider';

const Chebyshev = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    e /= 100;
    updateState({ type: 'CHANGE_CHEBYSHEV_MIX', payload: e });
  };

  const handleOrder = (e) => {
    updateState({ type: 'CHANGE_CHEBYSHEV_ORDER', payload: e });
  };

  return (
    <div className='chebyshev'>
      <div className='name'>chebyshev</div>
      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>order</div>
          <CircleSlider
            onChange={handleOrder}
            // value={appState.chebyshev.mix}
            knobRadius={4}
            shadow={false}
            size={35}
            circleWidth={3}
            progressWidth={5}
            min={1}
            max={99}
            showTooltip={true}
            tooltipSize={12}
            tooltipColor={'#eee'}
            progressColor={'#222'}
            stepSize={2}
          />
        </div>

        <div className='param'>
          <div className='name'>mix</div>
          <CircleSlider
            onChange={handleMix}
            // value={appState.chebyshev.mix}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Chebyshev;
