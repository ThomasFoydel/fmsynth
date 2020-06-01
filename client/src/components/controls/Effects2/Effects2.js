import React, { useContext } from 'react';

import LfoFilter from 'components/controls/LfoFilter/LfoFilter';
import CombFilter from 'components/controls/CombFilter/CombFilter';

import { CTX } from 'context/Store';
import './Effects2.scss';

const Effects2 = () => {
  const [appState, updateState] = useContext(CTX);

  return (
    <div className='effects2'>
      <LfoFilter />
      <CombFilter />
    </div>
  );
};

export default Effects2;
