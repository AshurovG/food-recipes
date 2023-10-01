import * as React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import styles from './AuthForm.module.scss';
import Input from 'components/Input';
import Text from 'components/Text';
import ModalWindow from 'components/ModalWindow';
import SuccessIcon from 'components/icons/SuccessIcon';
import LockingScreen from 'components/LockingScreen';

import { useLocalStore } from 'utils/useLocalStore';
import AuthFormStore from 'Store/AuthFormStore';
import { observer } from 'mobx-react-lite';

const AuthForm: React.FC = () => {
    const authFormStore = useLocalStore(() => new AuthFormStore());

    React.useEffect(() => {
            return () => {
                authFormStore.reset();
            };
    }, [])

    return (
        <div className={styles.form__wrapper}>
            <Header></Header>
            <form className={styles.login__form} action="">
                {!authFormStore.isLoginForm 
                ? <h2 className={styles.form__title}>Registration</h2>
                : <h2 className={styles.form__title}>Login</h2>
                }
                <div className={styles['login__form-wrapper']}>
                    <Input type='text' value={authFormStore.usernameValue} onChange={authFormStore.setUsernameValue} placeholder='Enter username*'/>
                    {!authFormStore.isLoginForm && <Input type='text' value={authFormStore.fullnameValue} onChange={authFormStore.setFullnameValue} placeholder='Enter fullname*'/>}
                    <Input type='password' value={authFormStore.passwordValue} onChange={authFormStore.setPasswordValue} placeholder='Enter password*'/>
                    
                    {!authFormStore.isLoginForm 
                    ? <Button onClick={authFormStore.handleRegisterButtonClick} className={styles['login__form-btn']}>Register</Button>
                    : <Button onClick={(authFormStore.handleLoginButtonClick)} className={styles['login__form-btn']}>Login</Button>
                    }
                    
                    {!authFormStore.isLoginForm 
                    ? <div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>Do you already have an account?</div>
                    : <div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>Don 't you have an account yet?</div>
                    }
                </div>
                {authFormStore.isExistError && !authFormStore.isLoginForm && !authFormStore.isModalWindow &&<Text tag='p' view='p-16' color='error'>A user with this username already exists!</Text>}
                {authFormStore.isIncorrectError && authFormStore.isLoginForm && !authFormStore.isModalWindow &&<Text tag='p' view='p-16' color='error'>Invalid username or password!</Text>}
            </form>
            {authFormStore.isModalWindow 
            && !authFormStore.isLoginForm &&<ModalWindow to='/' title='You have successfully registered!' className={styles.form__modal}><SuccessIcon></SuccessIcon></ModalWindow>}
            {authFormStore.isModalWindow && <LockingScreen to='/'></LockingScreen>}

            {authFormStore.isModalWindow 
            && authFormStore.isLoginForm &&<ModalWindow to='/' title='You have successfully logged in!' className={styles.form__modal}><SuccessIcon></SuccessIcon></ModalWindow>}
            {authFormStore.isModalWindow && authFormStore.isLoginForm && <LockingScreen to='/'></LockingScreen>}
        </div >
    )
};

export default observer(AuthForm);