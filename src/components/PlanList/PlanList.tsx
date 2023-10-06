import * as React from 'react';
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
    oneDayPlanArr: OneDayPlan[] | undefined;
    withLinks?: boolean
};

const PlanList: React.FC<PlanListProps> = ({oneDayPlanArr, withLinks=true}) => {
    return (
        <div className={styles.plan__list}>
            {oneDayPlanArr?.map((recipe: OneDayPlan) =>
                <div className={styles['plan__list-text']}>
                    {withLinks 
                    ? <Link className={styles['plan__list-link']} key={recipe.id} to={`/recipe/${recipe.id}`}>
                        <p className={styles['plan__list-title-hover']}>{recipe.title}:</p>
                    </Link>
                    : <p className={styles['plan__list-title']}>{recipe.title}:</p>
                }
                    <Text view='p-20' color={'accent'} className='plan__list-info'>
                        Cooking time: {recipe.readyInMinutes}<br/>Number of servings: {recipe.servings}
                    </Text>
                </div>
            )}
        </div>
    )
}

export default PlanList;