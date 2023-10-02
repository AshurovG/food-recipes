import * as React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';
import styles from './FavoritesPage.module.scss';
import Text from 'components/Text';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import { observer } from 'mobx-react-lite';
import FavoritesStore from 'Store/FavoritesStore';
import { useLocalStore } from 'utils/useLocalStore';

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    caloricContent?: string;
    ingredients?: string;
    isError?: boolean;
};

const FavoritesPage: React.FC = () => {
    const favoritesStore = useLocalStore(() => new FavoritesStore());

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, recipe: RecipeData) => {
        e.stopPropagation();
        e.preventDefault();
        favoritesStore.deleteRecipe(recipe)
      };
    

    return (
        <div className={styles.favorites}>
            <Header/>
            <div className={styles.favorites__wrapper}>
                <div className={styles['favorites__title-block']}></div>
                <h1 className={styles.favorites__title}>List of favorite recipes</h1>
                <h3 className={styles.favorites__subtitle}>You can add your favorite recipes from the general recipe list here!<br/>
                {favoritesStore.recipesData.length === 0 && <span className={styles['favorites__subtitle-empty']}>The list is empty at the moment!</span>}</h3>
                <div className={styles['favorites__cards']}>
                {favoritesStore.recipesData.map((recipe: RecipeData) => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                        <Card
                        actionSlot={<Button onClick={(e) => handleButtonClick(e, recipe)}>Delete</Button>}
                        captionSlot={recipe.readyInMinutes + ' minutes'}
                        contentSlot={recipe.caloricContent + ' kcal'}
                        image={recipe.image}
                        title={recipe.title}
                        subtitle={recipe.ingredients}
                        />
                    </Link>
                ))}
                </div>
            </div>
        </div >
    )
};

export default observer(FavoritesPage);