import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { Meta } from 'utils/meta';
import styles from './MealPlanPage.module.scss';
import Header from 'components/Header';
import Text from 'components/Text';
import Loader from 'components/Loader';

const MealPlanPage: React.FC = () => {
    return (
        <div className={styles.plan__page}>
            <Header />
            <div className={styles.plan__wrapper}>
                странца индивидуального плана!!!
            </div>
        </div>
    )
};

export default observer(MealPlanPage);