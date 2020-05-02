import React from 'react';
import oscClass from './oscClass';

const actx = new AudioContext();

const osc1Gain = actx.createGain();

osc1Gain.connect(actx.destination);

const fmOsc1 = actx.createOscillator();
fmOsc1.start();
const fmOsc1Gain = actx.createGain();
fmOsc1.connect(fmOsc1Gain);

const CTX = React.createContext();

export { CTX };
const nodes = [];

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_OSC1_TYPE':
      return {
        ...state,
        osc1Settings: { ...state.osc1Settings, type: action.payload },
      };
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'MAKE_OSC':
      //   console.log('MAKE OSC TYPE: ', state.osc1Settings.type);
      const newOsc1 = new oscClass(
        state.actx,
        state.osc1Settings.type,
        action.payload,
        0.0,
        state.envelope,
        state.osc1Gain,
        action.payload,
        fmOsc1Gain
      );
      nodes.push(newOsc1);
      return {
        ...state,
        // nodes: [...state.nodes, newOsc1],
      };
    case 'KILL_OSC':
      var new_nodes = [];

      for (var i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].initialFreq) === Math.round(action.payload)) {
          nodes[i].stop(0);
        } else {
          new_nodes.push(nodes[i]);
        }
      }

      nodes.push(new_nodes);
      return {
        ...state,
        // nodes: new_nodes,
      };
    default:
      throw Error('reducer error');
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    actx: actx,
    nodes: [],
    osc1Settings: {
      type: 'sine',
      gain: 0.5,
      detune: 0.0,
    },
    osc1Gain: osc1Gain,
    isLoggedIn: false,
    // makeOscillator: (freq) => {
    //   const newOsc1 = new oscClass(
    //     actx,
    //     osc1Settings.type,
    //     freq,
    //     0.0,
    //     envelope,
    //     osc1Gain,
    //     freq
    //   );
    //   return newOsc1;
    // },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
