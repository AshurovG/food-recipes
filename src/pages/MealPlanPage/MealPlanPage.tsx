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
import MealPlanFormStore from 'Store/MealPlanStore';
import PropertiesList from 'components/PropertiesList';

export type OneDayPlan = {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    imageType: string;
};


const MealPlanPage: React.FC = () => {
    const mealPlanFormStore = useLocalStore(() => new MealPlanFormStore());
    const outputRef = React.useRef<HTMLOutputElement>(null);
    const sliderRef = React.useRef<HTMLInputElement>(null);
    const minValue = 500;
    const maxValue = 5000;

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

    const sliderhandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValueString = event.target.value;
        const newValue = parseInt(newValueString, 10);
        mealPlanFormStore.setSliderValue(newValue)
    };

    const buttonHandler = () => {
        mealPlanFormStore.getMealPlanData();
        mealPlanFormStore.setIsButtonClicked();
    }
    
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
                        <Slider onChange={sliderhandler} className={styles.slider__item} minValue={minValue} maxValue={maxValue} sliderValue={mealPlanFormStore.sliderValue} outputStyle={mealPlanFormStore.outputStyle} sliderRef={sliderRef} outputRef={outputRef}/>
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
                    <Button className={styles['plan__form-button']} onClick={buttonHandler}>Choose</Button>
                </form>
                {mealPlanFormStore.meta === Meta.loading
                ? <div className={styles.loader__wrapper}><Loader className={styles.loader} size='xl'></Loader></div>
                : mealPlanFormStore.isButtonClicked && <div className={styles.plan__info}>
                    <div className={styles['plan__list-block']}>
                        <h2 className={styles['plan__list-block-title']}>One day meal plan:</h2>
                        <div className={styles.plan__list}>
                            {mealPlanFormStore.dayPlanList?.map((recipe: OneDayPlan) =>
                                <Link className={styles['plan__list-link']} key={recipe.id} to={`/recipe/${recipe.id}`}>
                                    <div className={styles['plan__list-text']}>
                                        <p className={styles['plan__list-title']}>{recipe.title}:</p>
                                        <Text view='p-20' color={'accent'} className='plan__list-info'>
                                            Cooking time: {recipe.readyInMinutes}<br/>Number of servings: {recipe.servings}
                                        </Text>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                    
                    <div className={styles.plan__nutrients}>
                        <h2 className={styles['plan__list-block-title']}>list of nutrients</h2>
                        <PropertiesList nutrients={mealPlanFormStore.dayNutrients}/>
                    </div>
                </div>}
                
            </div>
        </div>
    )
};

export default observer(MealPlanPage);