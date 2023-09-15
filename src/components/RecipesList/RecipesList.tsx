import * as React from 'react'
import styles from "./RecipesList.module.scss"
import { Link } from 'react-router-dom'
import Button from 'components/Button';
import Card from 'components/Card';

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    caloricContent?: string;
    ingredients: string
}

export type СharacteristicProps = {
    cards: RecipeData[]
};



const RecipesList: React.FC<СharacteristicProps> = ({ cards }) => {
    return (
        <div className={styles['recipes__page-cards']}>
            {cards.map((recipe: RecipeData) =>
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                    <Card
                        key={recipe.id}
                        actionSlot={<Button>Save</Button>}
                        captionSlot={recipe.readyInMinutes + ' minutes'}
                        contentSlot={recipe.caloricContent + ' kcal'}
                        image={recipe.image}
                        title={recipe.title}
                        subtitle={recipe.ingredients}
                    />
                </Link>
            )}
        </div>
    )
}

export default RecipesList;