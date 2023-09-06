import React, { useState } from 'react';
import './Input.scss'

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    /** Значение поля */
    value?: string;
    /** Callback, вызываемый при вводе данных в поле */
    onChange: (value: string) => void;
    /** Слот для иконки справа */
    afterSlot?: React.ReactNode;
    disabled?: Boolean;
    className?: string;
    onclick?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, onClick, afterSlot, placeholder, disabled, className, ...rest }, ref) => {
    let newValue = value
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

    };

    let classes: string = 'input_container '
    if (className) {
        classes += className
    }

    return (
        <div onClick={onClick} className={classes}>
            <input ref={ref} data-testid="input" {...rest} disabled={disabled} className='input_area' type="text" placeholder={placeholder} onChange={handleInputChange} value={newValue} />
            {afterSlot && afterSlot}
        </div>
    );
});

export default Input;