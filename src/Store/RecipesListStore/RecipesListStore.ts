import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {RecipeData} from './types'

export type PrivateFields = '_recipesData';

export default class RecipesListStore implements ILocalStore {
  private _recipesData: RecipeData[];

  constructor() {
    this._recipesData = [];
    makeObservable<RecipesListStore, PrivateFields>(this, {
      _recipesData: observable,
      recipesData: computed,
      addFavoriteCard: action,
      setIsError: action,
    });
  }

  get recipesData(): RecipeData[] {
    return this._recipesData;
  }

  public setRecipesData = (recipes: RecipeData[]) => {
    this._recipesData = recipes
  }

  public setIsError = (recipe: RecipeData, value: boolean) => {
    recipe.isError = value;
  };

  public addFavoriteCard = (recipe: RecipeData) => {
    let savedRecipes: RecipeData[] = JSON.parse(localStorage.getItem('savedRecipes') as string) || [];
    const hasRecipe = savedRecipes.some(item => item.title === recipe.title);
    if (hasRecipe) {
      const existingRecipe = savedRecipes.find((item) => item.title === recipe.title);
      if (existingRecipe) {
        existingRecipe.isError = true;
        const index = this._recipesData.findIndex((item) => item.title === recipe.title);
        if (index !== -1) {
          this._recipesData[index] = existingRecipe;
        }
      }
      return;
    }
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  };

  reset(): void {
    this._recipesData = [];
  }

  destroy(): void {}
}



