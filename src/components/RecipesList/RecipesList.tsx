import * as React from 'react';
import styles from './RecipesList.module.scss';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import RecipesListStore from 'Store/RecipesListStore';
import rootStore from 'Store/RootStore/instance';
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

  // React.useEffect(() => {
  //   console.log(11111)
  //   if (recipesListStore.showError) {
  //     const timer = setTimeout(() => {
  //       recipesListStore.setShowError(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [recipesListStore.showError]);

  React.useEffect(() => {
    const timers: Map<number, NodeJS.Timeout> = new Map();
  
    recipesListStore.recipesData.forEach((recipe: RecipeData) => {
      if (recipe.isError) {
        const timer = setTimeout(() => {
          recipesListStore.setShowError(false);
          recipesListStore.setIsError(recipe, false);
          timers.delete(recipe.id);
        }, 2000);
  
        timers.set(recipe.id, timer);
      }
    });
  
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [recipesListStore.showError]);

  return (
    <div className={styles['recipes__page-cards']}>
      {recipesListStore.recipesData.map((recipe: RecipeData) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <Card
              actionSlot={ !rootStore.auth.isLogin 
                ? <Link to={'/auth'}><Button>Save</Button></Link>
                : <Button onClick={(e) => handleButtonClick(e, recipe)}>Save</Button>
              }
              captionSlot={recipe.readyInMinutes + ' minutes'}
              contentSlot={recipe.caloricContent + ' kcal'}
              image={recipe.image}
              title={recipe.title}
              subtitle={recipe.ingredients}
            />
          </Link>
          {recipe.isError && recipesListStore.showError && (
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
