import * as React from 'react';
import cn from 'classnames'
import styles from './ModalWindow.module.scss';
import SuccessIcon from 'components/icons/SuccessIcon';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    title: string
    to: string
};

const ModalWindow: React.FC<ModalProps> = ({
    className,
    title,
    children,
    to
}) => {
    return (
        <div className={cn(styles.modal, className)}>
            <div className={styles.modal__wrapper}>
                <div className={styles['modal__title-block']}>
                    <h2 className={styles.modal__title}>{title}</h2>
                    {children}
                </div>
                <Link to={to}><Button className={styles.modal__btn}>Close</Button></Link>         
            </div>
            
        </div>
    )
};

export default ModalWindow;