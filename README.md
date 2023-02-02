<div align="center"><h1>FM Synth</h1></div>

<div align="center"><h5>An FM synthesizer for the browser</h5></div>
<div align="center">
<a href="https://fmsynth.vercel.app/">live demo here</a>
</div>

<a href="https://fmsynth.vercel.app/">
<img src="./assets/images/preview.jpg" width="100%" >
</a>

<br/>

A frequency modulation synthesizer built with React, React-Spring, NextJs, ToneJs, and MongoDB. Users can play using the keys of their keyboard, change settings using their mouse, and save presets. Synthesizer state is stored in React Context to make editing, saving, and loading presets easy. NextAuth allows users to create accounts and sign in to retrieve their presets.

FM Synth generates four oscillators for every note played- three regular oscillators (one of them a sub oscillator) and one noise oscillator. Users can change the gain on each of these. Users can choose different waveforms of the regular oscillators and different colors for the noise oscillator. The two regular non-sub oscillators can also be detuned, creating a chorus effect. All the regular oscillators can be transposed by -2, -1, 0, 1, or 2 octaves.

Users can alter the attack, decay, sustain, and release of the oscillators. The Frequency modulation LFO's gain, frequency, and waveform can be changed. FM Synth's effects include an equilizer, distortion, vibrato, ping-pong delay, convolver reverb with 37 different impulses, an LFO filter, and a feedback comb filter. There are also hidden controls for transposing all oscillators and modifying the master volume and master BPM.

All of the effects have parameters which can be controlled by the user. Some of the range inputs are built to work logarithmically since this is often more suitable for some audio parameters.

<br/>

Check out the rest of my portfolio at <a href="https://thomasfoydel.com">
https://thomasfoydel.com
</a>

Check out my other project repositories at <a href="https://github.com/thomasfoydel">
https://github.com/thomasfoydel
</a>
