import * as React from 'react'
import styles from "./MealPlanForm.module.scss"
import { Link } from 'react-router-dom'
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import MultiDropdown from 'components/MultiDropdown';
import CheckBox from 'components/CheckBox';
import { useLocalStore } from 'utils/useLocalStore';
import MealPlanFormStore from 'Store/MealPlanFormStore';

export type MealPlanFormProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string,
};


const MealPlanForm: React.FC<MealPlanFormProps> = ({className}) => {
    const mealPlanFormStore = useLocalStore(() => new MealPlanFormStore());
    return (
        <form className={cn(styles.plan__form, className)}>
            <div className={styles['plan__form-wrapper']}>
            <div className={styles.checkbox__block}>
                <Text tag='p' view='p-18'>Make a plan for only one day?</Text> 
                <CheckBox checked={mealPlanFormStore.checkboxValue} onChange={() => mealPlanFormStore.setCheckboxValue()}/>
            </div>

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
            </div>
            
        </form>
    )
}

export default observer(MealPlanForm);