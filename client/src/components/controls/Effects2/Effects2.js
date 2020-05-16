import React, { useContext } from 'react';

import LfoFilter from 'components/LfoFilter/LfoFilter';
import Filter from 'components/controls/Filter/Filter';

import { CTX } from 'context/Store';
import './Effects2.scss';

const Effects2 = () => {
  const [appState, updateState] = useContext(CTX);

  return (
    <div className='effects2'>
      <Filter />
      <LfoFilter />
    </div>
  );
};

export default Effects2;
