// current issue, line 82, Failed to execute 'setValueCurveAtTime'  on 'AudioParam': setValueCurveAtTime(..., 902.4012925170068, 0.1) overlaps setValueCurveAtTime(..., 902.3941950113378, 0.01)

export default class oscClass {
  constructor(
    Tone,
    type,
    calculatedFrequency,
    detune,
    envelope,
    connection,
    initialFreq,
    fmConnection
  ) {
    this.context = Tone.context
    this.initialFreq = initialFreq
    this.osc = new Tone.Oscillator().start()
    this.osc.detune.value = detune
    this.osc.type = type
    this.osc.frequency.value = calculatedFrequency
    this.gateGain = this.context.createGain()
    this.gateGain.gain.value = 0
    this.osc.connect(this.gateGain)
    Tone.connect(this.gateGain, connection)
    if (fmConnection) Tone.connect(fmConnection, this.osc.frequency)

    /*
    based on
    https://github.com/nextgtrgod/webaudio-synth/blob/master/src/modules/Oscillator.js
    */

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
    if (this.context) {
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
  }
  stop() {
    let { currentTime } = this.context

    /*
    based on
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
      now - 0.01,
      this.envelope.attack
    )
    this.gateGain.gain.setValueCurveAtTime(
      expCurve(1, 0),
      now + this.envelope.attack,
      this.envelope.decay
    )

    // exponentialRampToValueAtTime version
    // this.gateGain.gain.setValueAtTime(this.gateGain.gain.value, currentTime);
    // this.gateGain.gain.cancelScheduledValues(currentTime);
    // this.gateGain.gain.exponentialRampToValueAtTime(
    //   0.00001,
    //   currentTime + this.envelope.release + this.easing
    // );

    // linearRampToValueAtTime version
    // this.gateGain.gain.cancelScheduledValues(currentTime);
    // this.gateGain.gain.linearRampToValueAtTime(
    //   0,
    //   currentTime + this.envelope.release + this.easing
    // );

    // setTargetAtTime method (no longer used due to clicking):
    // this.gateGain.gain.setTargetAtTime(
    //   0,
    //   currentTime,
    //   this.envelope.release + this.easing
    // );

    setTimeout(() => {
      this.osc.stop()
      this.osc.dispose()
    }, 10000)
  }
}
