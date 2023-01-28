import * as Tone from 'tone'
import impulses from '../assets/impulseResponses'

class Synth {
  constructor() {
    if (!this.audio) {
      const actx = Tone.context
      const out = Tone.Destination
      const now = actx.currentTime
      const masterVol = new Tone.Volume(-10)
      const oscCombinedGain = actx.createGain()
      const osc1Gain = actx.createGain()
      const osc2Gain = actx.createGain()
      const subOscGain = actx.createGain()
      const noiseReduceGain = actx.createGain()
      const noiseGain = actx.createGain()

      osc1Gain.connect(oscCombinedGain)
      osc2Gain.connect(oscCombinedGain)
      noiseGain.connect(noiseReduceGain)
      noiseReduceGain.connect(oscCombinedGain)
      const distortion = new Tone.Distortion(0.9)
      const combFilterCrossFade = new Tone.CrossFade(0)
      const combFilter = new Tone.FeedbackCombFilter()
      const vibrato = new Tone.Vibrato()
      const pingPongDelay = new Tone.PingPongDelay('4n', 0)
      const reverb = new Tone.Convolver(impulses['block'])
      const reverbCrossfade = new Tone.CrossFade()
      const eq = new Tone.EQ3()
      const limiter = new Tone.Limiter(-6)
      const lfoFilter = new Tone.AutoFilter({
        frequency: '2n',
        depth: 0
      }).start()
      lfoFilter.sync().start(Tone.now())
      lfoFilter.baseFrequency = 0
      lfoFilter.filter._filters[0].type = 'highpass'
      const fmOsc1 = actx.createOscillator()
      fmOsc1.start()
      const fmOsc1Gain = actx.createGain()
      fmOsc1Gain.gain.value = 300
      fmOsc1.connect(fmOsc1Gain)
      Tone.connect(oscCombinedGain, vibrato)
      Tone.connect(vibrato, distortion)
      distortion.connect(pingPongDelay)
      Tone.connect(pingPongDelay, combFilter)
      pingPongDelay.connect(combFilterCrossFade.a)
      combFilter.connect(combFilterCrossFade.b)
      Tone.connect(combFilterCrossFade, lfoFilter)
      Tone.connect(subOscGain, lfoFilter)
      Tone.connect(lfoFilter, reverb)
      Tone.connect(reverb, reverbCrossfade.a)
      Tone.connect(lfoFilter, reverbCrossfade.b)
      Tone.connect(reverbCrossfade, eq)
      Tone.connect(eq, limiter)
      Tone.connect(limiter, masterVol)
      masterVol.connect(out)
      const audio = {
        actx,
        out,
        now,
        masterVol,
        oscCombinedGain,
        osc1Gain,
        osc2Gain,
        subOscGain,
        noiseReduceGain,
        noiseGain,
        distortion,
        combFilterCrossFade,
        combFilter,
        vibrato,
        pingPongDelay,
        reverb,
        reverbCrossfade,
        eq,
        limiter,
        lfoFilter,
        fmOsc1,
        fmOsc1Gain
      }
      this.audio = audio
    }
  }
}

export default Synth
