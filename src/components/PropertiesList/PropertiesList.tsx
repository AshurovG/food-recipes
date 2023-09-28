import * as React from 'react'
import styles from "./PropertiesList.module.scss"

export type PropertiesListProps = {
    nutrients: {
        calories: number;
        carbohydrates: number;
        fat: number;
        protein: number;
    }
};

const PropertiesList: React.FC<PropertiesListProps> = ({nutrients}) => {
    return (
        <ol className={styles['plan__nutrients-list']}>
            <li>Calories: <strong>{nutrients.calories}</strong></li>
            <li>Carbohydrates: <strong>{nutrients.carbohydrates}</strong></li>
            <li>Fat: <strong>{nutrients.fat}</strong></li>
            <li>Protein: <strong>{nutrients.protein}</strong></li>
        </ol>
    )
}

export default PropertiesList;