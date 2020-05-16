import React, { useRef, useContext, useEffect, useState } from 'react';
import { useContainerDimensions } from 'util/customHooks';
import { animated, useSpring, config } from 'react-spring';
import './LfoFilter.scss';
import { CTX } from 'context/Store';
import Slider from 'components/controls/Slider/Slider';

const LfoFilter = ({ children }) => {
  const [appState, updateState] = useContext(CTX);
  const [springOn, setSpringOn] = useState(false);

  const changeMouseLfo = (y) => {
    y = 1 - y;
    updateState({ type: 'CHANGE_MOUSEFIELD', payload: { y } });
  };

  useEffect(() => {
    setSpringOn(true);
  }, []);

  const componentRef = useRef();
  const { height } = useContainerDimensions(componentRef);

  const initVal = 0;

  const [yVal, setYVal] = useState(initVal.toFixed(2));

  const handleMouseMove = (e) => {
    const y = (e.nativeEvent.offsetY / height).toFixed(2);

    if (y >= 0 && y <= 1) {
      // setXVal(x);
      setYVal(y);
      changeMouseLfo(+y);
    }
  };

  const handleDepth = (e) => {
    e.value /= 100;
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: e,
    });
  };

  const handleType = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'type', value: e.target.value },
    });
  };

  const gradientPercentage = (1 - yVal) * 100;
  const animationProps = useSpring({
    background: `linear-gradient(0deg, rgba(212,12,12,1) ${gradientPercentage}%, rgba(212,12,12,1) ${gradientPercentage}%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 100%)`,
    config: config.wobbly,
  });

  return (
    <div className='lfo-filter'>
      <div className='name'>lfo filter</div>
      <div className='slider'>
        <Slider
          onChange={handleDepth}
          value={appState.lfoFilter.depth * 100}
          min={0}
          max={100}
          step={1}
          property='mix'
        />
      </div>
      <div className='param'>
        <select onChange={handleType}>
          <option value='sine'>sine</option>
          <option value='sawtooth'>sawtooth</option>
          <option value='square'>square</option>
          <option value='triangle'>triangle</option>
        </select>
      </div>
      <div>
        <div className='name'>rate</div>
        <animated.div
          ref={componentRef}
          onMouseMove={handleMouseMove}
          className='mousefield'
          style={
            springOn
              ? animationProps
              : {
                  background: `linear-gradient(0deg, rgba(212,12,12,1) ${gradientPercentage}%, rgba(212,12,12,1) ${gradientPercentage}%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 100%)`,
                }
          }
        >
          {children}
        </animated.div>
      </div>
    </div>
  );
};

export default LfoFilter;
