import React from 'react';
import cn from 'classnames';
import Header from 'components/Header';
import styles from './RecipesPage.module.scss';

const RecipesPage: React.FC = () => {
    return (
        <div className={styles.recipes__page}>
            <Header></Header>
        </div>
    )
};

export default RecipesPage;