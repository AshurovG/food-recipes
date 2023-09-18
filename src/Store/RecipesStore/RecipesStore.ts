import axios from 'axios';
import { IReactionDisposer, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore';
import { ReceivedRecipeData, IngredientData, RecipeData } from './types'
import { Meta } from 'utils/meta.ts';
import rootStore from '../RootStore/instance';


export interface IRecipesStore {
    getRecipesData(): Promise<void>;
}

export type PrivateFields = '_list' | '_meta' | '_offset' | '_hasMore' | '_inputValue' | '_isOnSearchClick' | '_dropdownValue';

export default class RecipesStore implements IRecipesStore, ILocalStore {

    private _list: RecipeData[] = []
    private _meta: Meta = Meta.initial;
    private _offset = 0;
    private _hasMore = true;
    private _inputValue = '';
    private _isOnSearchClick = false;
    private _dropdownValue =

        public setOffset(offset: number): void {
            this._offset = offset;
        }

    public _loadMore = (): void => {
        this._offset += 6
    };

    public setIsOnSearchClick = (): void => {
        this._list = []
        this._offset = 0
        this._isOnSearchClick = true;
        this.getRecipesData();
    }

    public setInputValue = (value: string): void => {
        this._inputValue = value;
    }

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _offset: observable,
            _hasMore: observable,
            _inputValue: observable,
            _isOnSearchClick: observable,
            list: computed,
            meta: computed,
            hasMore: computed,
            offset: computed,
            inputValue: computed,
            isOnSearchClick: computed
        })

        const searchParam = rootStore.query.getParam('search')
        if (searchParam && typeof searchParam === 'string') {
            this._isOnSearchClick = true;
            this._inputValue = searchParam;
        }
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

    async getRecipesData(): Promise<void> {
        this._meta = Meta.loading;
        if (this.list.length >= 24) {
            this._hasMore = false;
            console.log('первая проверка')
            return;
        }
        let newValue = '';
        if (this._isOnSearchClick == true) {
            console.log("Поиск по названию", this._inputValue)
            newValue = this._inputValue;
        }

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
                if (this.list.length % 6 !== 0) {
                    this._hasMore = false
                    console.log('изменили hasmore из за длины')
                }

                if (this._offset === 0) {
                    this._offset += 6
                }
                return
            }
            this._meta = Meta.error
        })
    }

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam('search'),
        (search) => {
            console.log('asasasa', this._inputValue)
            if (typeof search == 'string') {
                this._inputValue = search
                console.log(this._inputValue)
            }
            console.log("search value change", search);
        }
    );

    destroy(): void {

    }
}