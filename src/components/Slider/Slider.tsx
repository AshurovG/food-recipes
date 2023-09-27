import React, { useRef, useState } from 'react';
import styles from './Slider.module.scss'
import cn from 'classnames'

export type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    // onChange: (checked: boolean) => void;
    className?: string;
    minValue: number;
    maxValue: number;
    value: number;
};

const Slider: React.FC<CheckBoxProps> = ({ minValue, maxValue, value, className }) => {
    const [sliderValue, setSliderValue] = useState(value);
    const [outputStyle, setOutputStyle] = useState({});
    const outputRef = useRef<HTMLOutputElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
  
    React.useEffect(() => {
      const outputElement = outputRef.current;
      const sliderElement = sliderRef.current;
  
      if (outputElement && sliderElement) {
        // Ширина ползунка
        const sliderWidth = sliderElement.getBoundingClientRect().width;
        // Ширина элемента output
        const outputWidth = outputElement.getBoundingClientRect().width;
        // Новая позиция для элемента output
        const newPosition = ((sliderValue - minValue) / (maxValue - minValue)) * (sliderWidth - outputWidth);
  
        const newOutputStyle = {
          left: newPosition - 20 + 'px'
        };
  
        setOutputStyle(newOutputStyle);
      }
    }, [sliderValue, minValue, maxValue]);
  
    const handler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newValueString = event.target.value;
      const newValue = parseInt(newValueString, 10);
      setSliderValue(newValue);
    };
  
    return (
      <div className={cn(styles.slider, className)}>
        <output htmlFor="fader" id="volume" style={outputStyle} ref={outputRef}>
          {sliderValue}
        </output>
        <input
          className={styles.slider__item}
          type="range"
          id="fader"
          min={minValue}
          max={maxValue}
          value={sliderValue}
          onChange={handler}
          step="1"
          ref={sliderRef}
        />
      </div>
    );
  };

export default Slider;