import axios from 'axios';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config';
import { ILocalStore } from 'utils/useLocalStore';
import { Option, DropdownCounts } from './types'
import { Meta } from 'utils/meta';
import rootStore from 'Store/RootStore';


export interface IRecipeDetailedStore {
    getRecipeData(): Promise<void>;
}

export type PrivateFields = '_dietsValue' | '_excludedIngredientsValue';

export default class MealPlanFormStore implements IRecipeDetailedStore, ILocalStore {
    private _dietsValue: Option[] = [];
    private _excludedIngredientsValue: Option[] = [];
    private _getFilteredrOptions = (options: Option[]) => {
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
      
        return filteredOptions;
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
        console.log('gettitle')
        return options.map((option) => option.value).join(', ') || 'Which ingredients should be excluded?';
    };

    public getDietsTitle = (options: Option[]) => {
        console.log('gettitle')
        return options.map((option) => option.value).join(', ') || 'Choose a diet';
    };

    constructor() {
        makeObservable<MealPlanFormStore, PrivateFields>(this, {
            _dietsValue: observable,
            _excludedIngredientsValue: observable,
            dietsOptions: computed,
            dietsValue: computed,
            excludedIngredientsValue: computed,
            excludedIngredientsOptions: computed
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

    async getRecipeData(): Promise<void> {

    }

    reset(): void {
    }

    destroy(): void { }
}