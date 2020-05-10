import React, { useContext } from 'react';
import './Cube.scss';
import { CTX } from 'context/Store';
import { useSpring, animated, config } from 'react-spring';
import Navbar from 'components/Navbar/Navbar';

import Oscillator1Controller from 'components/Oscillator1Controller/Oscillator1Controller';
import Dino from 'components/Dino/Dino';
import MouseField from 'components/MouseField/MouseField';

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
        <div className={`side left ${currentPage === 'fx' && 'currentside'}`}>
          <Navbar />
          <MouseField />
        </div>
        <div
          className={`side front ${
            currentPage === 'products' && 'currentside'
          }`}
        >
          <Navbar />
        </div>
        <div
          className={`side bottom ${currentPage === 'login' && 'currentside'}`}
        >
          <Navbar />
        </div>
        <div
          className={`side top ${currentPage === 'register' && 'currentside'}`}
        >
          <Navbar />
        </div>
      </animated.div>
    </div>
  );
};

export default Cube;
