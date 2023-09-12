import React, { useState } from 'react';
import axios from 'axios';
import { apiKey } from '../../../consts.config.ts';
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

const RecipesPage: React.FC = () => {
    const [recipesArr, setRecipesArr] = useState<RecipeData[]>([])
    const [value, setValue] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');
    // const [filterArr, setFilterArr] = useState<RecipeData[]>([])
    // const [isfilterArrEmpty, setIsfilterArrEmpty] = useState<Boolean>(false)
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFirstCards, setIsFirstCards] = useState<Boolean>(true)
    const [isFirstCardsLoading, setIsFirstCardsLoading] = useState<Boolean>(true)


    React.useEffect(() => {
        if (isFirstCards) {
            setIsFirstCardsLoading(true)
        }
        const getAllCards = async (): Promise<void> => {
            if (recipesArr.length >= 24) {
                setHasMore(false)
                return
            }
            const result = await axios({
                method: 'get',
                url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&offset=${offset}&number=6`
            });

            const newRecipesArr = result.data.results.map((raw: ReceivedRecipeData) => ({
                id: raw.id,
                image: raw.image,
                title: raw.title,
                readyInMinutes: raw.readyInMinutes,
                ingredients: getIngredientsString(raw.nutrition.ingredients),
                caloricContent: raw.nutrition.nutrients[0].amount
            }))
            setRecipesArr([...recipesArr, ...newRecipesArr]);
            if (isFirstCards) {
                setIsFirstCardsLoading(true)
                setIsFirstCards(false)
            }

        }
        getAllCards()

    }, [offset])

    const loadMore = () => {
        setOffset(prevOffset => prevOffset + 6);
    };

    // Код для поиска
    // const onSearchButtonClick = (): void => {
    //     const newArr = searchTitle(inputValue)
    //     if (newArr.length === 0) {
    //         setIsfilterArrEmpty(true)
    //     } else {
    //         setIsfilterArrEmpty(false)
    //     }
    //     setFilterArr(newArr)
    // }

    const getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name
        })

        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    }

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
                        <Input value={inputValue} onChange={setInputValue}></Input> <Button onClick={() => 'onSearchButtonClick'}><SearchIcon /></Button>
                    </div>
                    {/* {isfilterArrEmpty && <Text className={styles['filter__error-title']} tag='h4' view='p-20' weight='medium'>No such dish was found !</Text>} */}

                    <MultiDropdown
                        className={styles.selection__block}
                        options={[
                            { key: '1', value: 'Категория 1' },
                            { key: '2', value: 'Категория 2' },
                            { key: '3', value: 'Категория 3' }
                        ]}
                        value={value}
                        onChange={setValue}
                        getTitle={(values: Option[]) => values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ')}
                    />
                </div>

                {isFirstCards
                    ? <div><RecipesList cards={recipesArr} />
                        {isFirstCardsLoading && <div className={styles.loader__wrapper}>
                            <Loader className={styles.loader} size='xl' />
                        </div>}
                    </div>
                    : <InfiniteScroll
                        className={styles.infinite__scroll}
                        dataLength={recipesArr.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={
                            <div className={styles.loader__wrapper}>
                                <Loader className={styles.loader} size='xl' />
                            </div>
                        }
                        endMessage={<Text view='p-20' weight='medium' className={styles['end__list-message']}>There are no more recipes.</Text>}
                    >
                        <RecipesList cards={recipesArr} />
                    </InfiniteScroll>}
            </div>
        </div>
    )
};

export default RecipesPage;