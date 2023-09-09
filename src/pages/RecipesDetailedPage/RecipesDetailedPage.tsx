import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import cn from 'classnames';
import styles from './RecipesDetailedPage.module.scss';



const RecipesDetailedPage: React.FC = () => {
    const { id } = useParams();
    return (
        <div className={styles.detailed__page}>
            <div>{id} jkljkljkljklj;j</div>
        </div>
    )
};

export default RecipesDetailedPage;