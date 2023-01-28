const mongoose = require('mongoose')
const Schema = mongoose.Schema

const presetData = new Schema({
  keyboardOctaveOffset: Number,
  masterVol: Number,
  masterBpm: Number,
  envelope: {
    attack: Number,
    decay: Number,
    sustain: Number,
    release: Number
  },
  osc1Settings: {
    type: String,
    detune: Number,
    octaveOffset: Number,
    gain: Number
  },
  osc2Settings: {
    type: String,
    detune: Number,
    octaveOffset: Number,
    gain: Number
  },
  subOscSettings: {
    type: String,
    octaveOffset: Number,
    gain: Number
  },
  noiseSettings: {
    type: String,
    gain: Number
  },
  fm1Settings: {
    freqOffset: Number,
    type: String,
    gain: Number
  },
  lfoFilter: {
    type: String,
    wet: Number,
    frequency: Number,
    depth: Number,
    baseFrequency: { logValue: Number, value: Number },
    octaves: Number,
    filterQ: Number,
    filterType: String,
    filterRolloff: Number
  },
  distortion: {
    distortion: Number,
    wet: Number,
    oversample: String
  },
  pingPong: {
    wet: Number,
    delayTime: Number,
    feedback: Number
  },
  reverb: {
    impulse: String,
    wet: Number
  },
  combFilter: {
    delayTime: String,
    resonance: Number,
    wet: Number
  },
  EQ: {
    lowFrequency: Number,
    highFrequency: Number,
    high: Number,
    mid: Number,
    low: Number
  },
  vibrato: {
    depth: Number,
    wet: Number
  }
})

const presetSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    state: { type: presetData, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Preset', presetSchema)
