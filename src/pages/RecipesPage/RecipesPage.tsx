import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './RecipesPage.module.scss';
import Header from 'components/Header';
import MainImage from 'components/MainImage';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import Button from 'components/Button';
import Loader from 'components/Loader';
import RecipesList from 'components/RecipesList';
import { useLocalStore } from 'utils/useLocalStore.ts';
import RecipesStore from '../../Store/RecipesStore'
import QueryParamsStore from '../../Store/RootStore/QueryParamsStore';
import { useQueryParamsStoreInit } from '../../Store/RootStore/hooks/useQueryParamsStoreInit';

export type IngredientData = {
    name: string,
}

export type NutrientsData = {
    amount: number,
}

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    caloricContent?: string;
    ingredients: string
}

export type ReceivedRecipeData = {
    id: number;
    title: string;
    image: string;
    readyInMinutes: string;
    nutrition: {
        nutrients: NutrientsData[];
        ingredients: IngredientData[];
    };
}

type Option = {
    key: string;
    value: string;
};

type DropdownCounts = {
    [key: string]: number
}

const RecipesPage: React.FC = () => {
    useQueryParamsStoreInit();
    const recipesStore = useLocalStore(() => new RecipesStore());
    const [dropdownValue, setDropdownValue] = useState<Option[]>([]);

    React.useEffect(() => {
        recipesStore.getRecipesData();
    }, [recipesStore.offset, recipesStore.isOnSearchClick])

    const navigate = useNavigate();
    const handleFormSubmit = () => {
        navigate(`?search=${recipesStore.inputValue}`);
        recipesStore.setIsOnSearchClick();
    };

    const options = [
        { key: '1', value: 'Категория 1' },
        { key: '2', value: 'Категория 2' },
        { key: '3', value: 'Категория 3' }
    ];

    const handleChange = React.useCallback((options: Option[]) => {
        const counts: DropdownCounts = {};
        options.forEach(option => {
            counts[option.value] = (counts[option.value] || 0) + 1;
        });

        const filteredOptions = options.filter(option => counts[option.value] === 1);

        setDropdownValue(filteredOptions);
    }, []);

    const getTitle = React.useCallback(
        (options: Option[]) => {
            return options.map((option) => option.value).join(', ') || 'Filter';
        },
        [],
    );

    return (
        <div className={styles.recipes__page}>
            <Header></Header>
            <MainImage />
            <div className={styles['recipes__page-wrapper']}>
                <Text className={styles.search__title} view='p-20'>
                    Find the perfect food and <span style={{ textDecorationLine: 'underline' }}>drink ideas</span> for every occasion, from <span style={{ textDecorationLine: 'underline' }}>weeknight dinners</span> to <span style={{ textDecorationLine: 'underline' }}>holiday feasts</span>.
                </Text>
                <div className={styles['search__info-block']}>
                    <div className={styles['search__input-block']}>
                        <Input value={recipesStore.inputValue} onChange={recipesStore.setInputValue}></Input> <Button onClick={handleFormSubmit}><SearchIcon /></Button>
                    </div>

                    <MultiDropdown
                        className={styles.selection__block}
                        options={options}
                        value={dropdownValue}
                        onChange={handleChange}
                        getTitle={getTitle}
                    />
                </div>

                {recipesStore.isFirstCards
                    ? <div><RecipesList cards={recipesStore.list} />
                        {recipesStore.offset === 0 && <div className={styles.loader__wrapper}>
                            <Loader className={styles.loader} size='xl' />
                        </div>}
                    </div>
                    : <InfiniteScroll
                        className={styles.infinite__scroll}
                        dataLength={recipesStore.list.length}
                        next={recipesStore._loadMore}
                        hasMore={recipesStore.hasMore}
                        loader={
                            <div className={styles.loader__wrapper}>
                                <Loader className={styles.loader} size='xl' />
                            </div>
                        }
                        endMessage={<Text view='p-20' weight='medium' className={styles['end__list-message']}>There are no more recipes.</Text>}
                    >
                        <RecipesList cards={recipesStore.list} />
                    </InfiniteScroll>}
            </div>
        </div>
    )
};

export default observer(RecipesPage);