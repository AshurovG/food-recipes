import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { Meta } from 'utils/meta';
import styles from './MealPlanPage.module.scss';
import Header from 'components/Header';
import Text from 'components/Text';
import Loader from 'components/Loader';
import MealPlanForm from 'components/MealPlanForm';


const MealPlanPage: React.FC = () => {
    
    return (
        <div className={styles.plan__page}>
            <Header />
            <div className={styles.plan__wrapper}>
                <Text className={styles.plan__title} view='title' color='primary' tag='h1'>You can choose a meal plan especially for yourself ! <br/>To do this, fill out the form:</Text>
                <MealPlanForm className={styles.plan__form}></MealPlanForm>
            </div>
        </div>
    )
};

export default observer(MealPlanPage);