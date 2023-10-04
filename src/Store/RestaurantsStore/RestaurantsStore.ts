import axios from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config';
import { ILocalStore } from 'utils/useLocalStore';
import { ReceivedRecipeData, IngredientData, RecipeData, Option, DropdownCounts } from './types'
import rootStore from 'Store/RootStore/instance';

export interface IRestaurantsStore {
    // getRecipesData(): Promise<void>;
}

export type PrivateFields = '_list' | '_offset' | '_hasMore'| '_dropdownValue' | '_inputValue' | '_isOnSearchClick'
 | '_isFirstPage' | '_currentUrl' | '_sliderValue' | '_outputStyle';

export default class RestaurantsStore implements IRestaurantsStore, ILocalStore {
    private _list: RecipeData[] = []
    private _offset = 0;
    private _isFirstPage = true;
    private _hasMore = true;
    private _isOnSearchClick = false;
    private _currentUrl = '/';
    private _inputValue = '';
    private _dropdownValue: Option[] = [];
    private _sliderValue = 0;
    private _outputStyle: {left: string} = {left: '0'};
    private _options: Option[] = [
        { key: "African", value: "African" },
        { key: "Asian", value: "Asian" },
        { key: "American", value: "American" },
        { key: "British", value: "British" },
        { key: "Cajun", value: "Cajun" },
        { key: "Caribbean", value: "Caribbean" },
        { key: "Chinese", value: "Chinese" },
        { key: "Eastern European", value: "Eastern European" },
        { key: "European", value: "European" },
        { key: "French", value: "French" },
        { key: "German", value: "German" },
        { key: "Greek", value: "Greek" },
        { key: "Indian", value: "Indian" },
        { key: "Irish", value: "Irish" },
        { key: "Italian", value: "Italian" },
        { key: "Japanese", value: "Japanese" },
        { key: "Jewish", value: "Jewish" },
        { key: "Korean", value: "Korean" },
        { key: "Latin American", value: "Latin American" },
        { key: "Mediterranean", value: "Mediterranean" },
        { key: "Mexican", value: "Mexican" },
        { key: "Middle Eastern", value: "Middle Eastern" },
        { key: "Nordic", value: "Nordic" },
        { key: "Southern", value: "Southern" },
        { key: "Spanish", value: "Spanish" },
        { key: "Thai", value: "Thai" },
        { key: "Vietnamese", value: "Vietnamese" }
      ]
    // private readonly _qpReaction: IReactionDisposer = reaction(
    //     () => ({
    //         search: rootStore.query.getParam('search'),
    //         type: rootStore.query.getParam('type')
    //     }),
    //     ({ search, type }) => {
    //         if (typeof search === 'string') {
    //             this._inputValue = search;
    //         }
    //         // Преобразовываем полученную строку в массив Option[]
    //         if (typeof type === 'string') {
    //             let substrings = type.split(', ');
    //             this._dropdownValue = substrings.map((substring: string) => {
    //                 return {
    //                     key: substring,
    //                     value: substring,
    //                 };
    //             });
    //         }
    //     }
    // );
    private _firstLoad = (): void => {
        this._isOnSearchClick = true;
        // let searchParam = rootStore.query.getParam('search')
        // if (searchParam && typeof searchParam === 'string') {
        //     this._isOnSearchClick = true;
        //     this._inputValue = searchParam;
        //     this._currentUrl += `?search=${searchParam}`
        // }

        // let typeParam = rootStore.query.getParam('type')
        // if (typeParam && typeof typeParam === 'string') {
        //     this._isOnSearchClick = true;
        //     let substrings = typeParam.split(', ');
        //     this._dropdownValue = substrings.map((substring: string) => {
        //         return {
        //             key: substring,
        //             value: substring,
        //         };
        //     });

        //     if (this._currentUrl) {
        //         if (searchParam) {
        //             this._currentUrl += `&type=${typeParam}`
        //         } else {
        //             this._currentUrl += `?type=${typeParam}`
        //         }
        //     }
        // }

        // rootStore.prevUrl.setPreviousUrl(this._currentUrl)
    }

