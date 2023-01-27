const presets = [
  {
    text: 'default',
    author: 'thomas',
    value: {
      type: Array,
      default: {
        envelope: { attack: 0.01, decay: 4.1, sustain: 1, release: 1.21 },
        osc1Settings: {
          type: 'sine',
          detune: 0,
          octaveOffset: 0,
          gain: 0.20000000298023224
        },
        osc2Settings: {
          type: 'sine',
          detune: 0,
          octaveOffset: 0,
          gain: 0.20000000298023224
        },
        subOscSettings: {
          type: 'sine',
          octaveOffset: 0,
          gain: 0.20000000298023224
        },
        noiseSettings: { type: 'white', gain: 0.009999999776482582 },
        fm1Settings: { freqOffset: 440, type: 'sine', gain: 300 },
        lfoFilter: {
          type: 'sine',
          wet: 1,
          frequency: 1,
          depth: 0,
          baseFrequency: { logValue: 0, value: 0 },
          octaves: 2.6,
          filterQ: 1,
          filterType: 'highpass'
          // filterRolloff:
        },
        bitCrusher: { depth: 8, wet: 0 },
        distortion: {
          distortion: 0.1,
          wet: 0.1,
          oversample: 'none'
        },
        pingPong: { wet: 0, delayTime: 0.5, feedback: 0 },
        reverb: { impulse: 'block', wet: 0 },
        combFilter: { delayTime: 0.1, resonance: 0.5 },
        combFilterCrossFade: { fade: 0 },
        EQ: {
          lowFrequency: 0,
          logMin: 0,
          highFrequency: 100,
          logMax: 20000,
          high: 0,
          mid: 0,
          low: 0
        }
      }
    }
  }
]
export default presets
