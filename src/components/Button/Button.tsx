import React from 'react';
import cn from 'classnames';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import styles from './Button.module.scss'
// import styles from './Button.module.scss'


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    className,
    loading,
    children,
    ...props
}) => {

    return (
        <button
            {...props}
            className={cn(className, styles.button, props.disabled && styles.button_disabled)}
            disabled={props.disabled || loading}
        >
            {loading && <Loader className={styles.button__loader} size='s' />}
            <Text className={styles.button__text} tag='span' view='button'>
                {children}
            </Text>

        </button>
    )
};

export default Button;