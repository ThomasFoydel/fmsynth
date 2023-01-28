import * as Tone from 'tone'
import { createContext, useReducer } from 'react'
import impulses from '../assets/impulseResponses'
import { calcFreq } from '../util/util'
import presets from './initialPresets'
import noiseClass from './noiseClass'
import oscClass from './oscClass'
import Synth from './synth'

let Store = () => <></>
let CTX

const initialValues = {
  isLoggedIn: false,
  user: { name: '', email: '' },
  presets,
  currentTransform: `rotate3d(0, 100, 0, 270deg)`,
  currentPage: 'osc',
  springConfig: 'molasses',
  nodes: [],
  currentPreset: 'default',
  keyboardOctaveOffset: 0,
  masterVol: -10,
  masterBpm: 120,

  envelope: {
    attack: 0.1,
    decay: 4.1,
    sustain: 1,
    release: 1.21
  },
  osc1Settings: {
    type: 'sine',
    detune: 0,
    octaveOffset: 0,
    gain: 0.2
  },
  osc2Settings: {
    type: 'sine',
    detune: 0,
    octaveOffset: 0,
    gain: 0.2
  },
  subOscSettings: {
    type: 'sine',
    octaveOffset: 0,
    gain: 0.2
  },
  noiseSettings: {
    type: 'white',
    gain: 0.01
  },
  fm1Settings: {
    freqOffset: 440,
    type: 'sine',
    gain: 300
  },
  lfoFilter: {
    type: 'sine',
    wet: 0,
    frequency: 0,
    depth: 0,
    baseFrequency: { logValue: 0, value: 0 },
    octaves: 2.6,
    filterQ: 0,
    filterType: 'highpass',
    filterRolloff: -12
  },
  distortion: {
    distortion: 0.9,
    wet: 0,
    oversample: 'none'
  },
  pingPong: {
    wet: 0,
    delayTime: 0.5,
    feedback: 0
  },
  reverb: {
    impulse: 'block',
    wet: 0
  },
  combFilter: {
    delayTime: 0.1,
    resonance: 0.5,
    wet: 0
  },
  EQ: {
    lowFrequency: 0,
    highFrequency: 100,
    high: 0,
    mid: 0,
    low: 0
  }
}

