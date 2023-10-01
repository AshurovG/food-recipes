import * as React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import styles from './AuthForm.module.scss';
import Text from 'components/Text';

import { observer } from 'mobx-react-lite';

const AuthForm: React.FC = () => {
    return (
        <div className={styles.form__wrapper}>
            <Header/>
        </div >
    )
};

export default observer(AuthForm);