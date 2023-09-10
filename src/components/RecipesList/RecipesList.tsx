import * as React from 'react'
import styles from "./RecipesList.module.scss"
import { Link } from 'react-router-dom'
import Button from 'components/Button';
import Card from 'components/Card';

export type testData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    healthScore?: string;
    ingredients: string
}

export type СharacteristicProps = {
    cards: testData[]
};



const RecipesList: React.FC<СharacteristicProps> = ({ cards }) => {
    return (
        <div className={styles['recipes__page-cards']}>
            {/* {filterArr.map((recipe: RecipeData) =>
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


            {cards.map((recipe: testData) =>
                <Link to={`/recipe/${recipe.id}`}>
                    <Card
                        key={recipe.id}
                        actionSlot={<Button>Save</Button>}
                        captionSlot={recipe.readyInMinutes + ' minutes'}
                        contentSlot={recipe.healthScore + ' kcal'}
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