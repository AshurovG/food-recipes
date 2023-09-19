import axios from 'axios';
import { IReactionDisposer, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore';
import { ReceivedRecipeData, IngredientData, RecipeData, Option, DropdownCounts } from './types'
import { Meta } from 'utils/meta.ts';
import rootStore from '../RootStore/instance';


export interface IRecipesStore {
    getRecipesData(): Promise<void>;
}

export type PrivateFields = '_list' | '_meta' | '_offset' | '_hasMore' | '_inputValue' | '_isOnSearchClick' | '_dropdownValue' | '_isFirstPage';

export default class RecipesStore implements IRecipesStore, ILocalStore {
    private _list: RecipeData[] = []
    private _meta: Meta = Meta.initial;
    private _offset = 0;
    private _isFirstPage = true;
    private _hasMore = true;
    private _inputValue = '';
    private _isOnSearchClick = false;
    private _dropdownValue: Option[] = []
    private _options: Option[] = [
        { key: '1', value: 'main course' },
        { key: '2', value: 'side dish' },
        { key: '3', value: 'dessert' },
        { key: '4', value: 'appetizer' },
        { key: '5', value: 'salad' },
        { key: '6', value: 'bread' },
        { key: '7', value: 'breakfast' },
        { key: '8', value: 'soup' },
        { key: '9', value: 'beverage' },
        { key: '10', value: 'souce' },
        { key: '11', value: 'marinade' },
        { key: '12', value: 'fingerfood' },
        { key: '13', value: 'snack' },
        { key: '14', value: 'drink' },
    ];

    public setOffset(offset: number): void {
        this._offset = offset;
    };

    public _loadMore = (): void => {
        this._offset += 6
    };

    public setIsOnSearchClick = (): void => {
        this._list = []
        this._offset = 0
        this._isOnSearchClick = true;
        this._isFirstPage = true;
        this.getRecipesData();
    };

    public setInputValue = (value: string): void => {
        this._inputValue = value;
    };

    public handleDropdownChange = (options: Option[]) => {
        const counts: DropdownCounts = {};
        options.forEach(option => {
            counts[option.value] = (counts[option.value] || 0) + 1;
        });

        const filteredOptions = options.filter(option => counts[option.value] === 1);
        this._dropdownValue = filteredOptions;
    };

    public getDropdownTitle = (options: Option[]) => {
        return options.map((option) => option.value).join(', ') || 'Choose a category of dishes';
    };

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _offset: observable,
            _isFirstPage: observable,
            _hasMore: observable,
            _inputValue: observable,
            _isOnSearchClick: observable,
            _dropdownValue: observable,
            list: computed,
            meta: computed,
            hasMore: computed,
            offset: computed,
            isFirstPage: computed,
            inputValue: computed,
            isOnSearchClick: computed,
            dropdownValue: computed,
            options: computed
        })

        let searchParam = rootStore.query.getParam('search')
        if (searchParam && typeof searchParam === 'string') {
            this._isOnSearchClick = true;
            this._inputValue = searchParam;
        }

        searchParam = rootStore.query.getParam('type')
        if (searchParam && typeof searchParam === 'string') {
            this._isOnSearchClick = true;
            let substrings = searchParam.split(', ');
            this._dropdownValue = substrings.map((substring: string) => {
                return {
                    key: substring,
                    value: substring,
                };
            });
        }
    }
    ;
    get list(): RecipeData[] {
        return this._list;
    };

    get meta(): Meta {
        return this._meta
    };

    get hasMore(): boolean {
        return this._hasMore
    };

    get offset(): number {
        return this._offset;
    };

    get inputValue(): string {
        return this._inputValue;
    };

    get isOnSearchClick(): boolean {
        return this._isOnSearchClick;
    };

    get dropdownValue(): Option[] {
        return this._dropdownValue;
    };

    get options(): Option[] {
        return this._options;
    };

    get isFirstPage(): boolean {
        return this._isFirstPage
    }

    getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name;
        })
        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    };

    async getRecipesData(): Promise<void> {
        this._meta = Meta.loading;
        if (this.list.length >= 24) {
            this._hasMore = false;
            return;
        }
        let newInputValue = '';
        let newTypesValue = '';
        if (this._isOnSearchClick == true) {
            newInputValue = this._inputValue;
            if (this.getDropdownTitle(this._dropdownValue) !== 'Choose a category of dishes') {
                newTypesValue = this.getDropdownTitle(this._dropdownValue)
            }
        }

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${newInputValue}&apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6&type=${newTypesValue}`
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
                if (this.list.length % 6 !== 0 || this.list.length === 0) {
                    this._hasMore = false
                }

                // if (this._offset === 0) {
                //     this._offset += 6
                // }
                // if (this._isFirstPage === true) {
                this._isFirstPage = false;
                // }
                return
            }
            this._meta = Meta.error
        })
    }

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => ({
            search: rootStore.query.getParam('search'),
            type: rootStore.query.getParam('type')
        }),
        ({ search, type }) => {
            if (typeof search === 'string') {
                this._inputValue = search;
            }
            if (typeof type === 'string') {
                let substrings = type.split(', ');
                this._dropdownValue = substrings.map((substring: string) => {
                    return {
                        key: substring,
                        value: substring,
                    };
                });
            }
        }
    );

    destroy(): void {

    }
}