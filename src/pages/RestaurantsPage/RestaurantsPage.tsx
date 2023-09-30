import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { Meta } from 'utils/meta';
import styles from './RestaurantsPage.module.scss';
import Header from 'components/Header';
import Text from 'components/Text';
import Loader from 'components/Loader';

const RestaurantsPage: React.FC = () => {

    return (
        <div className={styles.restaurants__page}>
            <Header />
            <div className={styles.restaurants__wrapper}>
                
            </div>

        </div>
    )
};

export default observer(RestaurantsPage);