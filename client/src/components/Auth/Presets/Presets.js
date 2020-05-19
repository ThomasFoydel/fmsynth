import React, { useContext } from 'react';
import { CTX } from 'context/Store';

const Presets = () => {
  const [appState, updateState] = useContext(CTX);

  const handleLogOut = (e) => {
    updateState({ type: 'LOGOUT' });
  };

  return (
    <div>
      <button onClick={handleLogOut}>logout</button>
    </div>
  );
};

export default Presets;
