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
};

const Button: React.FC<ButtonProps> = ({
    className,
    loading,
    children = null,
    ...props
}) => {

    return (
        <button
            {...props}
            className={cn(className, 'button', props.disabled && 'button_disabled')}
            disabled={props.disabled || loading}
        >
            {loading && <Loader className='button__loader' size='s' />}
            <Text className='button__text' tag='span' view='button'>
                {children}
            </Text>

        </button>
    )
};

export default Button;