import axios from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore.ts';
import { ReceivedRecipeData, IngredientData, RecipeData, Option, DropdownCounts } from './types'
import rootStore from 'Store/RootStore/instance';

export interface IRecipesStore {
    getRecipesData(): Promise<void>;
}

export type PrivateFields = '_list' | '_offset' | '_hasMore' | '_inputValue' | '_isOnSearchClick' | '_dropdownValue' | '_isFirstPage' | '_currentUrl' | '_isBurgerMenuOpen';

export default class RecipesStore implements IRecipesStore, ILocalStore {
    private _list: RecipeData[] = []
    private _offset = 0;
    private _isFirstPage = true;
    private _hasMore = true;
    private _inputValue = '';
    private _isOnSearchClick = false;
    private _dropdownValue: Option[] = [];
    private _currentUrl = '/';
    private _isBurgerMenuOpen = false;
    private _options: Option[] = [
        { key: 'main course', value: 'main course' },
        { key: 'side dish', value: 'side dish' },
        { key: 'dessert', value: 'dessert' },
        { key: 'appetizer', value: 'appetizer' },
        { key: 'salad', value: 'salad' },
        { key: 'bread', value: 'bread' },
        { key: 'breakfast', value: 'breakfast' },
        { key: 'soup', value: 'soup' },
        { key: 'beverage', value: 'beverage' },
        { key: 'souce', value: 'souce' },
        { key: 'marinade', value: 'marinade' },
        { key: 'fingerfood', value: 'fingerfood' },
        { key: 'snack', value: 'snack' },
        { key: 'drink', value: 'drink' },
    ];
    private readonly _qpReaction: IReactionDisposer = reaction(
        () => ({
            search: rootStore.query.getParam('search'),
            type: rootStore.query.getParam('type')
        }),
        ({ search, type }) => {
            if (typeof search === 'string') {
                this._inputValue = search;
            }
            // Преобразовываем полученную строку в массив Option[]
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
    private _firstLoad = (): void => {
        let searchParam = rootStore.query.getParam('search')
        if (searchParam && typeof searchParam === 'string') {
            this._isOnSearchClick = true;
            this._inputValue = searchParam;
            this._currentUrl += `?search=${searchParam}`
        }

        let typeParam = rootStore.query.getParam('type')
        if (typeParam && typeof typeParam === 'string') {
            this._isOnSearchClick = true;
            let substrings = typeParam.split(', ');
            this._dropdownValue = substrings.map((substring: string) => {
                return {
                    key: substring,
                    value: substring,
                };
            });

            if (this._currentUrl) {
                if (searchParam) {
                    this._currentUrl += `&type=${typeParam}`
                } else {
                    this._currentUrl += `?type=${typeParam}`
                }
            }
        }

        rootStore.prevUrl.setPreviousUrl(this._currentUrl)
    }

    public _loadMore = (): void => {
        this._offset += 6;
    };

    public setIsOnSearchClick = (): void => {
        this._list = [];
        this._offset = 0;
        this._isOnSearchClick = true;
        this._isFirstPage = true;
        this.getRecipesData();
        this._currentUrl = '/';
        let searchParam = rootStore.query.getParam('search')
        if (searchParam && typeof searchParam === 'string') {
            this._currentUrl += `?search=${searchParam}`
        }

        let typeParam = rootStore.query.getParam('type')
        if (typeParam && typeof typeParam === 'string') {
            if (this._currentUrl) {
                if (searchParam) {
                    this._currentUrl += `&type=${typeParam}`
                } else {
                    this._currentUrl += `?type=${typeParam}`
                }
            }
        }
        rootStore.prevUrl.setPreviousUrl(this._currentUrl)
    };

    public setInputValue = (value: string): void => {
        this._inputValue = value;
    };

    public handleDropdownChange = (options: Option[]) => {
        const counts: DropdownCounts = {};
        const filteredOptions: Option[] = [];
      
        for (const option of options) {
            if (!counts[option.value]) {
                counts[option.value] = false;
              }
              counts[option.value] = true;
          if (counts[option.value] === true) {
            filteredOptions.push(option);
          }
        }
      
        this._dropdownValue = filteredOptions;
      };

    public getDropdownTitle = (options: Option[]) => {
        return options.map((option) => option.value).join(', ') || 'Choose a category';
    };

    public setIsBurgerMenuOpen = () => {
        this._isBurgerMenuOpen = !this._isBurgerMenuOpen;
    }

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable,
            _offset: observable,
            _isFirstPage: observable,
            _hasMore: observable,
            _inputValue: observable,
            _isOnSearchClick: observable,
            _dropdownValue: observable,
            _currentUrl: observable,
            _isBurgerMenuOpen: observable,
            list: computed,
            hasMore: computed,
            offset: computed,
            isFirstPage: computed,
            inputValue: computed,
            isOnSearchClick: computed,
            dropdownValue: computed,
            options: computed,
            currentUrl: computed,
            isBurgerMenuOpen: computed,
            setIsBurgerMenuOpen: action
        })

        // Обрабатываем первый рендер при перезагрузки страницы
        this._firstLoad()
    };

    get list(): RecipeData[] {
        return this._list;
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
        return this._isFirstPage;
    }

    get currentUrl(): string {
        return this._currentUrl;
    }

    get isBurgerMenuOpen(): boolean {
        return this._isBurgerMenuOpen;
    }

    getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name;
        })
        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    };

    async getRecipesData(): Promise<void> {
        if (this.list.length >= 24) {
            this._hasMore = false;
            return;
        }
        let newInputValue = '';
        let newTypesValue = '';
        if (this._isOnSearchClick == true) {
            newInputValue = this._inputValue;
            if (this.getDropdownTitle(this._dropdownValue) !== 'Choose a category') {
                newTypesValue = this.getDropdownTitle(this._dropdownValue)
            }
        }

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${newInputValue}&apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6&type=${newTypesValue}`
        });

        const newRecipesArr = response.data.results.map((raw: ReceivedRecipeData) => ({
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
                this._list = [...this._list, ...newRecipesArr]
                if (this.list.length % 6 !== 0 || this.list.length === 0) {
                    this._hasMore = false
                }

                this._isFirstPage = false;
                return
            }
        })
    }

    destroy(): void {
        this._qpReaction();
    }
}