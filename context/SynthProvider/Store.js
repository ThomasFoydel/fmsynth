import * as Tone from 'tone'
import { createContext, useReducer } from 'react'
import impulses from '../../assets/impulseResponses'
import initialValues from './initialValues'
import { calcFreq } from '../../util/util'
import noiseClass from './noiseClass'
import oscClass from './oscClass'
import Synth from './synth'

let Store = () => <></>
let CTX

if (Tone && typeof window !== 'undefined') {
  const synth = new Synth()

  const {
    eq,
    now,
    fmOsc1,
    vibrato,
    reverb,
    osc1Gain,
    osc2Gain,
    lfoFilter,
    noiseGain,
    masterVol,
    fmOsc1Gain,
    subOscGain,
    combFilter,
    distortion,
    pingPongDelay,
    reverbCrossfade,
    combFilterCrossFade
  } = synth.audio

  CTX = createContext()

  let nodes = []

  synth.applyPreset(initialValues)

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
        let new_nodes = []
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

      case 'CHANGE_VIBRATO': {
        vibrato[prop].value = payload.value
        return { ...state, vibrato: { ...state.vibrato, [prop]: value } }
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
        combFilter.delayTime.value = state.combFilter.delayTime
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
        synth.applyPreset(value)
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
