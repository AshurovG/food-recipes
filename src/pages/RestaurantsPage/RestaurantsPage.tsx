import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { useQueryParamsStoreInit } from 'Store/RootStore/hooks/useQueryParamsStoreInit';
import { Meta } from 'utils/meta';
import styles from './RestaurantsPage.module.scss';
import Header from 'components/Header';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import MultiDropdown from 'components/MultiDropdown';
import Input from 'components/Input';
import Slider from 'components/Slider';
import RestaurantsStore from 'Store/RestaurantsStore'

const RestaurantsPage: React.FC = () => {
    const restaurantsStore = useLocalStore(() => new RestaurantsStore());

    const handleFormSubmit = () => {
        // if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) === 'Choose a category' && recipesStore.inputValue === '') {
        //     navigate('');
        //     console.log(111)
        // } else if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) === 'Choose a category' && recipesStore.inputValue) {
        //     console.log(222)
        //     navigate(`?search=${recipesStore.inputValue}`)
        // } else if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) !== 'Choose a category' && recipesStore.inputValue == ''){
        //     navigate(`?type=${recipesStore.getDropdownTitle(recipesStore.dropdownValue)}`)
        //     console.log(333)
        // } else {
        //     navigate(`?search=${recipesStore.inputValue}&type=${recipesStore.getDropdownTitle(recipesStore.dropdownValue)}`);
        //     console.log(444)
        // }
        restaurantsStore.setIsOnSearchClick();
    };

    const outputRef = React.useRef<HTMLOutputElement>(null);
    const sliderRef = React.useRef<HTMLInputElement>(null);
    const minValue = 0;
    const maxValue = 5;

    React.useEffect(() => {
        const outputElement = outputRef.current;
        const sliderElement = sliderRef.current;
    
        if (outputElement && sliderElement) {
          // Ширина ползунка
          const sliderWidth = sliderElement.getBoundingClientRect().width;
          // Ширина элемента output
          const outputWidth = outputElement.getBoundingClientRect().width;
          // Новая позиция для элемента output
          const newPosition = ((restaurantsStore.sliderValue - minValue) / (maxValue - minValue)) * (sliderWidth - outputWidth);
    
          const newOutputStyle = {
            left: newPosition - 20 + 'px'
          };
          restaurantsStore.setOutputStyle(newOutputStyle)
        }
    }, [restaurantsStore.sliderValue, minValue, maxValue]);

    const sliderhandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValueString = event.target.value;
        const newValue = parseFloat(newValueString);
        restaurantsStore.setSliderValue(newValue)
    };

    return (
        <div className={styles.restaurants__page}>
            <Header />
            <div className={styles.restaurants__wrapper}>
                <div className={styles.restaurants__search}>
                    <Input value={restaurantsStore.inputValue} onChange={restaurantsStore.setInputValue}/>
                
                    
                    <MultiDropdown
                                className={styles.selection__block}
                                options={restaurantsStore.options}
                                value={restaurantsStore.dropdownValue}
                                onChange={restaurantsStore.handleDropdownChange}
                                getTitle={restaurantsStore.getDropdownTitle}/>
                    
                    <div className={styles.slider__block}>
                        <p className={styles.plan__subtitle}>Choose minimum rating</p> 
                        <Slider step={0.1} onChange={sliderhandler} className={styles.slider__item} minValue={minValue} maxValue={maxValue} sliderValue={restaurantsStore.sliderValue} outputStyle={restaurantsStore.outputStyle} sliderRef={sliderRef} outputRef={outputRef}/>
                    </div>
                    <Button className={styles.search__btn} onClick={handleFormSubmit}><SearchIcon /></Button>
                </div>
            </div>
        </div>
    )
};

export default observer(RestaurantsPage);