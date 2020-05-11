import React from 'react';
import oscClass from './oscClass';
import Tone from 'tone';

const actx = Tone.context;
const out = actx.master;
const now = actx.currentTime;

const masterVol = new Tone.Volume(-10);
Tone.Transport.bpm.rampTo(140, 0.1);

const tremolo = new Tone.Tremolo(30, 0.9).start();
const chebyshev = new Tone.Chebyshev(2);
const stereoWidener = new Tone.StereoWidener(1);
const bitcrusher = new Tone.BitCrusher(8);

const filter = new Tone.Filter();

const lfo = new Tone.LFO('4n', 0, 2000).start();
lfo.connect(filter.frequency);
filter.frequency.value = 20000;
lfo.type = 'sawtooth';

const osc1Gain = actx.createGain();
const osc2Gain = actx.createGain();
const oscCombinedGain = actx.createGain();
osc1Gain.connect(oscCombinedGain);
osc2Gain.connect(oscCombinedGain);

const fmOsc1 = actx.createOscillator();
fmOsc1.start();
const fmOsc1Gain = actx.createGain();
fmOsc1Gain.gain.value = 3000;

Tone.connect(oscCombinedGain, bitcrusher);

bitcrusher.connect(chebyshev);
chebyshev.connect(stereoWidener);
stereoWidener.connect(tremolo);
tremolo.connect(filter);
filter.connect(masterVol);
masterVol.connect(out);

fmOsc1.connect(fmOsc1Gain);
lfo.connect(fmOsc1.frequency);

const CTX = React.createContext();

export { CTX };
const nodes = [];

export function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'CHANGE_OSC1_TYPE':
      return {
        ...state,
        osc1Settings: { ...state.osc1Settings, type: payload },
      };
    case 'CHANGE_OSC2_TYPE':
      return {
        ...state,
        osc2Settings: { ...state.osc2Settings, type: payload },
      };
    case 'MAKE_OSC':
      const newOsc1 = new oscClass(
        state.actx,
        state.osc1Settings.type,
        payload,
        0.0,
        state.envelope,
        state.osc1Gain,
        payload,
        fmOsc1Gain
      );
      const newOsc2 = new oscClass(
        state.actx,
        state.osc2Settings.type,
        payload,
        0.0,
        state.envelope,
        state.osc2Gain,
        payload,
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
        if (Math.round(nodes[i].initialFreq) === Math.round(payload)) {
          nodes[i].stop(0);
        } else {
          new_nodes.push(nodes[i]);
        }
      }
      nodes.push(new_nodes);

      const newNodeArr = state.nodes.filter(
        (n) => Math.round(n.initialFreq) !== Math.round(payload)
      );
      return {
        ...state,
        nodes: newNodeArr,
      };

    case 'CHANGE_FM_FREQ_OFFSET':
      fmOsc1.frequency.linearRampToValueAtTime(payload, now + 0.006);
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, freqOffset: payload },
      };
    case 'CHANGE_FM_WAVETABLE':
      fmOsc1.type = payload;
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, wavetable: payload },
      };
    case 'CHANGE_FM_GAIN':
      fmOsc1Gain.gain.exponentialRampToValueAtTime(payload, now + 0.006);
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, gain: payload },
      };
    case 'CHANGE_ROTATION':
      return {
        ...state,
        currentTransform: payload,
        currentPage: action.page,
      };
    case 'CHANGE_MOUSEFIELD':
      const xTimesFour = payload.x * 4;
      const roundedFourth = Math.round(xTimesFour);
      const plusOneTimesFour = (roundedFourth + 1) * 4;
      const newLfoVal = `${plusOneTimesFour}n`;
      lfo.frequency.value = newLfoVal;

      fmOsc1Gain.gain.linearRampToValueAtTime(payload.y * 7000, now);

      return {
        ...state,
        mouseField: { x: payload.x, y: payload.y },
      };
    case 'CHANGE_BITCRUSH_DEPTH':
      bitcrusher.bits = payload;
      return {
        ...state,
        bitCrusher: { ...state.bitCrusher, depth: payload },
      };
    case 'CHANGE_BITCRUSH_MIX':
      bitcrusher.wet.linearRampToValueAtTime(payload, now);
      return {
        ...state,
        bitCrusher: { ...state.bitCrusher, mix: payload },
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
    bitCrusher: { depth: 0, mix: 0 },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
