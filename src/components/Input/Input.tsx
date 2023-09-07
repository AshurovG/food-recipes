import React from 'react';
import cn from 'classnames'
import './Input.scss'

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    /** Значение поля */
    value?: string;
    placeholder?: string;
    /** Callback, вызываемый при вводе данных в поле */
    onChange: (value: string) => void;
    /** Слот для иконки справа */
    afterSlot?: React.ReactNode;
    disabled?: Boolean;
    className?: string;
    onclick?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, onClick, afterSlot, placeholder, disabled, className, ...props }, ref) => {
    const changeHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
        },
        [onChange]
    )

    return (
        <label
            className={cn(
                'input-wrapper',
                disabled && 'input-wrapper_disabled',
                className
            )}
        >
            <input
                value={value && value}
                placeholder={placeholder && placeholder}
                onChange={changeHandler}
                className="input"
                ref={ref}
                disabled={disabled}
                type="text"
                {...props}
            />
            {!!afterSlot && <div className='input-after'>{afterSlot}</div>}
        </label>
    )
});

export default Input;