import { Schema, model, models, Types } from 'mongoose'

const presetData = new Schema({
  keyboardOctaveOffset: { type: Number },
  masterVol: { type: Number },
  masterBpm: { type: Number },
  envelope: {
    attack: { type: Number },
    decay: { type: Number },
    sustain: { type: Number },
    release: { type: Number }
  },
  osc1Settings: {
    type: { type: String },
    detune: { type: Number },
    octaveOffset: { type: Number },
    gain: { type: Number }
  },
  osc2Settings: {
    type: { type: String },
    detune: { type: Number },
    octaveOffset: { type: Number },
    gain: { type: Number }
  },
  subOscSettings: {
    type: { type: String },
    octaveOffset: { type: Number },
    gain: { type: Number }
  },
  noiseSettings: {
    type: { type: String },
    gain: { type: Number }
  },
  fm1Settings: {
    freqOffset: { type: Number },
    type: { type: String },
    gain: { type: Number }
  },
  lfoFilter: {
    type: { type: String },
    wet: { type: Number },
    frequency: { type: Number },
    depth: { type: Number },
    baseFrequency: { logValue: { type: Number }, value: { type: Number } },
    octaves: { type: Number },
    filterQ: { type: Number },
    filterType: { type: String },
    filterRolloff: { type: Number }
  },
  distortion: {
    distortion: { type: Number },
    wet: { type: Number },
    oversample: { type: String }
  },
  pingPong: {
    wet: { type: Number },
    delayTime: { type: Number },
    feedback: { type: Number }
  },
  reverb: {
    impulse: { type: String },
    wet: { type: Number }
  },
  combFilter: {
    delayTime: { type: String },
    resonance: { type: Number },
    wet: { type: Number }
  },
  EQ: {
    lowFrequency: { type: Number },
    highFrequency: { type: Number },
    high: { type: Number },
    mid: { type: Number },
    low: { type: Number }
  },
  vibrato: {
    depth: { type: Number },
    wet: { type: Number }
  }
})

const presetSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Types.ObjectId, required: true, ref: 'User' },
    state: { type: presetData, required: true }
  },
  { timestamps: true }
)

const Preset = models.Preset || model('Preset', presetSchema)
export default Preset
