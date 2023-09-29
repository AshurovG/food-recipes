import * as React from 'react';
import cn from 'classnames'
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import styles from './Slider.module.scss'

export type SliderProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    sliderValue: number;
    outputStyle: {left: string};
    minValue: number;
    maxValue: number;
    sliderRef: React.RefObject<HTMLInputElement>;
    outputRef: React.RefObject<HTMLOutputElement>;
};

const Slider: React.FC<SliderProps> = ({ minValue, sliderValue, outputStyle, maxValue, className, sliderRef, outputRef, onChange }) => {
    return (
      <div className={cn(styles.slider, className)}>
        <output htmlFor="fader" id="volume" style={toJS(outputStyle)} ref={outputRef}>
          {sliderValue}
        </output>
        <input
          className={styles.slider__item}
          type="range"
          id="fader"
          min={minValue}
          max={maxValue}
          value={sliderValue}
          onChange={onChange}
          step="1"
          ref={sliderRef}
        />
      </div>
    );
};

export default observer(Slider);