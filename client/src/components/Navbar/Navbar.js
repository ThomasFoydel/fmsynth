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
        className={`option ${currentPage === 'fx' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 90deg)`, 'fx');
        }}
      >
        fx
      </div>
      <div
        className={`option ${currentPage === 'products' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(0, 100, 0, 0deg)`, 'products');
        }}
      >
        products
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
        className={`option ${currentPage === 'register' && 'active'}`}
        onClick={() => {
          handleRotate(`rotate3d(100, 0, 0, 270deg)`, 'register');
        }}
      >
        register
      </div>
    </div>
  );
};

export default Navbar;
