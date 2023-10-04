import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {RecipeData} from './types'

export type PrivateFields = '_recipesData' | '_showError';

export default class RecipesListStore implements ILocalStore {
  private _recipesData: RecipeData[];
  private _showError = false

  constructor() {
    this._recipesData = [];
    makeObservable<RecipesListStore, PrivateFields>(this, {
      _recipesData: observable,
      _showError: observable,
      recipesData: computed,
      showError: computed,
      addFavoriteCard: action,
      setIsError: action,
      setShowError: action
    });
  }

  get recipesData(): RecipeData[] {
    return this._recipesData;
  }

  get showError(): boolean {
    return this._showError;
  }
  
  public setRecipesData = (recipes: RecipeData[]) => {
    this._recipesData = recipes
  }

  public setIsError = (recipe: RecipeData, value: boolean) => {
    recipe.isError = value;
    this._showError = value
  };

  public setShowError = (value: boolean) => {
    this._showError = value;
  };

  

  public addFavoriteCard = (recipe: RecipeData) => {
    let savedRecipes: RecipeData[] = JSON.parse(localStorage.getItem('savedRecipes') as string) || [];
    const hasRecipe = savedRecipes.some(item => item.title === recipe.title);
    if (hasRecipe) {
      const existingRecipe = savedRecipes.find((item) => item.title === recipe.title);
      if (existingRecipe) {
        existingRecipe.isError = true;
        this._showError = true;
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



