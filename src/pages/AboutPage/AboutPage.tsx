import * as React from 'react';
import Header from 'components/Header';
import styles from './AboutPage.module.scss';
import Text from 'components/Text';
import ListIcon from 'components/icons/ListIcon';

import { useLocalStore } from 'utils/useLocalStore';
import AuthFormStore from 'Store/AuthFormStore';
import { observer } from 'mobx-react-lite';

const AboutPage: React.FC = () => {
    return (
        <div className={styles.about}>
            <Header></Header>
            <div className={styles.about__wrapper}>
                <h1 className={styles.about__title}>About our application</h1>

                <div className={styles.about__cards}>
                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>You can see the recipes you are interested in</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>

                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>It is possible to find a recipe by a certain category or name</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>

                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>You can create a special meal plan for yourself for one day or for a week</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>

                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>You can save the recipe you like</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>

                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>For each recipe we have a lot of additional informatio</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>

                <div className={styles.about__card}>
                    <h3 className={styles.card__title}>You need to log in to use an additional function</h3>
                    <div className={styles.card__icon}><ListIcon></ListIcon></div>
                </div>
            </div>
            </div>

            
        </div>
    )
};

export default observer(AboutPage);