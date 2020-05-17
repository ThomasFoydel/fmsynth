import React, { useContext } from 'react';
import './Cube.scss';
import { CTX } from 'context/Store';
import { useSpring, animated, config } from 'react-spring';

import Effects from 'components/controls/Effects/Effects';

import Oscillator1Controller from 'components/Oscillators/Oscillators';
import Dino from 'components/Dino/Dino';
import Effects2 from 'components/controls/Effects2/Effects2';

const Cube = () => {
  const [appState, updateState] = useContext(CTX);
  const { springConfig, currentTransform, currentPage } = appState;

  const animationProps = useSpring({
    from: { transform: 'rotate3d(0, 100, 0, 270deg)' },
    transform: currentTransform,
    config: config[springConfig],
  });

  return (
    <div className='scene'>
      <animated.div className='cube' style={animationProps}>
        <div className={`side right ${currentPage === 'osc' && 'currentside'}`}>
          <Oscillator1Controller />
        </div>
        <div className={`side back ${currentPage === 'fm' && 'currentside'}`}>
          <Dino />
        </div>
        <div
          className={`side left ${
            currentPage === 'mousefield' && 'currentside'
          }`}
        ></div>
        <div className={`side front ${currentPage === 'fx' && 'currentside'}`}>
          <Effects />
        </div>
        <div
          className={`side bottom ${currentPage === 'fxII' && 'currentside'}`}
        >
          <Effects2 />
        </div>
        <div
          className={`side top ${currentPage === 'auth' && 'currentside'}`}
        ></div>
      </animated.div>
    </div>
  );
};

export default Cube;
