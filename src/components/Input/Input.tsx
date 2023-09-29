import * as React from 'react';
import cn from 'classnames'
import styles from './Input.module.scss'

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
    disabled?: Boolean;
    className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, afterSlot, disabled, className, ...props }, ref) => {
    const changeHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
        },
        [onChange]
    )

    return (
        <label
            className={cn(
                styles['input-wrapper'],
                disabled && styles['input-wrapper_disabled'],
                className
            )}
        >
            <input
                value={value}
                onChange={changeHandler}
                className={styles.input}
                ref={ref}
                disabled={disabled}
                type="text"
                {...props}
            />
            {!!afterSlot && <div className={styles['input-after']}>{afterSlot}</div>}
        </label >
    )
});

export default Input;