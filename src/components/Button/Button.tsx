import React from 'react';
import cn from 'classnames';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import './Button.scss'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Состояние загрузки */
    loading?: boolean;
    /** Текст кнопки */
    children: React.ReactNode;
    state?: boolean
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, state, loading, ...rest }) => {

    const classes = cn(
        'btn',
        className,
        {
            loading: loading,
            disableStatus: disabled
        }
    )
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (loading || disabled) {
            event.preventDefault();
            return;
        }
        if (onClick) {
            onClick(event);
        }
    };
    return (
        <button data-testid="button" className={classes} disabled={loading || disabled} onClick={handleClick} {...rest}>
            {loading ? <Loader className='button-loader' size="s" /> : <></>}
            <Text className='button-text'>{children}</Text>
        </button>
    )
};

export default Button;