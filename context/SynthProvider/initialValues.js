const initialValues = {
  isLoggedIn: false,
  user: { name: '', email: '' },
  presets: [],
  currentTransform: `rotate3d(0, 100, 0, 270deg)`,
  currentPage: 'osc',
  springConfig: 'molasses',
  nodes: [],
  currentPreset: 'default',
  keyboardOctaveOffset: 0,
  masterVol: 0,
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
    delayTime: '8t',
    resonance: 0.5,
    wet: 0
  },
  EQ: {
    lowFrequency: 0,
    highFrequency: 100,
    high: 0,
    mid: 0,
    low: 0
  },
  vibrato: {
    depth: 0.5,
    wet: 0
  }
}

export default initialValues
