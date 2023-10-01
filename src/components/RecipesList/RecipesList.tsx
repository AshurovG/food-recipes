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
    ingredients?: string
}

export type СharacteristicProps = {
    cards: RecipeData[]
};

const RecipesList: React.FC<СharacteristicProps> = ({ cards }) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`button is ${e.eventPhase}`);
      console.log(1010101);
    };

    // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     // e.preventDefault();
    //     // console.log(`link is ${e.eventPhase}`)
    // };
  
    return (
      <div className={styles['recipes__page-cards']}>
        {cards.map((recipe: RecipeData) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <Card
              key={recipe.id}
              actionSlot={<Button onClick={handleButtonClick}>Save</Button>}
              captionSlot={recipe.readyInMinutes + ' minutes'}
              contentSlot={recipe.caloricContent + ' kcal'}
              image={recipe.image}
              title={recipe.title}
              subtitle={recipe.ingredients}
            />
          </Link>
        ))}
      </div>
    );
  };

export default RecipesList;