if (Tone && typeof window !== 'undefined') {
  const { audio } = new Synth()

  const {
    actx,
    out,
    now,
    masterVol,
    osc1Gain,
    osc2Gain,
    subOscGain,
    noiseGain,
    distortion,
    combFilterCrossFade,
    combFilter,
    pingPongDelay,
    reverb,
    reverbCrossfade,
    eq,
    limiter,
    lfoFilter,
    fmOsc1,
    fmOsc1Gain
  } = audio

  CTX = createContext()

  let nodes = []

  masterVol.volume.value = initialValues.masterVol
  Tone.Transport.bpm.value = initialValues.masterBpm
  osc1Gain.gain.value = initialValues.osc1Settings.gain
  osc2Gain.gain.value = initialValues.osc2Settings.gain
  subOscGain.gain.value = initialValues.subOscSettings.gain
  noiseGain.gain.value = initialValues.noiseSettings.gain
  fmOsc1Gain.gain.value = initialValues.fm1Settings.gain
  lfoFilter.type = initialValues.lfoFilter.type
  lfoFilter.wet.value = initialValues.lfoFilter.wet
  lfoFilter.frequency.value = initialValues.lfoFilter.frequency
  lfoFilter.depth.value = initialValues.lfoFilter.depth
  lfoFilter.baseFrequency = initialValues.lfoFilter.baseFrequency.logValue
  lfoFilter.octaves = initialValues.lfoFilter.octaves
  lfoFilter.filter._filters[0].Q.value = initialValues.lfoFilter.filterQ
  lfoFilter.filter._filters[0].type = initialValues.lfoFilter.filterType
  lfoFilter.filter._rolloff = initialValues.lfoFilter.filterRolloff
  combFilterCrossFade.fade.value = initialValues.combFilter.wet
  fmOsc1.frequency.value = initialValues.fm1Settings.freqOffset
  fmOsc1.type = initialValues.fm1Settings.type
  distortion._distortion = initialValues.distortion.distortion
  distortion.wet.value = initialValues.distortion.wet
  distortion.oversample = initialValues.distortion.oversample
  pingPongDelay.wet.value = initialValues.pingPong.wet
  pingPongDelay.delayTime.value = initialValues.pingPong.delayTime
  pingPongDelay.feedback.value = initialValues.pingPong.feedback
  eq.lowFrequency.value = initialValues.EQ.lowFrequency
  eq.highFrequency.value = initialValues.EQ.highFrequency
  eq.high.value = initialValues.EQ.high
  eq.mid.value = initialValues.EQ.mid
  eq.low.value = initialValues.EQ.low

  function reducer(state, action) {
    let { payload } = action
    let { prop, value } = payload ? payload : {}
    switch (action.type) {
      case 'MAKE_OSC':
        const osc1Freq = calcFreq(
          payload,
          state.osc1Settings.octaveOffset + state.keyboardOctaveOffset
        )
        const osc2Freq = calcFreq(
          payload,
          state.osc2Settings.octaveOffset + state.keyboardOctaveOffset
        )
        const subOscFreq = calcFreq(
          payload,
          state.subOscSettings.octaveOffset - 2 + state.keyboardOctaveOffset
        )
        const newOsc1 = new oscClass(
          Tone,
          state.osc1Settings.type,
          osc1Freq,
          state.osc1Settings.detune,
          state.envelope,
          osc1Gain,
          payload,
          fmOsc1Gain
        )
        const newOsc2 = new oscClass(
          Tone,
          state.osc2Settings.type,
          osc2Freq,
          state.osc2Settings.detune,
          state.envelope,
          osc2Gain,
          payload,
          fmOsc1Gain
        )
        const newSubOsc = new oscClass(
          Tone,
          state.subOscSettings.type,
          subOscFreq,
          0.0,
          state.envelope,
          subOscGain,
          payload
        )
        const noiseOsc = new noiseClass(
          Tone,
          state.noiseSettings.type,
          state.envelope,
          noiseGain,
          payload
        )
        nodes.push(newOsc1, newOsc2, newSubOsc, noiseOsc)
        return {
          ...state,
          nodes: [...state.nodes, newOsc1, newOsc2, newSubOsc]
        }

      case 'KILL_OSC':
        var new_nodes = []
        for (var i = 0; i < nodes.length; i++) {
          if (Math.round(nodes[i].initialFreq) === Math.round(payload)) {
            nodes[i].stop()
          } else {
            new_nodes.push(nodes[i])
          }
        }
        nodes = new_nodes

        const newNodeArr = state.nodes.filter(
          (n) => Math.round(n.initialFreq) !== Math.round(payload)
        )
        return {
          ...state,
          nodes: newNodeArr
        }

      case 'CHANGE_OSC1':
        return {
          ...state,
          osc1Settings: { ...state.osc1Settings, [prop]: value }
        }

      case 'CHANGE_OSC1_GAIN':
        osc1Gain.gain.linearRampToValueAtTime(payload, now)
        return {
          ...state,
          osc1Settings: { ...state.osc1Settings, gain: payload }
        }

      case 'CHANGE_OSC2':
        return {
          ...state,
          osc2Settings: { ...state.osc2Settings, [prop]: value }
        }

      case 'CHANGE_OSC2_GAIN':
        osc2Gain.gain.linearRampToValueAtTime(payload, now)
        return {
          ...state,
          osc2Settings: { ...state.osc2Settings, gain: payload }
        }

      case 'CHANGE_SUB_OSC':
        return {
          ...state,
          subOscSettings: { ...state.subOscSettings, [prop]: value }
        }

      case 'CHANGE_SUB_OSC_GAIN':
        subOscGain.gain.linearRampToValueAtTime(value, now)
        return {
          ...state,
          subOscSettings: { ...state.subOscSettings, gain: value }
        }

      case 'CHANGE_NOISE':
        return {
          ...state,
          noiseSettings: { ...state.noiseSettings, [prop]: value }
        }

      case 'CHANGE_NOISE_GAIN':
        noiseGain.gain.value = value
        return {
          ...state,
          noiseSettings: { ...state.noiseSettings, gain: value }
        }

      case 'CHANGE_FM_FREQ_OFFSET':
        fmOsc1.frequency.value = payload
        return {
          ...state,
          fm1Settings: { ...state.fm1Settings, freqOffset: payload }
        }

      case 'CHANGE_FM_WAVETABLE':
        fmOsc1.type = payload
        return {
          ...state,
          fm1Settings: { ...state.fm1Settings, type: payload }
        }

      case 'CHANGE_FM_GAIN':
        if (payload === 0) {
          payload = 0.00001
        }
        fmOsc1Gain.gain.exponentialRampToValueAtTime(payload, now + 0.006)
        return {
          ...state,
          fm1Settings: { ...state.fm1Settings, gain: payload }
        }

      case 'CHANGE_ROTATION':
        return {
          ...state,
          currentTransform: payload,
          currentPage: action.page
        }

      case 'CHANGE_LFO_FILTER':
        if (prop === 'baseFrequency') {
          lfoFilter.baseFrequency = value.logValue
          return {
            ...state,
            lfoFilter: {
              ...state.lfoFilter,
              baseFrequency: { value: value.value, logValue: value.logValue }
            }
          }
        } else if (prop === 'type' || prop === 'octaves') {
          lfoFilter[prop] = value
        } else {
          lfoFilter[prop].value = value
        }
        return {
          ...state,
          lfoFilter: { ...state.lfoFilter, [prop]: value }
        }

      case 'CHANGE_LFO_FILTER_FILTER':
        if (prop === 'rolloff') {
          lfoFilter.filter._rolloff = value
          value = +value
        } else if (prop === 'Q') {
          lfoFilter.filter._filters[0][prop].value = value
        } else if (prop === 'filterType') {
          lfoFilter.filter._filters[0].type = value
        } else {
          lfoFilter.filter._filters[0][prop] = value
        }
        return {
          ...state,
          lfoFilter: { ...state.lfoFilter, [payload.stateProp]: value }
        }

      case 'CHANGE_DISTORTION_AMOUNT':
        distortion.distortion = payload / 100
        return {
          ...state,
          distortion: { ...state.distortion, distortion: payload }
        }

      case 'CHANGE_DISTORTION_OVERSAMPLE':
        distortion._shaper._shaper.oversample = payload
        return {
          ...state,
          distortion: { ...state.distortion, oversample: payload }
        }

      case 'CHANGE_DISTORTION_MIX':
        distortion.wet.value = payload
        return { ...state, distortion: { ...state.distortion, wet: payload } }

      case 'CHANGE_PINGPONG_MIX':
        pingPongDelay.wet.value = payload
        return { ...state, pingPong: { ...state.pingPong, wet: payload } }

      case 'CHANGE_PINGPONG_TIME':
        pingPongDelay.delayTime.value = payload
        return { ...state, pingPong: { ...state.pingPong, delayTime: payload } }

      case 'CHANGE_PINGPONG_FEEDBACK':
        pingPongDelay.feedback.value = payload
        return { ...state, pingPong: { ...state.pingPong, feedback: payload } }

      case 'CHANGE_REVERB_IMPULSE':
        reverb.load(impulses[payload])
        return { ...state, reverb: { ...state.reverb, impulse: payload } }

      case 'CHANGE_REVERB_MIX':
        reverbCrossfade.value = payload
        return { ...state, reverb: { ...state.reverb, wet: payload } }

      case 'CHANGE_COMB_FILTER':
        if (prop === 'wet') combFilterCrossFade.fade.value = value
        else combFilter[prop].value = value
        return { ...state, combFilter: { ...state.combFilter, [prop]: value } }

      case 'CHANGE_EQ_GAIN':
        eq[prop].value = value
        return { ...state, EQ: { ...state.EQ, [prop]: value } }

      case 'CHANGE_EQ_RANGE':
        eq.highFrequency.value = payload.logMax
        eq.lowFrequency.value = payload.logMin
        return {
          ...state,
          EQ: {
            ...state.EQ,
            lowFrequency: payload.min,
            highFrequency: payload.max
          }
        }

      case 'CHANGE_ENVELOPE':
        return {
          ...state,
          envelope: { ...state.envelope, [prop]: value }
        }

      case 'SHIFT_KEYBOARD_OCTAVE':
        return { ...state, keyboardOctaveOffset: payload }

      case 'CHANGE_MASTER_VOLUME':
        masterVol.volume.value = payload
        return { ...state, masterVol: payload }

      case 'CHANGE_MASTER_BPM':
        Tone.Transport.bpm.rampTo(payload, 0.01)
        // combFilter.delayTime.value = state.combFilter.delayTime
        lfoFilter.frequency.value = state.lfoFilter.frequency
        pingPongDelay.delayTime.value = state.pingPong.delayTime
        return { ...state, masterBpm: payload }

      case 'LOGIN':
        let { user, token } = payload
        localStorage.setItem('fmsynth-token', token)
        const presetsArray = []
        if (user.presets) {
          user.presets.forEach((preset, i) => {
            const presetObj = {
              text: preset.name,
              value: preset.params
            }
            presetsArray.push(presetObj)
          })
        }
        return {
          ...state,
          isLoggedIn: true,
          user: { name: user.name, email: user.email },
          presets: presetsArray
        }

      case 'LOGOUT':
        localStorage.removeItem('fmsynth-token')
        return {
          ...state,
          isLoggedIn: false,
          user: { name: '', email: '' },
          presets: []
        }

      case 'LOAD_PRESET':
        eq.high.value = value.EQ.high
        eq.mid.value = value.EQ.mid
        eq.low.value = value.EQ.low
        eq.highFrequency.value = value.EQ.highFrequency
        eq.lowFrequency.value = value.EQ.lowFrequency

        distortion.distortion = value.distortion.distortion
        distortion.wet.value = value.distortion.wet
        distortion._shaper._shaper._oversample = value.distortion.oversample

        // combFilter.delayTime.value = value.combFilter.delayTime
        // combFilter.resonance.value = value.combFilter.resonance
        if (value.combFilterCrossFade.wet > 0) {
          combFilterCrossFade.fade.value = value.combFilter.wet
        } else {
          combFilterCrossFade.fade.value = 0.01
        }

        fmOsc1.frequency.value = value.fm1Settings.freqOffset
        fmOsc1.type = value.fm1Settings.type
        fmOsc1Gain.gain.exponentialRampToValueAtTime(
          value.fm1Settings.gain,
          now + 0.001
        )

        lfoFilter.baseFrequency = value.lfoFilter.baseFrequency.logValue
        lfoFilter.type = value.lfoFilter.type
        lfoFilter.octaves = value.lfoFilter.octaves
        lfoFilter.depth.value = value.lfoFilter.depth
        lfoFilter.wet.value = value.lfoFilter.wet
        lfoFilter.filter._rolloff = value.lfoFilter.filterRolloff
        lfoFilter.filter._filters[0].Q.value = value.lfoFilter.filterQ
        lfoFilter.filter._filters[0].type = value.lfoFilter.filterType

        pingPongDelay.wet.value = value.pingPong.wet
        pingPongDelay.delayTime.value = value.pingPong.delayTime
        pingPongDelay.feedback.value = value.pingPong.feedback

        reverb.load(impulses[value.reverb.impulse])
        reverbCrossfade.fade.value = value.reverb.wet

        return { ...state, ...value, currentPreset: action.text }

      case 'UPDATE_PRESETS':
        return {
          ...state,
          presets: [...payload.presets],
          currentPreset: payload.current
        }
      default:
        console.error('REDUCER ERROR: action: ', action)
        return { ...state }
    }
  }

  Store = (props) => {
    const stateHook = useReducer(reducer, initialValues)

    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
  }
}

export default Store
export { CTX }
