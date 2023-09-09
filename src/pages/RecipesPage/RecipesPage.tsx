import React, { useState } from 'react';
import cn from 'classnames';
import styles from './RecipesPage.module.scss';
import Header from 'components/Header';
import MainImage from 'components/MainImage';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import Card from 'components/Card';
import Button from 'components/Button';
import axios from 'axios';

export type nutrientsOfIngredientData = {
    amount: number,
    name: string,
    percentOfDailyNeeds: number,
    unit: string
}

export type ingredientData = {
    amount: number,
    id: number,
    name: string,
    nutrients: Array<nutrientsOfIngredientData>,
    unit: string
}

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    healthScore?: string;
    nutrition: any,
    ingredients: string
}

// export type testData = {
//     id: number;
//     image: string;
//     title: string;
//     readyInMinutes?: string;
//     healthScore?: string;
//     ingredients: string
// }

type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};

const RecipesPage: React.FC = () => {
    const [recipesArr, setRecipesArr] = useState<RecipeData[]>([])
    // const [recipesArr, setRecipesArr] = useState<testData[]>([])
    const [value, setValue] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');
    // const [filterArr, setFilterArr] = useState<testData[]>([])
    const [filterArr, setFilterArr] = useState<RecipeData[]>([])
    const [isfilterArrEmpty, setIsfilterArrEmpty] = useState<Boolean>(false)
    //2f57ba40700b492a98d46c16cb731636
    //96b03ded692d45b391ec26a66cf00564
    //3a40e1bfe3084f53b0d475f56d06468b
    const apiKey = '3a40e1bfe3084f53b0d475f56d06468b';

    React.useEffect(() => { // Получаем данные о всех рецептах из API
        const getAllCards = async (): Promise<void> => {
            const result = await axios({
                method: 'get',
                url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true`
            });
            setRecipesArr(result.data.results.map((raw: RecipeData) => ({
                id: raw.id,
                image: raw.image,
                title: raw.title,
                readyInMinutes: raw.readyInMinutes,
                ingredients: getIngredientsString(raw.nutrition.ingredients), // Преобразовываем массив ингредиентов в строку с разделителями
                healthScore: raw.healthScore
            })))
            setFilterArr(result.data.results.map((raw: RecipeData) => ({
                id: raw.id,
                image: raw.image,
                title: raw.title,
                readyInMinutes: raw.readyInMinutes,
                ingredients: getIngredientsString(raw.nutrition.ingredients), // Преобразовываем массив ингредиентов в строку с разделителями
                healthScore: raw.healthScore
            })))
        }
        getAllCards()

    }, [])


    // React.useEffect(() => { // Тест данных без API
    //     const getAllCards = (): void => {
    //         let count: number = 0
    //         const titles: Array<string> = ['meet', 'lemon', 'apple', 'green bins', 'egg', 'chicken', 'potato', 'srawberry', 'rasberry', 'ing']
    //         let newArr: Array<testData> = []
    //         while (count < 10) {
    //             let newItem: any = {
    //                 id: count,
    //                 image: 'https://w.forfun.com/fetch/f7/f76c030200142905d4d0856baa694308.jpeg',
    //                 title: titles[count],
    //                 readyInMinutes: '45',
    //                 ingredients: 'fjdklsa fjdkl jfkdlsjf kdlsajfkd lsajfkls', // Преобразовываем массив ингредиентов в строку с разделителями
    //                 healthScore: '23434'
    //             }
    //             console.log(count)
    //             count++
    //             newArr.push(newItem)
    //         }
    //         setRecipesArr(newArr)
    //         setFilterArr(newArr)
    //     }
    //     getAllCards()
    // }, [])

    const searchTitle = (value: string) => {
        return recipesArr.filter((o) => o.title.toLowerCase().includes(value.toLowerCase()))
    }

    const onSearchButtonClick = (): void => {
        const newArr = searchTitle(inputValue)
        if (newArr.length === 0) {
            setIsfilterArrEmpty(true)
        } else {
            setIsfilterArrEmpty(false)
        }
        setFilterArr(newArr)
    }

    const getIngredientsString = (ingredients: Array<ingredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: ingredientData) => {
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
                        <Input value={inputValue} onChange={setInputValue}></Input> <Button onClick={onSearchButtonClick}><SearchIcon /></Button>
                    </div>
                    {isfilterArrEmpty && <Text className={styles['filter__error-title']} tag='h4' view='p-20' weight='medium'>No such dish was found !</Text>}

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
                <div className={styles['recipes__page-cards']}>
                    {filterArr.map((recipe: RecipeData) =>
                        <Card
                            key={recipe.id}
                            actionSlot={<Button>Save</Button>}
                            captionSlot={recipe.readyInMinutes + ' minutes'}
                            contentSlot={recipe.healthScore + ' kcal'}
                            image={recipe.image}
                            title={recipe.title}
                            subtitle={recipe.ingredients}
                        />
                    )}
                    {/* {filterArr.map((recipe: testData) =>
                        <Card
                            key={recipe.id}
                            actionSlot={<Button>Save</Button>}
                            captionSlot={recipe.readyInMinutes + ' minutes'}
                            contentSlot={recipe.healthScore + ' kcal'}
                            image={recipe.image}
                            title={recipe.title}
                            subtitle={recipe.ingredients}
                        />
                    )} */}
                </div>
            </div>
        </div>
    )
};

export default RecipesPage;