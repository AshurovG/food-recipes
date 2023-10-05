import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
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
import PlanList from 'components/PlanList';
import { useQueryParamsStoreInit } from 'Store/RootStore/hooks/useQueryParamsStoreInit';
import image from 'images/mealplan.png'

export type OneDayPlan = {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
};


const MealPlanPage: React.FC = () => {
    useQueryParamsStoreInit();
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

    const navigate = useNavigate();

    const sliderhandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValueString = event.target.value;
        const newValue = parseInt(newValueString, 10);
        mealPlanFormStore.setSliderValue(newValue)
    };

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let resQuery = '?time_frame='
        if (mealPlanFormStore.checkboxValue === true) {
            resQuery += 'day'
        } else {
            resQuery += 'week'
        }

        resQuery += `&calories=${mealPlanFormStore.sliderValue}`

        if (mealPlanFormStore.getDietsTitle(mealPlanFormStore.dietsValue) !== 'Choose a diet if you have') {
            resQuery += `&diet=${mealPlanFormStore.getDietsTitle(mealPlanFormStore.dietsValue)}`
        }

        if (mealPlanFormStore.getExcludedIngredientsitle(mealPlanFormStore.excludedIngredientsValue) !== 'Which ingredients should be excluded?') {
            resQuery += `&exclude=${mealPlanFormStore.getExcludedIngredientsitle(mealPlanFormStore.excludedIngredientsValue)}`
        }

        navigate(resQuery)
        
        mealPlanFormStore.getMealPlanData();
        mealPlanFormStore.setIsButtonClicked(true);
    }
    
    return (
        <div className={styles.plan__page}>
            <Header />
            <div className={styles.plan__wrapper}>
                <h1 className={styles.plan__title}>You can choose a meal plan especially for yourself ! <br/>To do this, fill out the form:</h1>
                <div className={styles['main__info']}>
                    <form className={cn(styles.plan__form, styles.plan__form)}>
                        <div className={styles['plan__form-wrapper']}>

                        <div className={styles.slider__block}>
                            <p className={styles.plan__subtitle}>How many calories would you like to consume per day?</p> 
                            <Slider step={1} onChange={sliderhandler} className={styles.slider__item} minValue={minValue} maxValue={maxValue} sliderValue={mealPlanFormStore.sliderValue} outputStyle={mealPlanFormStore.outputStyle} sliderRef={sliderRef} outputRef={outputRef}/>
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

                        <div className={styles.checkbox__block}>
                            <p className={styles.plan__subtitle}>If you want to get a meal plan for only one day, click on</p> 
                            <CheckBox checked={mealPlanFormStore.checkboxValue} onChange={() => mealPlanFormStore.setCheckboxValue()}/>
                        </div>
                        </div>
                        <Button className={styles['plan__form-button']} onClick={buttonHandler}>Choose</Button>
                    </form>
                    <div className={styles['main__info-img-wrapper']}>
                        <img className={styles['main__info-img']} src={image} alt="dish image" />
                    </div>
                </div>
                {mealPlanFormStore.meta === Meta.loading
                ? <div className={styles.loader__wrapper}><Loader className={styles.loader} size='xl'></Loader></div>
                : mealPlanFormStore.isButtonClicked && mealPlanFormStore.isOneDayPlan === true && mealPlanFormStore.meta === Meta.success
                ? <div className={styles.plan__info}>
                    <div className={styles['plan__list-block']}>
                        <h2 className={styles['plan__list-block-title']}>Your one-day meal plan:</h2>
                        <PlanList oneDayPlanArr={mealPlanFormStore.dayPlanList}></PlanList>
                    </div>
                    
                    <div className={styles.plan__nutrients}>
                        <h2 className={styles['plan__list-block-title']}>list of nutrients</h2>
                        <PropertiesList nutrients={mealPlanFormStore.dayNutrients}/>
                    </div>
                </div>
                : mealPlanFormStore.isButtonClicked 
                && <div>
                    <div className={styles['plan__list-block-title-block']}>
                                <h2 className={styles['plan__list-block-title']}>Your meal plan for the week:</h2>
                                <div className={styles['plan__nutrients-btns']}>
                                    <Button onClick={() => mealPlanFormStore.onPreviousButtonClick()} className={styles['plan__nutrients-btn']}>Previous</Button>
                                    <Button onClick={() => mealPlanFormStore.onNextButtonClick()} className={styles['plan__nutrients-btn']}>Next</Button>
                                </div>
                            </div>
                    <div className={styles.plan__info}>
                        <div className={styles['plan__list-block']}>
                            
                            
                            <p className={styles['plan__list-block-title']}>{mealPlanFormStore.currentDay.toUpperCase()}</p>
                            <PlanList oneDayPlanArr={mealPlanFormStore.oneOfWeekPlanList}></PlanList>
                        </div>
                        
                        <div className={styles.plan__nutrients}>
                            
                            <h2 className={styles['plan__list-block-title']}>List of nutrients</h2>
                            <PropertiesList nutrients={mealPlanFormStore.oneOfWeekPlanNutrients}/>
                        </div>
                    </div>
                </div>}
                
                
            </div>
        </div>
    )
};

export default observer(MealPlanPage);