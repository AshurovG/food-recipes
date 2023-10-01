import * as React from 'react';
import styles from './LockingScreen.module.scss';
import { Link } from 'react-router-dom';

export type LockingScreenProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to: string,
    onClick?: () => void;
};

const LockingScreen: React.FC<LockingScreenProps> = ({to, onClick}) => {
    return (
        <Link onClick={onClick} className={styles['locking__screen-link']} to={to}><div className={styles.locking__screen}></div></Link>
    )
};

export default LockingScreen;