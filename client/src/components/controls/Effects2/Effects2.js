import React from 'react';

import LfoFilter from 'components/controls/LfoFilter/LfoFilter';
import CombFilter from 'components/controls/CombFilter/CombFilter';

import './Effects2.scss';

const Effects2 = () => {
  return (
    <div className='effects2'>
      <LfoFilter />
      <CombFilter />
    </div>
  );
};

export default Effects2;