    public _loadMore = (): void => {
        this._offset += 6;
    };

    public setInputValue = (value: string): void => {
        this._inputValue = value;
    };

    public setSliderValue(value: number) {
        this._sliderValue = value;
    }

    public setOutputStyle(value: {left: string}) {
        this._outputStyle = value;
    }

    public setIsOnSearchClick = (): void => {
        // this._list = [];
        // this._offset = 0;
        this._isOnSearchClick = true;
        // this._isFirstPage = true;
        this.getRecipesData();
        // this._currentUrl = '/';
        // if (this._inputValue) {
        //     this._currentUrl += `?search=${this._inputValue}`
        // }
        // if (this._dropdownValue) {
        //         console.log(this.getDropdownTitle(this._dropdownValue))
        //         if (this._inputValue) {
        //             this._currentUrl += `&type=${this.getDropdownTitle(this._dropdownValue)}`
        //         } else {
        //             this._currentUrl += `?type=${this.getDropdownTitle(this._dropdownValue)}`
        //         }
        // }
        // console.log(this._currentUrl)
        // rootStore.prevUrl.setPreviousUrl(this._currentUrl)
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

    constructor() {
        makeObservable<RestaurantsStore, PrivateFields>(this, {
            _list: observable,
            _offset: observable,
            _isFirstPage: observable,
            _hasMore: observable,
            _inputValue: observable,
            _isOnSearchClick: observable,
            _dropdownValue: observable,
            _sliderValue: observable,
            _outputStyle: observable,
            _currentUrl: observable,
            list: computed,
            hasMore: computed,
            offset: computed,
            isFirstPage: computed,
            inputValue: computed,
            isOnSearchClick: computed,
            dropdownValue: computed,
            options: computed,
            sliderValue: computed,
            outputStyle: computed,
            currentUrl: computed,
            setSliderValue: action,
            setOutputStyle: action,
        })

        // Обрабатываем первый рендер при перезагрузке страницы
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

    get sliderValue(): number {
        return this._sliderValue;
    }

    get outputStyle(): {left: string} {
        return this._outputStyle;
    }

    get currentUrl(): string {
        return this._currentUrl;
    }

    getIngredientsString = (ingredients: Array<IngredientData>): string => {
        let newArr: Array<string> = ingredients.map((ingredient: IngredientData) => {
            return ingredient.name;
        })
        return newArr.slice(0, newArr.length - 1).join(' + ') + ' ' + newArr[newArr.length - 1];
    };

    async getRecipesData(): Promise<void> {
        if (this._list.length >= 24) {
            this._hasMore = false;
            return;
        }
        let newInputValue = '';
        let newDropdownValue = '';
        let newSliderValue = 0;
        // if (this._isOnSearchClick == true) {
        //     newInputValue = this._inputValue;
        //     if (this.getDropdownTitle(this._dropdownValue) !== 'Choose a category') {
        //         newTypesValue = this.getDropdownTitle(this._dropdownValue)
        //     }
        // }

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/food/restaurants/search?apiKey=${apiKey}`
        });
        console.log(response.data)

        // const newRecipesArr = response.data.results.map((raw: ReceivedRecipeData) => ({
        //     id: raw.id,
        //     image: raw.image,
        //     title: raw.title,
        //     readyInMinutes: raw.readyInMinutes,
        //     ingredients: this.getIngredientsString(raw.nutrition.ingredients),
        //     caloricContent: raw.nutrition.nutrients[0].amount,
        //     key: raw.id.toString()
        // }))

        // runInAction(() => {
        //     if (response.status === 200) {
        //         this._list = [...this._list, ...newRecipesArr]
        //         if (this.list.length % 6 !== 0 || this.list.length === 0) {
        //             this._hasMore = false
        //         }

        //         this._isFirstPage = false;
        //         return
        //     }
        // })
    }

    destroy(): void {
        // this._qpReaction();
    }
}