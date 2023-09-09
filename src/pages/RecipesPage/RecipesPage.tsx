import React, { useState } from 'react';
import cn from 'classnames';
import styles from './RecipesPage.module.scss';
import Header from 'components/Header';
import MainImage from 'components/MainImage';
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
    nutrition: any
}

const RecipesPage: React.FC = () => {
    const [recipesArr, setRecipesArr] = useState([])
    const apiKey = '96b03ded692d45b391ec26a66cf00564';
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
                ingredients: getIngredientsString(raw.nutrition.ingredients),
                healthScore: raw.healthScore
            })))
            console.log('result', result.data.results)
        }
        getAllCards()

    }, [])


    const getIngredientsString = (ingredients: Array<ingredientData>): string => {
        console.log(111)
        let newArr: Array<string> = ingredients.map((ingredient: ingredientData) => {
            return ingredient.name
        })

        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    }
    console.log(recipesArr)


    return (
        <div className={styles.recipes__page}>
            <Header></Header>
            <MainImage />

            <div className={styles['recipes__page-wrapper']}>
                {recipesArr.map((recipe: RecipeData) =>
                    <Card
                        actionSlot={<Button>Save</Button>}
                        captionSlot={recipe.readyInMinutes}
                        contentSlot={recipe.healthScore}
                        image={recipe.image}
                        title={recipe.title}
                        subtitle={'recipetle'}
                    />
                )}
            </div>
        </div>
    )
};

export default RecipesPage;