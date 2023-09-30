import * as React from 'react';
import cn from 'classnames';
import Text from '../../components/Text/Text';
import Header from 'components/Header';
import Button from 'components/Button';
import styles from './AuthForm.module.scss';
import Input from 'components/Input';
import { useLocalStore } from 'utils/useLocalStore';
import AuthFormStore from 'Store/AuthFormStore';
import { observer } from 'mobx-react-lite';

const AuthForm: React.FC = () => {
    const authFormStore = useLocalStore(() => new AuthFormStore());

    return (
        <div className={styles.form__wrapper}>
            <Header></Header>
            <form className={styles.login__form} action="">
                {!authFormStore.isLoginForm && <h2 className={styles.form__title}>Registration</h2>}
                {authFormStore.isLoginForm && <h2 className={styles.form__title}>Login</h2>}
                <div className={styles['login__form-wrapper']}>
                    <Input value={authFormStore.usernameValue} onChange={authFormStore.setUsernameValue} placeholder='Enter E-mail*'/>
                    {!authFormStore.isLoginForm && <Input type='email' value={authFormStore.fullnameValue} onChange={authFormStore.setFullnameValue} placeholder='Enter fullname*'/>}
                    <Input type='password' value={authFormStore.passwordValue} onChange={authFormStore.setPasswordValue} placeholder='Enter password*'/>
                    <Button className={styles['login__form-btn']}>Login</Button>
                    {!authFormStore.isLoginForm && <div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>Do you already have an account?</div>}
                    {authFormStore.isLoginForm &&<div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>Don 't you have an account yet?</div>}
                </div>
            </form>
        </div >
    )
};

export default observer(AuthForm);