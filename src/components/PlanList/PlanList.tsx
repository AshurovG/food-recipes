import * as React from 'react'
import styles from "./PlanList.module.scss"
import { Link } from 'react-router-dom';
import Text from 'components/Text';

type OneDayPlan = {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
}

type PlanListProps = {
    oneDayPlanArr: OneDayPlan[];
};

const PlanList: React.FC<PlanListProps> = ({oneDayPlanArr}) => {
    return (
        <div className={styles.plan__list}>
            {oneDayPlanArr.map((recipe: OneDayPlan) =>
                // <Link className={styles['plan__list-link']} key={recipe.id} to={`/recipe/${recipe.id}`}>
                    <div className={styles['plan__list-text']}>
                        <p className={styles['plan__list-title']}>{recipe.title}:</p>
                        <Text view='p-20' color={'accent'} className='plan__list-info'>
                            Cooking time: {recipe.readyInMinutes}<br/>Number of servings: {recipe.servings}
                        </Text>
                    </div>
                // </Link>
            )}
        </div>
    )
}

export default PlanList;