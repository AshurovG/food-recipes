import * as React from 'react';
import styles from './CheckBox.module.scss'

export type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string
    checked: boolean
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, className, ...rest }) => {
    const handler = (): void => {
        onChange(!checked)
    }
    return (
        <label className={disabled === false || disabled === undefined ? className + ` ${styles['custom-checkbox_enable']}` : className + ` ${styles['custom-checkbox_disable']}`}>
            <input className={styles.checkbox} disabled={disabled} checked={checked} type='checkbox' data-testid="checkbox" onClick={handler} {...rest} />
            {(checked) && < svg className={styles.fake} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="vector" d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke={disabled ? '#00000033' : '#B5460F'} stroke-width="3.33333" />
            </svg>}
        </label>
    )
};

export default CheckBox;