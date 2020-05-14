import React, { useContext } from 'react';
import './Effects2.scss';
import LfoFilter from 'components/LfoFilter/LfoFilter';
import { CTX } from 'context/Store';
const Effects2 = () => {
  const [appState, updateState] = useContext(CTX);

  return (
    <div>
      <LfoFilter />
    </div>
  );
};

export default Effects2;
