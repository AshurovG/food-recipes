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

type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};

const RecipesPage: React.FC = () => {
    const [recipesArr, setRecipesArr] = useState([])
    const [value, setValue] = useState<Option[]>([]);
    //2f57ba40700b492a98d46c16cb731636
    //96b03ded692d45b391ec26a66cf00564
    const apiKey = '2f57ba40700b492a98d46c16cb731636';

    // React.useEffect(() => { // Получаем данные о всех рецептах из API
    //     const getAllCards = async (): Promise<void> => {
    //         const result = await axios({
    //             method: 'get',
    //             url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true`
    //         });
    //         setRecipesArr(result.data.results.map((raw: RecipeData) => ({
    //             id: raw.id,
    //             image: raw.image,
    //             title: raw.title,
    //             readyInMinutes: raw.readyInMinutes,
    //             ingredients: getIngredientsString(raw.nutrition.ingredients), // Преобразовываем массив ингредиентов в строку с разделителями
    //             healthScore: raw.healthScore
    //         })))
    //         console.log('result', result.data.results)
    //     }
    //     getAllCards()

    // }, [])


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
                        <Input value='' onChange={() => { }}></Input> <Button><SearchIcon /></Button>
                    </div>

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
                    {recipesArr.map((recipe: RecipeData) =>
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
                </div>
            </div>
        </div>
    )
};

export default RecipesPage;