import React from 'react';

import oscClass from './oscClass';
import noiseClass from './noiseClass';
import Tone from 'tone';
import impulses from 'IMreverbs/index';
import { calcFreq } from '../util/util';

const actx = Tone.context;
const out = actx.master;
const now = actx.currentTime;

const masterVol = new Tone.Volume(-10);
Tone.Transport.bpm.rampTo(140, 0.1);

const oscCombinedGain = actx.createGain();
const osc1Gain = actx.createGain();
const osc2Gain = actx.createGain();
const subOscGain = actx.createGain();
const noiseReduceGain = actx.createGain();
const noiseGain = actx.createGain();
osc1Gain.gain.value = 0.2;
osc2Gain.gain.value = 0.2;
subOscGain.gain.value = 0.2;
noiseGain.gain.value = 0.01;
noiseReduceGain.gain.value = 0.1;
osc1Gain.connect(oscCombinedGain);
osc2Gain.connect(oscCombinedGain);
noiseGain.connect(noiseReduceGain);
noiseReduceGain.connect(oscCombinedGain);

const chebyshev = new Tone.Chebyshev(2);
const combFilterCrossFade = new Tone.CrossFade(0);
const combFilter = new Tone.FeedbackCombFilter();
const bitcrusher = new Tone.BitCrusher(8);
const pingPongDelay = new Tone.PingPongDelay('4n', 0);
const reverb = new Tone.Convolver(impulses['block']);
const eq = new Tone.EQ3();
const limiter = new Tone.Limiter(-6);

// initialize effects at zero
bitcrusher.wet.value = 0;
chebyshev.wet.value = 0;
pingPongDelay.wet.value = 0;
reverb.wet.value = 0;

const lfoFilter = new Tone.AutoFilter({
  frequency: '2n',
  depth: 0,
}).start();
lfoFilter.baseFrequency = 0;
lfoFilter.filter._filters[0].type = 'highpass';
let initEnv = {
  attack: 0.01,
  decay: 4.1,
  sustain: 1,
  release: 1.21,
};

const fmOsc1 = actx.createOscillator();
fmOsc1.start();
const fmOsc1Gain = actx.createGain();
fmOsc1Gain.gain.value = 300;
fmOsc1.connect(fmOsc1Gain);

Tone.connect(oscCombinedGain, bitcrusher);

// harmonics, distortion, tone effects
bitcrusher.connect(chebyshev);
chebyshev.connect(lfoFilter);

// reverb and delay
Tone.connect(lfoFilter, pingPongDelay);
Tone.connect(pingPongDelay, combFilter);
pingPongDelay.connect(combFilterCrossFade, 0, 0);
combFilter.connect(combFilterCrossFade, 0, 1);

Tone.connect(combFilterCrossFade, reverb);

Tone.connect(reverb, eq);

Tone.connect(subOscGain, eq);

Tone.connect(eq, limiter);

Tone.connect(limiter, masterVol);
masterVol.connect(out);

const CTX = React.createContext();

export { CTX };
let nodes = [];

