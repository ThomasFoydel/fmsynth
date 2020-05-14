import React, { useRef, useContext, useEffect, useState } from 'react';
import { useContainerDimensions } from 'util/customHooks';
import { animated, useSpring, config } from 'react-spring';
import './LfoFilter.scss';
import { CTX } from 'context/Store';
import { CircleSlider } from 'react-circle-slider';

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
  const { width, height } = useContainerDimensions(componentRef);

  const initVal = 0;

  // const [xVal, setXVal] = useState(initVal.toFixed(2));
  const [yVal, setYVal] = useState(initVal.toFixed(2));
  const [active, setActive] = useState(false);

  const handleMouseMove = (e) => {
    // const x = (e.nativeEvent.offsetX / width).toFixed(2);
    const y = (e.nativeEvent.offsetY / height).toFixed(2);

    if (y >= 0 && y <= 1) {
      // setXVal(x);
      setYVal(y);
      changeMouseLfo(+y);
    }
  };

  const handleMouseLeave = () => {
    console.log('MOUSE LEAVE');
    if (active) {
      setActive(false);
      // setXVal(0);
      setYVal(0);
      changeMouseLfo(0);
    }
  };

  const handleDepth = (e) => {
    e /= 100;
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'depth', value: e },
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
        <CircleSlider
          onChange={handleDepth}
          value={appState.lfoFilter.depth * 100}
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
          onMouseLeave={handleMouseLeave}
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
