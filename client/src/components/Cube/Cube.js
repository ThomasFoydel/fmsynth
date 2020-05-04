import React, { useContext } from 'react';
import './Cube.scss';
import { CTX } from 'context/Store';
import { useSpring, animated, config } from 'react-spring';
import Navbar from 'components/Navbar/Navbar';

import Oscillator1Controller from 'components/Oscillator1Controller/Oscillator1Controller';
import Dino from 'components/Dino/Dino';

const Cube = () => {
  const [appState, updateState] = useContext(CTX);
  const { springConfig, currentTransform } = appState;

  const animationProps = useSpring({
    from: { transform: 'rotate3d(0, 100, 0, 270deg)' },
    transform: currentTransform,
    config: config[springConfig],
  });

  return (
    <div className='scene'>
      <animated.div className='cube' style={animationProps}>
        <div className='side right'>
          <Oscillator1Controller />
        </div>
        <div className='side back'>
          <Dino />
        </div>
        <div className='side left'>
          <Navbar />
        </div>
        <div className='side front'>
          <Navbar />
        </div>
        <div className='side bottom'>
          <Navbar />
        </div>
        <div className='side top'>
          <Navbar />
        </div>
      </animated.div>
    </div>
  );
};

export default Cube;
