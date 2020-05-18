import React from 'react';
import './Oscillators.scss';
import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);

  const changeOsc1 = (e) => {
    let { value, prop } = e;
    updateState({ type: 'CHANGE_OSC1', payload: { value, prop } });
  };

  const changeOsc1Gain = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_OSC1_GAIN', payload: value });
  };

  const changeOsc2 = (e) => {
    let { value, prop } = e;
    updateState({ type: 'CHANGE_OSC2', payload: { value, prop } });
  };

  const changeOsc2Gain = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_OSC2_GAIN', payload: value });
  };

  const changeSubOsc = (e) => {
    let { value, prop } = e;
    updateState({
      type: 'CHANGE_SUB_OSC',
      payload: { prop, value },
    });
  };

  const changeSubOscGain = (e) => {
    let { value } = e;
    value /= 100;
    updateState({
      type: 'CHANGE_SUB_OSC_GAIN',
      payload: { value, prop: 'gain' },
    });
  };

  const changeNoise = (e) => {
    updateState({ type: 'CHANGE_NOISE', payload: { prop: 'type', value: e } });
  };

  const changeNoiseGain = (e) => {
    let { value } = e;
    value /= 100;
    updateState({
      type: 'CHANGE_NOISE_GAIN',
      payload: { prop: 'gain', value },
    });
  };

  return (
    <div className='osc1-controller'>
      <div className='section-1'>
        <div className='osc'>
          <div className='center'>osc 1</div>
          <div className='osc-selector'>
            <Selector
              onChange={(e) => changeOsc1({ value: e.value, prop: 'type' })}
              value={appState.osc1Settings.type}
              size='small'
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />{' '}
          </div>
          <div className='osc-selector'>
            <Selector
              onChange={(e) =>
                changeOsc1({ value: e.value, prop: 'octaveOffset' })
              }
              value={appState.osc1Settings.octaveOffset}
              size='small'
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>
          <div className='sliders'>
            <div className='param'>
              <div className='prop-label'>detune</div>
              <div className='osc-slider'>
                <Slider
                  property='detune'
                  min={-30}
                  max={30}
                  onChange={changeOsc1}
                  value={appState.osc1Settings.detune}
                />
              </div>
            </div>
            <div className='param'>
              <div className='prop-label'>gain</div>
              <div className='osc-slider'>
                <Slider
                  property='gain'
                  max={100}
                  onChange={changeOsc1Gain}
                  value={appState.osc1Settings.gain * 100}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='osc'>
          <div className='center'>osc 2</div>
          <div className='osc-selector'>
            <Selector
              size='small'
              value={appState.osc2Settings.type}
              onChange={(e) => changeOsc2({ value: e.value, prop: 'type' })}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className='osc-selector'>
            <Selector
              onChange={(e) =>
                changeOsc1({ value: e.value, prop: 'octaveOffset' })
              }
              value={appState.osc2Settings.octaveOffset}
              size='small'
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>
          <div className='sliders'>
            <div className='param'>
              <div className='prop-label'>detune</div>
              <div className='osc-slider'>
                <Slider
                  property='detune'
                  min={-30}
                  max={30}
                  onChange={changeOsc2}
                  value={appState.osc2Settings.detune}
                />{' '}
              </div>
            </div>

            <div className='param'>
              <div className='prop-label'>gain</div>
              <div className='osc-slider'>
                <Slider
                  property='gain'
                  max={100}
                  onChange={changeOsc2Gain}
                  value={appState.osc2Settings.gain * 100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='section-2'>
        <div className='osc'>
          <div className='center'>sub osc</div>
          <div className='osc-selector'>
            <Selector
              size='small'
              // value={appState.subOscSettings.type}
              onChange={(e) => changeSubOsc({ value: e.value, prop: 'type' })}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className='osc-selector'>
            <Selector
              onChange={(e) =>
                changeSubOsc({ value: e.value, prop: 'octaveOffset' })
              }
              value={appState.subOscSettings.octaveOffset}
              size='small'
              options={[
                { text: '-2', value: -2 },
                { text: '-1', value: -1 },
                { text: '0', value: 0 },
                { text: '+1', value: 1 },
                { text: '+2', value: 2 },
              ]}
            />
          </div>

          <div className='param center'>
            <div className='prop-label'>gain</div>
            <div className='osc-slider'>
              <Slider
                property='gain'
                max={100}
                onChange={changeSubOscGain}
                value={appState.subOscSettings.gain * 100}
              />
            </div>
          </div>
        </div>

        <div className='osc'>
          <div className='center'>noise</div>
          <div className='osc-selector noise-selector'>
            <Selector
              size='small'
              value={appState.noiseSettings.type}
              onChange={(e) => changeNoise({ value: e.value, prop: 'type' })}
              options={[
                { text: 'white', value: 'white' },
                { text: 'pink', value: 'pink' },
                { text: 'brown', value: 'brown' },
              ]}
            />
          </div>

          <div className='param center'>
            <div className='prop-label'>gain</div>
            <div className='osc-slider'>
              <Slider
                property='gain'
                max={100}
                onChange={changeNoiseGain}
                // value={appState.noiseSettings.gain *100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oscillator1Controller;
