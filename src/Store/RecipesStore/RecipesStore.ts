import axios from 'axios';
import { computed, makeObservable, observable } from 'mobx';
// import { computed, makeObservable, observable } from 'mobx/dist/internal';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore';
import { ReceivedRecipeData, IngredientData, RecipeData } from './types'
import { Meta } from 'utils/meta.ts';


export interface IRecipesStore {
    getRecipesData(): Promise<void>;
}

export type PrivateFields = '_list' | '_meta' | '_offset' | '_hasMore' | '_isFirstCards' | '_isFirstCardsLoading';

export default class RecipesStore implements IRecipesStore, ILocalStore {

    private _list: RecipeData[] = []
    private _meta: Meta = Meta.initial;
    private _offset = 0;
    private _hasMore = true;
    private _isFirstCards = true;
    private _isFirstCardsLoading = true;
    public setOffset(offset: number): void {
        this._offset = offset;
    }

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _offset: observable,
            _hasMore: observable,
            _isFirstCards: observable,
            _isFirstCardsLoading: observable,
            list: computed,
            meta: computed,
            hasMore: computed,
            isFirstCards: computed,
            isFirstCardsLoading: computed,
            offset: computed
        })
    }

    get list(): RecipeData[] {
        return this._list;
    }

    get meta(): Meta {
        return this._meta
    }

    get hasMore(): boolean {
        return this._hasMore
    }

    get isFirstCards(): boolean {
        return this._isFirstCards
    }

    get isFirstCardsLoading(): boolean {
        return this._isFirstCardsLoading
    }

    get offset(): number {
        return this._offset
    }

    public _loadMore = (): void => {
        this._offset += 6
        console.log('list-length', this._list.length)
        console.log('has more: ', this._hasMore)
        console.log('store:', this._offset)
    };

    getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name
        })
        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    }

    async getRecipesData(): Promise<void> {
        this._meta = Meta.loading;
        if (this.list.length >= 24) {
            this._hasMore = false;
            return;
        }

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6`
        });

        const newRecipesArr = response.data.results.map((raw: ReceivedRecipeData) => ({
            id: raw.id,
            image: raw.image,
            title: raw.title,
            readyInMinutes: raw.readyInMinutes,
            ingredients: this.getIngredientsString(raw.nutrition.ingredients),
            caloricContent: raw.nutrition.nutrients[0].amount
        }))

        // if (response.status === 200) {
        this._meta = Meta.success;
        this._list = [...this._list, ...newRecipesArr]
        if (this.isFirstCards) {
            this._isFirstCards = false;
            this._isFirstCardsLoading = false;
        }

        //     return
        // }

        // this._meta = Meta.error
    }

    destroy(): void {

    }
}