import React from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './range.css';

import Log from '../logarithmic/log';

// receiving props for minpos, maxpos, minval, maxval
export default class LogRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.logSlider = new Log({
      minpos: props.minpos || 0,
      maxpos: props.maxpos || 100,
      minval: props.minval || 5,
      maxval: props.maxval || 1600,
    });
    this.label = props.label;
    this.onChange = this.onChange.bind(this);
    this.formatLabel = this.formatLabel.bind(this);
  }

  calcPos(pos) {
    if (pos === 0) return 0;
    const val = this.logSlider.value(pos);
    if (val > 1000) return Math.round(val / 100) * 100;
    if (val > 500) return Math.round(val / 10) * 10;
    return Math.round(val);
  }

  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(this.calcPos(value));
    } else {
      console.log('pass an onChange method to <LogarithmicRange />');
    }
  }

  formatLabel(value) {
    return `${this.calcPos(value)}${this.label}`;
  }

  render() {
    return (
      <div>
        <RangeInput
          value={this.state.value}
          onChange={this.onChange}
          formatLabel={this.formatLabel}
        />
      </div>
    );
  }
}

const RangeInput = ({ value, onChange, formatLabel }) => (
  <InputRange
    step={1}
    formatLabel={formatLabel}
    maxValue={100}
    minValue={0}
    value={value}
    onChange={onChange}
  />
);
