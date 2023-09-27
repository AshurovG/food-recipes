import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config';
import { ILocalStore } from 'utils/useLocalStore';
import { Option, DropdownCounts, OneDayPlan, WeekPlan, Nutrients } from './types'
import { Meta } from 'utils/meta';
import rootStore from 'Store/RootStore';


export interface IMealPlanStore {
    getMealPlanData(): Promise<void>;
}

export type PrivateFields = '_dietsValue' | '_excludedIngredientsValue' | '_checkboxValue' | '_sliderValue' | '_outputStyle' | '_dayPlanList' | '_weekPlanList';

export default class MealPlanStore implements IMealPlanStore, ILocalStore {
    private _dietsValue: Option[] = [];
    private _excludedIngredientsValue: Option[] = [];
    private _checkboxValue = false;
    private _sliderValue = 1000;
    private _outputStyle: {left: string} = {left: '0'};
    private _dayPlanList: OneDayPlan[] = [];
    private _weekPlanList: WeekPlan = {
        sunday: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null
    };
    

    private _dietsOptions: Option[] = [
        { key: 'Gluten Free', value: 'Gluten Free' },
        { key: 'Ketogenic', value: 'Ketogenic' },
        { key: 'Vegetarian', value: 'Vegetarian' },
        { key: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
        { key: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian' },
        { key: 'Vegan', value: 'Vegan' },
        { key: 'Pescetarian', value: 'Pescetarian' },
        { key: 'Paleo', value: 'Paleo' },
        { key: 'Primal', value: 'Primal' },
        { key: 'Low FODMAP', value: 'Low FODMAP' },
        { key: 'Whole30', value: 'Whole30' },
    ];

    private _excludedIngredientsOptions: Option[] = [
        { key: 'Baking', value: 'Baking' },
        { key: 'Health Foods', value: 'Health Foods' },
        { key: 'Spices and Seasonings', value: 'Spices and Seasonings' },
        { key: 'Pasta and Rice', value: 'Pasta and Rice' },
        { key: 'Bakery/Bread', value: 'Bakery/Bread' },
        { key: 'Refrigerated', value: 'Refrigerated' },
        { key: 'Canned and Jarred', value: 'Canned and Jarred' },
        { key: 'Frozen', value: 'Frozen' },
        { key: 'Nut butters, Jams, and Honey', value: 'Nut butters, Jams, and Honey' },
        { key: 'Oil, Vinegar, Salad Dressing', value: 'Oil, Vinegar, Salad Dressing' },
        { key: 'Condiments', value: 'Condiments' },
        { key: 'Savory Snacks', value: 'Savory Snacks' },
        { key: 'Milk, Eggs, Other Dairyм', value: 'Milk, Eggs, Other Dairy' },
        { key: 'Ethnic Foods', value: 'Ethnic Foods' },
        { key: 'Tea and Coffee', value: 'Tea and Coffee' },
        { key: 'Meat', value: 'Meat' },
        { key: 'Gourmet', value: 'Gourmet' },
        { key: 'Sweet Snacks', value: 'Sweet Snacks' },
        { key: 'Gluten Free', value: 'Gluten Free' },
        { key: 'Alcoholic Beverages', value: 'Alcoholic Beverages' },
        { key: 'Cereal', value: 'Cereal' },
        { key: 'Nuts', value: 'Nuts' },
        { key: 'Beverages', value: 'Beverages' },
        { key: 'Produce', value: 'Produce' },
        { key: 'Not in Grocery Store/Homemade', value: 'Not in Grocery Store/Homemade' },
        { key: 'Seafood', value: 'Seafood' },
        { key: 'Cheese', value: 'Cheese' },
        { key: 'Dried Fruits', value: 'Dried Fruits' },
        { key: 'Grilling Supplies', value: 'Grilling Supplies' },
        { key: 'Bread', value: 'Bread' },
    ]


    public handleExcludedIngredientsChange = (options: Option[]) => {
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

        this._excludedIngredientsValue = filteredOptions;
    };

    public handleDietsChange = (options: Option[]) => {
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

        this._dietsValue = filteredOptions;
    };

    public getExcludedIngredientsitle = (options: Option[]) => {
        return options.map((option) => option.value).join(', ') || 'Which ingredients should be excluded?';
    };

    public getDietsTitle = (options: Option[]) => {
        return options.map((option) => option.value).join(', ') || 'Choose a diet';
    };

    public setCheckboxValue() {
        this._checkboxValue = !this._checkboxValue;
        console.log(1111)
    }

    public setSliderValue(value: number) {
        this._sliderValue = value;
    }

    public setOutputStyle(value: {left: string}) {
        this._outputStyle = value;
    }

    constructor() {
        makeObservable<MealPlanStore, PrivateFields>(this, {
            _dietsValue: observable,
            _excludedIngredientsValue: observable,
            _checkboxValue: observable,
            _sliderValue: observable,
            _outputStyle: observable,
            _dayPlanList: observable,
            _weekPlanList: observable,
            dietsOptions: computed,
            dietsValue: computed,
            excludedIngredientsValue: computed,
            excludedIngredientsOptions: computed,
            checkboxValue: computed,
            sliderValue: computed,
            outputStyle: computed,
            dayPlanList: computed,
            weekPlanList: computed,
            setCheckboxValue: action,
            setSliderValue: action,
            setOutputStyle: action
        })
    }

    get dietsValue(): Option[] {
        return this._dietsValue;
    };

    get dietsOptions(): Option[] {
        return this._dietsOptions;
    };

    get excludedIngredientsValue(): Option[] {
        return this._excludedIngredientsValue;
    }

    get excludedIngredientsOptions(): Option[] {
        return this._excludedIngredientsOptions;
    }

    get checkboxValue(): boolean {
        console.log('get')
        return this._checkboxValue;
    }

    get sliderValue(): number {
        return this._sliderValue;
    }

    get outputStyle(): {left: string} {
        return this._outputStyle;
    }

    get dayPlanList(): OneDayPlan[] {
        return this._dayPlanList
    }

    get weekPlanList(): WeekPlan {
        return this._weekPlanList
    }

    // https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=0fc912ddd61f4f4c8c54be7a4e564f78
    async getMealPlanData(): Promise<void> {
        let timeFrame = ''
        if (this._checkboxValue) {
            timeFrame = 'day'
        } else {
            timeFrame = 'week'
        }

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${this._sliderValue}&diet=${this.getDietsTitle(this._dietsValue)}&exclude=${this.getExcludedIngredientsitle(this._excludedIngredientsValue)}`
        });

        console.log(response.data)

        if (this._checkboxValue) {
            this._dayPlanList = response.data.meals.map((raw: OneDayPlan) => ({
                title: raw.title,
                readyInMinutes: raw.readyInMinutes,
                servings: raw.servings,
                sourceUrl: raw.sourceUrl
            }))
        } else {
            const daysOfWeek = Object.keys(response.data.week);
            console.log(daysOfWeek)

            daysOfWeek.forEach(day => {
                // Получите массив meals и объект nutrients для текущего дня недели
                const { meals, nutrients } = response.data.week[day];
                if (this._weekPlanList) {
                    this._weekPlanList[day] = {
                        meals: meals,
                        nutrients: nutrients
                    };
                }
            });

            console.log(this._weekPlanList)

            // this._weekPlanList = response.data.week.map((raw: OneDayPlan) => ({
            //     title: raw.title,
            //     readyInMinutes: raw.readyInMinutes,
            //     servings: raw.servings,
            //     sourceUrl: raw.sourceUrl
            // }))
        }


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

    reset(): void {
    }

    destroy(): void { }
}