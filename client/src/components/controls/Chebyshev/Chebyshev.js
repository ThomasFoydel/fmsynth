import React, { useContext } from 'react';
import './Chebyshev.scss';
import { CTX } from 'context/Store';
import Slider from 'components/controls/Slider/Slider';

const Chebyshev = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_CHEBYSHEV_MIX', payload: value });
  };

  const handleOrder = (e) => {
    updateState({ type: 'CHANGE_CHEBYSHEV_ORDER', payload: e.value });
  };

  return (
    <div className='chebyshev'>
      <div className='name'>chebyshev</div>
      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>order</div>
          <Slider
            onChange={handleOrder}
            value={appState.chebyshev.order}
            property='order'
            step={2}
            max={99}
          />
        </div>

        <div className='param'>
          <div className='name'>mix</div>
          <Slider
            onChange={handleMix}
            value={appState.chebyshev.mix * 100}
            property='wet'
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Chebyshev;
