import React, { useContext } from 'react';
import { CTX } from 'context/Store';
import './Navbar.scss';

const Navbar = () => {
  const [appState, updateState] = useContext(CTX);
  const { currentPage } = appState;
  const handleRotate = (rotationValue, page) => {
    updateState({ type: 'CHANGE_ROTATION', payload: rotationValue, page });
  };
  return (
    <div className='navbar'>
      <div
        className={`option ${currentPage === 'osc' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 270deg)`, 'osc');
        }}
      >
        osc
      </div>
      <div
        className={`option ${currentPage === 'fm' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 180deg)`, 'fm');
        }}
      >
        fm
      </div>
      <div
        className={`option ${currentPage === 'mousefield' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 90deg)`, 'mousefield');
        }}
      >
        mousefield
      </div>
      <div
        className={`option ${currentPage === 'fx' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 0deg)`, 'fx');
        }}
      >
        fx
      </div>
      <div
        className={`option ${currentPage === 'login' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 100, 180deg)`, 'login');
        }}
      >
        login
      </div>
      <div
        className={`option ${currentPage === 'auth' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(100, 0, 0, 270deg)`, 'auth');
        }}
      >
        auth
      </div>
    </div>
  );
};

export default Navbar;