export function reducer(state, action) {
  let { payload } = action;
  let { prop, value } = payload ? payload : {};

  switch (action.type) {
    case 'MAKE_OSC':
      const osc1Freq = calcFreq(payload, state.osc1Settings.octaveOffset);
      const osc2Freq = calcFreq(payload, state.osc2Settings.octaveOffset);
      const subOscFreq = calcFreq(
        payload,
        state.subOscSettings.octaveOffset - 2
      );
      const newOsc1 = new oscClass(
        Tone,
        state.osc1Settings.type,
        osc1Freq,
        state.osc1Settings.detune,
        state.envelope,
        osc1Gain,
        payload,
        fmOsc1Gain
      );
      const newOsc2 = new oscClass(
        Tone,
        state.osc2Settings.type,
        osc2Freq,
        state.osc2Settings.detune,
        state.envelope,
        osc2Gain,
        payload,
        fmOsc1Gain
      );
      const newSubOsc = new oscClass(
        Tone,
        state.subOscSettings.type,
        subOscFreq,
        0.0,
        state.envelope,
        subOscGain,
        payload
      );
      const noiseOsc = new noiseClass(
        Tone,
        state.noiseSettings.type,
        state.envelope,
        noiseGain,
        payload
      );
      nodes.push(newOsc1, newOsc2, newSubOsc, noiseOsc);
      return {
        ...state,
        nodes: [...state.nodes, newOsc1, newOsc2, newSubOsc],
      };
    case 'KILL_OSC':
      var new_nodes = [];
      for (var i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].initialFreq) === Math.round(payload)) {
          nodes[i].stop();
        } else {
          new_nodes.push(nodes[i]);
        }
      }
      nodes = new_nodes;

      const newNodeArr = state.nodes.filter(
        (n) => Math.round(n.initialFreq) !== Math.round(payload)
      );
      return {
        ...state,
        nodes: newNodeArr,
      };
    case 'CHANGE_OSC1':
      return {
        ...state,
        osc1Settings: { ...state.osc1Settings, [prop]: value },
      };
    case 'CHANGE_OSC1_GAIN':
      osc1Gain.gain.linearRampToValueAtTime(payload, now);
      return {
        ...state,
        osc1Settings: { ...state.osc1Settings, gain: payload },
      };
    case 'CHANGE_OSC2':
      return {
        ...state,
        osc2Settings: { ...state.osc2Settings, [prop]: value },
      };
    case 'CHANGE_OSC2_GAIN':
      osc2Gain.gain.linearRampToValueAtTime(payload, now);
      return {
        ...state,
        osc2Settings: { ...state.osc2Settings, gain: payload },
      };

    case 'CHANGE_SUB_OSC':
      return {
        ...state,
        subOscSettings: { ...state.subOscSettings, [prop]: value },
      };

    case 'CHANGE_SUB_OSC_GAIN':
      subOscGain.gain.linearRampToValueAtTime(value, now);

      return {
        ...state,
        subOscSettings: { ...state.subOscSettings, gain: value },
      };

    case 'CHANGE_NOISE':
      return {
        ...state,
        noiseSettings: { ...state.noiseSettings, [prop]: value },
      };

    case 'CHANGE_NOISE_GAIN':
      noiseGain.gain.value = value;
      return {
        ...state,
        noiseSettings: { ...state.noiseSettings, gain: value },
      };

    case 'CHANGE_FM_FREQ_OFFSET':
      fmOsc1.frequency.value = payload;
      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, freqOffset: payload },
      };
    case 'CHANGE_FM_WAVETABLE':
      fmOsc1.type = payload;

      return {
        ...state,
        fm1Settings: { ...state.fm1Settings, type: payload },
      };
    case 'CHANGE_FM_GAIN':
      if (payload === 0) {
        payload = 0.00001;
      }
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
    // case 'CHANGE_MOUSEFIELD':
    //   const { y } = payload;
    //   const yTimesFour = y * 8;
    //   const roundedEigth = Math.round(yTimesFour);
    //   const plusOneTimesFour = (roundedEigth + 1) * 2;
    //   // lfoOsc.frequency.value = newLfoVal;
    //   lfoFilter.frequency.value = `${plusOneTimesFour}n`;
    //   // fmOsc1Gain.gain.linearRampToValueAtTime(payload.y * 7000, now);

    //   return {
    //     ...state,
    //     mouseField: { y },
    //   };
    case 'CHANGE_LFO_FILTER':
      if (prop === 'baseFrequency') {
        lfoFilter.baseFrequency = value.logValue;
        return {
          ...state,
          lfoFilter: {
            ...state.lfoFilter,
            baseFrequency: { value: value.value, logValue: value.logValue },
          },
        };
      } else if (prop === 'type' || prop === 'octaves') {
        lfoFilter[prop] = value;
      } else {
        lfoFilter[prop].value = value;
      }
      return {
        ...state,
        lfoFilter: { ...state.lfoFilter, [prop]: value },
      };
    case 'CHANGE_LFO_FILTER_FILTER':
      if (prop === 'rolloff') {
        lfoFilter.filter._rolloff = value;
      } else if (prop === 'Q') {
        lfoFilter.filter._filters[0][prop].value = value;
      } else if (prop === 'filterType') {
        lfoFilter.filter._filters[0].type = value;
      } else {
        console.log('ELSE!, ', payload);
        lfoFilter.filter._filters[0][prop] = value;
      }
      return {
        ...state,
        lfoFilter: { ...state.lfoFilter, [payload.stateProp]: value },
      };
    // case 'CHANGE_FILTER':
    //   if (prop === 'frequency' || prop === 'Q') {
    //     filter[prop].value = value;
    //   } else {
    //     filter[prop] = value;
    //   }
    //   return { ...state, filter: { ...state.filter, [prop]: value } };

    case 'CHANGE_BITCRUSH_DEPTH':
      bitcrusher.bits = payload;
      return {
        ...state,
        bitCrusher: { ...state.bitCrusher, depth: payload },
      };
    case 'CHANGE_BITCRUSH_MIX':
      bitcrusher.wet.value = payload;
      return {
        ...state,
        bitCrusher: { ...state.bitCrusher, wet: payload },
      };
    case 'CHANGE_CHEBYSHEV_MIX':
      chebyshev.wet.value = payload;
      return {
        ...state,
        chebyshev: { ...state.chebyshev, wet: payload },
      };
    case 'CHANGE_CHEBYSHEV_ORDER':
      chebyshev.order = payload;
      return {
        ...state,
        chebyshev: { ...state.chebyshev, order: payload },
      };
    case 'CHANGE_PINGPONG_MIX':
      pingPongDelay.wet.value = payload;
      return { ...state, pingPong: { ...state.pingPong, wet: payload } };
    case 'CHANGE_PINGPONG_TIME':
      pingPongDelay.delayTime.value = `${payload}n`;
      return { ...state, pingPong: { ...state.pingPong, delayTime: payload } };
    case 'CHANGE_PINGPONG_FEEDBACK':
      pingPongDelay.feedback.value = payload;
      return { ...state, pingPong: { ...state.pingPong, feedback: payload } };

    case 'CHANGE_REVERB_IMPULSE':
      reverb.load(impulses[payload]);
      return { ...state, reverb: { ...state.reverb, impulse: payload } };
    case 'CHANGE_REVERB_MIX':
      reverb.wet.value = payload;
      return { ...state, reverb: { ...state.reverb, wet: payload } };
    case 'CHANGE_COMB_FILTER':
      combFilter[prop].value = value;
      return { ...state, combFilter: { ...state.combFilter, [prop]: value } };
    case 'CHANGE_COMB_FILTER_CROSSFADE':
      combFilterCrossFade[prop].value = value;
      return {
        ...state,
        combFilterCrossFade: { ...state.combFilterCrossFade, [prop]: value },
      };
    case 'CHANGE_EQ_GAIN':
      eq[prop].value = value;

      return { ...state, EQ: { ...state.EQ, [prop]: value } };
    case 'CHANGE_EQ_RANGE':
      eq.highFrequency.value = payload.logMax;
      eq.lowFrequency.value = payload.logMin;
      return {
        ...state,
        EQ: {
          ...state.EQ,
          lowFrequency: payload.min,
          highFrequency: payload.max,
        },
      };
    case 'CHANGE_ENVELOPE':
      return {
        ...state,
        envelope: { ...state.envelope, [prop]: value },
      };
    case 'LOGIN':
      let { user, token } = payload;
      localStorage.setItem('fmsynth-token', token);
      const presetsArray = [];
      user.presets.forEach((preset, i) => {
        const presetObj = {
          text: preset.name,
          value: preset.params,
        };
        presetsArray.push(presetObj);
      });

      return {
        ...state,
        isLoggedIn: true,
        user: { name: user.name, email: user.email },
        presets: presetsArray,
      };
    case 'LOGOUT':
      localStorage.removeItem('fmsynth-token');
      return {
        ...state,
        isLoggedIn: false,
        user: { name: '', email: '' },
        presets: {},
      };
    case 'LOAD_PRESET':
      console.log('LOAD PRESET ACTION: ', action);
      eq.high.value = value.EQ.high;
      eq.mid.value = value.EQ.mid;
      eq.low.value = value.EQ.low;
      eq.highFrequency.value = value.EQ.highFrequency;
      eq.lowFrequency.value = value.EQ.lowFrequency;
      bitcrusher.wet.value = value.bitCrusher.wet;
      bitcrusher.bits = value.bitCrusher.depth;
      chebyshev.order = value.chebyshev.order;
      chebyshev.wet.value = value.chebyshev.wet;
      combFilter.delayTime.value = value.combFilter.delayTime;
      combFilter.resonance.value = value.combFilter.resonance;
      if (value.combFilterCrossFade.wet > 0) {
        combFilterCrossFade.fade.value = value.combFilterCrossFade.wet;
      } else {
        combFilterCrossFade.fade.value = 0.01;
      }
      fmOsc1.type = value.fm1Settings.type;
      fmOsc1Gain.gain.exponentialRampToValueAtTime(
        value.fm1Settings.gain,
        now + 0.001
      );
      fmOsc1.frequency.value = value.fm1Settings.freqOffset;
      lfoFilter.type = value.lfoFilter.type;
      if (value.lfoFilter.baseFrequency.logValue > 0) {
        lfoFilter.baseFrequency = value.lfoFilter.baseFrequency.logValue;
      } else {
        lfoFilter.baseFrequency = 0.01;
      }
      lfoFilter.octaves = value.lfoFilter.octaves;
      lfoFilter.depth.value = value.lfoFilter.depth;
      lfoFilter.wet.value = value.lfoFilter.wet;
      lfoFilter.filter._rolloff = value.lfoFilter.filterRolloff;
      lfoFilter.filter._filters[0].Q.value = value.lfoFilter.filterQ;
      lfoFilter.filter._filters[0].type = value.lfoFilter.filterType;
      pingPongDelay.wet.value = value.pingPong.wet;
      pingPongDelay.delayTime.value = value.pingPong.delayTime;
      pingPongDelay.feedback.value = value.pingPong.feedback;
      reverb.load(impulses[value.reverb.impulse]);
      reverb.wet.value = value.reverb.wet;
      return { ...state, ...value, currentPreset: action.text };

    case 'UPDATE_PRESETS':
      // return { ...state };
      return {
        ...state,
        presets: [...payload.presets],
        currentPreset: payload.current,
      };
    default:
      console.log('REDUCER ERROR: action: ', action);

      return { ...state };
    // throw Error('reducer error');
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    isLoggedIn: false,
    user: { name: '', email: '' },
    presets: [],
    currentTransform: `rotate3d(0, 100, 0, 270deg)`,
    currentPage: 'osc',
    springConfig: 'molasses',
    nodes: [],
    currentPreset: 'default',

    // audio settings:
    envelope: initEnv,
    osc1Settings: {
      type: 'sine',
      detune: 0,
      octaveOffset: 0,
      gain: osc1Gain.gain.value,
    },
    osc2Settings: {
      type: 'sine',
      detune: 0,
      octaveOffset: 0,
      gain: osc2Gain.gain.value,
    },
    subOscSettings: {
      type: 'sine',
      octaveOffset: 0,
      gain: subOscGain.gain.value,
    },
    noiseSettings: {
      type: 'white',
      gain: noiseGain.gain.value,
    },
    fm1Settings: {
      freqOffset: fmOsc1.frequency.value,
      type: fmOsc1.type,
      gain: fmOsc1Gain.gain.value,
    },
    lfoFilter: {
      type: lfoFilter.type,
      wet: lfoFilter.wet.value,
      frequency: lfoFilter.frequency.value,
      depth: lfoFilter.depth.value,
      baseFrequency: { logValue: 0, value: 0 },
      octaves: lfoFilter.octaves,
      filterQ: lfoFilter.filter._filters[0].Q.value,
      filterType: lfoFilter.filter._filters[0].type,
      filterRolloff: lfoFilter.filter._filters._rolloff,
    },
    bitCrusher: { depth: bitcrusher.bits, wet: bitcrusher.wet.value },
    chebyshev: { wet: 0, order: 1 },
    pingPong: {
      wet: pingPongDelay.wet.value,
      delayTime: pingPongDelay.delayTime.value,
      feedback: pingPongDelay.feedback.value,
    },
    reverb: {
      impulse: 'block',
      wet: reverb.wet.value,
    },
    combFilter: {
      delayTime: 0.1,
      resonance: 0.5,
    },
    combFilterCrossFade: {
      fade: combFilterCrossFade.fade.value,
    },
    EQ: {
      lowFrequency: 0,
      logMin: 0,
      highFrequency: 100,
      logMax: 20000,
      high: eq.high.value,
      mid: eq.mid.value,
      low: eq.low.value,
    },
    // actx: actx,
    // mouseField: { x: 0, y: 0 },
    // filter: {
    //   frequency: filter.frequency.value,
    //   rolloff: filter.rolloff.value,
    // },
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
