export default class noiseClass {
  constructor(Tone, type, envelope, connection, initialFreq) {
    this.context = Tone.context
    this.initialFreq = initialFreq
    this.noise = new Tone.Noise(type).start()
    this.gateGain = this.context.createGain()
    this.gateGain.gain.value = 0
    this.noise.connect(this.gateGain)
    Tone.connect(this.gateGain, connection)
    Tone.connect(this.gateGain, connection)

    this.envelope = envelope
      ? envelope
      : {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.6,
          release: 0.1
        }
    this.easing = 0.0006
    this.start()
  }
  start() {
    let { currentTime } = this.context
    this.gateGain.gain.setValueAtTime(0, currentTime + this.easing)
    this.gateGain.gain.linearRampToValueAtTime(
      1,
      currentTime + this.envelope.attack + this.easing
    )
    this.gateGain.gain.linearRampToValueAtTime(
      this.envelope.sustain,
      currentTime + this.envelope.attack + this.envelope.decay + this.easing
    )
  }
  stop() {
    let { currentTime } = this.context

    /* 
      https://stackoverflow.com/questions/34694580/how-do-i-correctly-cancel-a-currently-changing-audioparam-in-the-web-audio-api 
      */
    function expCurve(start, end) {
      const count = 10
      let t = 0
      const curve = new Float32Array(count + 1)
      start = Math.max(start, 0.0000001)
      end = Math.max(end, 0.0000001)
      for (let i = 0; i <= count; ++i) {
        curve[i] = start * Math.pow(end / start, t)
        t += 1 / count
      }
      return curve
    }

    const now = currentTime
    this.gateGain.gain.cancelScheduledValues(0)
    const currentVol = this.gateGain.gain.value
    this.gateGain.gain.setValueCurveAtTime(
      expCurve(currentVol, 1),
      now,
      this.envelope.attack
    )
    this.gateGain.gain.setValueCurveAtTime(
      expCurve(1, 0),
      now + this.envelope.attack,
      this.envelope.decay
    )

    setTimeout(() => {
      this.noise.stop()
      this.noise.dispose()
    }, 10000)
  }
}
