import * as React from 'react'
import styles from "./MealPlanForm.module.scss"
import { Link } from 'react-router-dom'
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import { useLocalStore } from 'utils/useLocalStore';
import MealPlanFormStore from 'Store/MealPlanFormStore';

export type MealPlanFormProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string,
};


const MealPlanForm: React.FC<MealPlanFormProps> = ({className}) => {
    const mealPlanFormStore = useLocalStore(() => new MealPlanFormStore());
    return (
        <form className={cn(styles.plan__form, className)}>
            <MultiDropdown
                className={styles.selection__block}
                options={mealPlanFormStore.dietsOptions}
                value={mealPlanFormStore.dietsValue}
                onChange={mealPlanFormStore.handleDietsChange}
                getTitle={mealPlanFormStore.getDietsTitle}/>

            <MultiDropdown
                className={styles.selection__block}
                options={mealPlanFormStore.excludedIngredientsOptions}
                value={mealPlanFormStore.excludedIngredientsValue}
                onChange={mealPlanFormStore.handleExcludedIngredientsChange}
                getTitle={mealPlanFormStore.getExcludedIngredientsitle}/>
        </form>
    )
}

export default observer(MealPlanForm);