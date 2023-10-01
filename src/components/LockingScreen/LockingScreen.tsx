import * as React from 'react';
import styles from './LockingScreen.module.scss';
import { Link } from 'react-router-dom';

export type LockingScreenProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to: string
};

const LockingScreen: React.FC<LockingScreenProps> = ({to}) => {
    return (
        <Link className={styles['locking__screen-link']} to={to}><div onClick={() => console.log(47387483)} className={styles.locking__screen}></div></Link>
    )
};

export default LockingScreen;