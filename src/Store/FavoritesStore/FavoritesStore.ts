import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import { RecipeData } from './types';
import rootStore from 'Store/RootStore';

export type PrivateFields = '_recipesData';

export default class FavoritesStore implements ILocalStore {
  private _recipesData: RecipeData[] = [];

  constructor() {
    rootStore.prevUrl.setPreviousUrl('/favorites')
    this._recipesData = JSON.parse(localStorage.getItem('savedRecipes') as string) || [];
    makeObservable<FavoritesStore, PrivateFields>(this, {
      _recipesData: observable,
      recipesData: computed,
      deleteRecipe: action,
    });
  }

  get recipesData(): RecipeData[] {
    return this._recipesData;
  }

  public setRecipesData = (recipes: RecipeData[]) => {
    this._recipesData = recipes
  }

  public deleteRecipe = (recipe: RecipeData) => {
    this._recipesData = this._recipesData.filter(item => item.title !== recipe.title);
    localStorage.setItem('savedRecipes', JSON.stringify(this._recipesData));
  }

  reset(): void {
    this._recipesData = [];
  }

  destroy(): void {}
}



