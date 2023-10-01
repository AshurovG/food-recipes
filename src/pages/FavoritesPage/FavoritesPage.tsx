import * as React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import styles from './FavoritesPage.module.scss';
import Text from 'components/Text';

import { observer } from 'mobx-react-lite';

const FavoritesPage: React.FC = () => {
    return (
        <div className={styles.favorites}>
            <Header/>
            <div className={styles.favorites__wrapper}>
                <div className={styles['favorites__title-block']}></div>
                <h1 className={styles.favorites__title}>List of favorite recipes</h1>
                <h3 className={styles.favorites__subtitle}>You can add your favorite recipes from the general recipe list here!</h3>
            </div>
        </div >
    )
};

export default observer(FavoritesPage);