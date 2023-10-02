import * as React from 'react';
import styles from './RecipesList.module.scss';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import RecipesListStore from 'Store/RecipesListStore';
import { useLocalStore } from 'utils/useLocalStore';

export type RecipeData = {
    id: number;
    image: string;
    title: string;
    readyInMinutes?: string;
    caloricContent?: string;
    ingredients?: string;
    isError?: boolean
};

export type RecipesListProps = {
  cards: RecipeData[];
  onClick?: () => void;
};

const RecipesList: React.FC<RecipesListProps> = ({ cards }) => {
  const recipesListStore = useLocalStore(() => new RecipesListStore());

  recipesListStore.setRecipesData(cards)

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, recipe: RecipeData) => {
    e.stopPropagation();
    e.preventDefault();
    recipesListStore.addFavoriteCard(recipe);
  };

  return (
    <div className={styles['recipes__page-cards']}>
      {recipesListStore.recipesData.map((recipe: RecipeData) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <Card
              actionSlot={<Button onClick={(e) => handleButtonClick(e, recipe)}>Save</Button>}
              captionSlot={recipe.readyInMinutes + ' minutes'}
              contentSlot={recipe.caloricContent + ' kcal'}
              image={recipe.image}
              title={recipe.title}
              subtitle={recipe.ingredients}
            />
          </Link>
          {recipe.isError && (
            <Text className={styles.error__message} tag="p" view="p-16" color="error">
              You have already added this entry!
            </Text>
          )}
        </div>
      ))}
    </div>
  );
};

export default observer(RecipesList);
