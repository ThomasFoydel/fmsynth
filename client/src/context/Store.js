import React from 'react';
import oscClass from './oscClass';
import Tone from 'tone';

const actx = Tone.context;

// console.log(actx.master);
// Tone.Master.volume.exponentialRampToValueAtTime(0.001, actx.currentTime);
const masterVol = new Tone.Volume(-10);
// const out = actx._context.destination;
const out = actx.master;

const tremolo = new Tone.Tremolo(30, 0.9).start();
const chebyshev = new Tone.Chebyshev(3);
const stereoWidener = new Tone.StereoWidener(1);
const bitcrusher = new Tone.BitCrusher(8);

const filter = new Tone.Filter();

const lfo = new Tone.LFO('4n', 0, 2000).start();
// lfo.connect(filter.frequency);
filter.frequency.value = 20000;
lfo.type = 'triangle';

const osc1Gain = actx.createGain();
const osc2Gain = actx.createGain();

// osc1Gain.connect(bitcrusher);
Tone.connect(osc1Gain, bitcrusher);
Tone.connect(osc2Gain, bitcrusher);
bitcrusher.connect(filter);
filter.connect(masterVol);
masterVol.connect(out);

const fmOsc1 = actx.createOscillator();
fmOsc1.start();
const fmOsc1Gain = actx.createGain();
fmOsc1Gain.gain.value = 3000;
fmOsc1.connect(fmOsc1Gain);

const CTX = React.createContext();

lfo.connect(fmOsc1.frequency);

export { CTX };
const nodes = [];

export function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'CHANGE_OSC1_TYPE':
      return {
        ...state,
        osc1Settings: { ...state.osc1Settings, type: action.payload },
      };
    case 'CHANGE_OSC2_TYPE':
      return {
        ...state,
        osc2Settings: { ...state.osc2Settings, type: action.payload },
      };
    case 'MAKE_OSC':
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
      const newOsc2 = new oscClass(
        state.actx,
        state.osc2Settings.type,
        action.payload,
        0.0,
        state.envelope,
        state.osc2Gain,
        action.payload,
        fmOsc1Gain
      );
      nodes.push(newOsc1, newOsc2);
      return {
        ...state,
        nodes: [...state.nodes, newOsc1],
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

      const newNodeArr = state.nodes.filter(
        (n) => Math.round(n.initialFreq) !== Math.round(action.payload)
      );
      return {
        ...state,
        nodes: newNodeArr,
      };

    case 'CHANGE_FM_FREQ_OFFSET':
      fmOsc1.frequency.linearRampToValueAtTime(
        action.payload,
        actx.currentTime + 0.006
      );
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, freqOffset: action.payload },
      };
    case 'CHANGE_FM_WAVETABLE':
      fmOsc1.type = action.payload;
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, wavetable: action.payload },
      };
    case 'CHANGE_FM_GAIN':
      fmOsc1Gain.gain.exponentialRampToValueAtTime(
        action.payload,
        actx.currentTime + 0.006
      );
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, gain: action.payload },
      };
    case 'CHANGE_ROTATION':
      return {
        ...state,
        currentTransform: action.payload,
        currentPage: action.page,
      };
    case 'CHANGE_MOUSEFIELD':
      const xTimesFour = action.payload.x * 4;
      const roundedFourth = Math.round(xTimesFour);
      const plusOneTimesFour = (roundedFourth + 1) * 4;
      const newLfoVal = `${plusOneTimesFour}n`;
      lfo.frequency.value = newLfoVal;

      fmOsc1Gain.gain.linearRampToValueAtTime(
        action.payload.y * 10000,
        actx.currentTime
      );

      return {
        ...state,
        mouseField: { x: action.payload.x, y: action.payload.y },
      };
    default:
      throw Error('reducer error');
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    actx: actx,
    nodes: [],
    envelope: {
      attack: 0.0,
      decay: 1,
      sustain: 1,
      release: 0,
    },
    osc1Settings: {
      type: 'sine',
      gain: 0.5,
      detune: 0.0,
    },
    osc1Settings: {
      gain: osc1Gain.gain.value,
      detune: 0,
      type: 'sine',
    },
    osc1Gain: osc1Gain,
    osc2Gain: osc2Gain,
    osc2Settings: {
      gain: osc2Gain.gain.value,
      detune: 0,
      type: 'sine',
    },
    fm1Settings: {
      freqOffset: 100,
      wavetable: fmOsc1.type,
      gain: fmOsc1Gain.gain.value,
    },
    isLoggedIn: false,
    currentTransform: `rotate3d(0, 100, 0, 270deg)`,
    currentPage: 'osc',
    springConfig: 'molasses',
    mouseField: { x: 0, y: 0 },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
