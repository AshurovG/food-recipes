import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { Meta } from 'utils/meta';
import styles from './MealPlanPage.module.scss';
import Header from 'components/Header';
import Text from 'components/Text';
import Loader from 'components/Loader';
import cn from 'classnames';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import CheckBox from 'components/CheckBox';
import Slider from 'components/Slider';
import MealPlanFormStore from 'Store/MealPlanFormStore';


const MealPlanPage: React.FC = () => {
    const mealPlanFormStore = useLocalStore(() => new MealPlanFormStore());
    const outputRef = React.useRef<HTMLOutputElement>(null);
    const sliderRef = React.useRef<HTMLInputElement>(null);
    const minValue = 0;
    const maxValue = 10000;

    React.useEffect(() => {
        const outputElement = outputRef.current;
        const sliderElement = sliderRef.current;
    
        if (outputElement && sliderElement) {
          // Ширина ползунка
          const sliderWidth = sliderElement.getBoundingClientRect().width;
          // Ширина элемента output
          const outputWidth = outputElement.getBoundingClientRect().width;
          // Новая позиция для элемента output
          const newPosition = ((mealPlanFormStore.sliderValue - minValue) / (maxValue - minValue)) * (sliderWidth - outputWidth);
    
          const newOutputStyle = {
            left: newPosition - 20 + 'px'
          };
          mealPlanFormStore.setOutputStyle(newOutputStyle)
        }
    }, [mealPlanFormStore.sliderValue, minValue, maxValue]);

    const Sliderhandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValueString = event.target.value;
        const newValue = parseInt(newValueString, 10);
        mealPlanFormStore.setSliderValue(newValue)
    };
    
    return (
        <div className={styles.plan__page}>
            <Header />
            <div className={styles.plan__wrapper}>
                <Text className={styles.plan__title} view='title' color='primary' tag='h1'>You can choose a meal plan especially for yourself ! <br/>To do this, fill out the form:</Text>
                <form className={cn(styles.plan__form, styles.plan__form)}>
            <div className={styles['plan__form-wrapper']}>
            <div className={styles.checkbox__block}>
                <Text tag='p' view='p-18'>If you want to get a meal plan for only one day, click on</Text> 
                <CheckBox checked={mealPlanFormStore.checkboxValue} onChange={() => mealPlanFormStore.setCheckboxValue()}/>
            </div>

            <div className={styles.slider__block}>
                <Text tag='p' view='p-18'>How many calories would you like to consume per day?</Text> 
                <Slider onChange={Sliderhandler} className={styles.slider__item} minValue={0} maxValue={10000} sliderValue={mealPlanFormStore.sliderValue} outputStyle={mealPlanFormStore.outputStyle} sliderRef={sliderRef} outputRef={outputRef}/>
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

            <Button className={styles['plan__form-button']}>Choose</Button>
            
        </form>
            </div>
        </div>
    )
};

export default observer(MealPlanPage);