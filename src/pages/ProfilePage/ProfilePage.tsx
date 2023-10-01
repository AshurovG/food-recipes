import * as React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import ProfileLogoIcon from 'components/icons/ProfileLogoIcon';
import styles from './ProfilePage.module.scss';
import { useLocalStore } from 'utils/useLocalStore';
import ProfileStore from 'Store/ProfileStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';


const ProfilePage: React.FC = () => {
    const profileStore = useLocalStore(() => new ProfileStore());

    return (
        <div className={styles.profile__page}>
            <Header></Header>
            <div className={styles['profile__page-wrapper']}>
                <h1 className={styles['profile__page-title']}>Your personal information is located here</h1>
                <div className={styles['profile__page-info']}>
                    <ProfileLogoIcon className={styles['profile__page-logo']}/>
                    <h2 className={styles['profile__page-item']}><strong>User name: </strong>{profileStore.usernameValue}</h2>
                    <h2 className={styles['profile__page-item']}><strong>Full name: </strong>{profileStore.fullnameValue}</h2>
                    <Link to={'/'}><Button onClick={profileStore.handleButtonClick} className={styles['profile__page-btn']}>Log out</Button></Link>
                </div>
            </div>    
        </div >
    )
};

export default observer(ProfilePage);