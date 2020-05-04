import React, { useContext } from 'react';
import './Cube.scss';
import { CTX } from 'context/Store';
import { useSpring, animated, config } from 'react-spring';

const Cube = () => {
  const [appState, updateState] = useContext(CTX);
  const { springConfig, currentTransform } = appState;
  console.log('spring config: ', springConfig);
  const animationProps = useSpring({
    from: { transform: 'rotate3d(0, 100, 0, 270deg)' },
    transform: currentTransform,
    config: config[springConfig],
  });

  return (
    <div className='scene'>
      <animated.div className='cube' style={animationProps}>
        {/* <div className='cube'> */}
        <div className='side right'></div>
        <div className='side front'></div>
        <div className='side back'></div>
        <div className='side left'></div>
        <div className='side bottom'></div>
        <div className='side top'></div>
        {/* </div> */}
        {/* <CubeSide side='right' pageTitle='home' />
        <CubeSide side='front' pageTitle='products' />
        <CubeSide side='back' pageTitle='about' />
        <CubeSide side='left' pageTitle='contact' />
        <CubeSide side='bottom' pageTitle='login' />
        <CubeSide side='top' pageTitle='register' /> */}
      </animated.div>
    </div>
  );
};

export default Cube;
