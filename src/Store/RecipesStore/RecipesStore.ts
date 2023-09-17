import axios from 'axios';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore';
import { ReceivedRecipeData, IngredientData, RecipeData } from './types'
import { Meta } from 'utils/meta.ts';


export interface IRecipesStore {
    getRecipesData(isSearch?: boolean): Promise<void>;
}

export type PrivateFields = '_list' | '_meta' | '_offset' | '_hasMore' | '_isFirstCards' | '_isFirstCardsLoading' | '_inputValue' | '_isOnSearchClick';

export default class RecipesStore implements IRecipesStore, ILocalStore {

    private _list: RecipeData[] = []
    private _meta: Meta = Meta.initial;
    private _offset = 0;
    private _hasMore = true;
    private _isFirstCards = true;
    private _isFirstCardsLoading = true;
    private _inputValue = '';
    private _isOnSearchClick = false;

    public setOffset(offset: number): void {
        this._offset = offset;
    }

    public _loadMore = (): void => {
        this._offset += 6
        console.log('list-length', this._list.length)
        console.log('has more: ', this._hasMore)
        console.log('store:', this._offset)
    };

    public setIsOnSearchClick = (): void => {
        this._isOnSearchClick = true;
        this._list = []
        this._offset = 0
        console.log(this._isOnSearchClick)
    }

    public setInputValue = (value: string): void => {
        this._inputValue = value;
        console.log(this.inputValue)
    }

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _offset: observable,
            _hasMore: observable,
            _isFirstCards: observable,
            _isFirstCardsLoading: observable,
            _inputValue: observable,
            _isOnSearchClick: observable,
            list: computed,
            meta: computed,
            hasMore: computed,
            isFirstCards: computed,
            isFirstCardsLoading: computed,
            offset: computed,
            inputValue: computed,
            isOnSearchClick: computed
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

    get inputValue(): string {
        return this._inputValue
    }

    get isOnSearchClick(): boolean {
        return this._isOnSearchClick
    }

    getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name
        })
        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    }

    async getRecipesData(isSearch?: boolean): Promise<void> {
        this._meta = Meta.loading;
        if (this.list.length >= 24) {
            this._hasMore = false;
            return;
        }
        let newValue = '';
        if (this._isOnSearchClick == true) {
            console.log("Поиск по названию", this._inputValue)
            newValue = this._inputValue;
            // const response = await axios({
            //     method: 'get',
            //     url: `https://api.spoonacular.com/recipes/complexSearch?query=${this._inputValue}&apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6`
            // });
        }

        // const response = await axios({
        //     method: 'get',
        //     url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6`
        // });

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${newValue}&apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6`
        });

        const newRecipesArr = response.data.results.map((raw: ReceivedRecipeData, index: number) => ({
            id: raw.id,
            image: raw.image,
            title: raw.title,
            readyInMinutes: raw.readyInMinutes,
            ingredients: this.getIngredientsString(raw.nutrition.ingredients),
            caloricContent: raw.nutrition.nutrients[0].amount,
            key: raw.id.toString()
        }))

        runInAction(() => {
            if (response.status === 200) {
                this._meta = Meta.success;
                this._list = [...this._list, ...newRecipesArr]
                if (this.isFirstCards) {
                    this._isFirstCards = false;
                    this._isFirstCardsLoading = false;
                }
                return
            }
            this._meta = Meta.error
        })
    }

    destroy(): void {

    }
}