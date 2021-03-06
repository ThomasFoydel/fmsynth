import React from 'react';
import { CircleSlider } from 'react-circle-slider';
import './Slider.scss';

const Slider = ({
  min,
  max,
  step,
  value,
  property,
  onChange,
  disableToolTip,
}) => {
  return (
    <div className='circle-slider'>
      <CircleSlider
        onChange={(e) => onChange({ value: e, prop: property })}
        value={value}
        knobRadius={4}
        shadow={false}
        size={35}
        circleWidth={3}
        progressWidth={5}
        min={min}
        max={max}
        showTooltip={!disableToolTip}
        tooltipSize={12}
        tooltipColor={'#eee'}
        progressColor={'#222'}
        stepSize={step}
      />
    </div>
  );
};

export default Slider;
