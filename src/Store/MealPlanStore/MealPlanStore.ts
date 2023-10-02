import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction, reaction, IReactionDisposer } from 'mobx';
import { apiKey } from '../../../consts.config';
import { ILocalStore } from 'utils/useLocalStore';
import { Option, DropdownCounts, OneDayPlan, WeekPlan, Nutrients } from './types'
import { Meta } from 'utils/meta';
import rootStore from 'Store/RootStore';


export interface IMealPlanStore {
    getMealPlanData(): Promise<void>;
}

export type PrivateFields = '_meta' | '_dietsValue' | '_excludedIngredientsValue' | '_checkboxValue' | '_sliderValue' | 
'_outputStyle' | '_dayPlanList' | '_weekPlanList' | '_dayNutrients' | '_isButtonClicked' | '_isOneDayPlan' | '_currentDay' |
'_oneOfWeekPlanList' | '_oneOfWeekPlanNutrients';

export default class MealPlanStore implements IMealPlanStore, ILocalStore {
    private _currentUrl = '/mealplan';
    private _meta: Meta = Meta.initial;
    private _dietsValue: Option[] = [];
    private _excludedIngredientsValue: Option[] = [];
    private _checkboxValue = false;
    private _sliderValue = 500;
    private _isButtonClicked = false;
    private _isOneDayPlan = false;
    private _outputStyle: {left: string} = {left: '0'};
    private _dayPlanList: OneDayPlan[] = [];
    private _currentDay = 'sunday';
    private _oneOfWeekPlanList: OneDayPlan[] = [];
    private _oneOfWeekPlanNutrients: Nutrients = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0
    };

    private _keys: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    private _dayNutrients: Nutrients = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0
    }
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

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => ({
            timeFrame: rootStore.query.getParam('time_frame'),
            calories: rootStore.query.getParam('calories'),
            diet: rootStore.query.getParam('diet'),
            exclude: rootStore.query.getParam('exclude')
        }),
        ({ timeFrame, calories, diet,  exclude}) => {
            if (typeof timeFrame === 'string' && typeof calories === 'string' && typeof diet === 'string' && typeof exclude === 'string') {
                if (timeFrame === 'day') {
                    this._checkboxValue = true
                } else {
                    this._checkboxValue = false
                }

                const parsedCalories = parseInt(calories, 10);
                if (!isNaN(parsedCalories)) {
                    this._sliderValue = parsedCalories;
                }

                let substrings = diet.split(', ');
                this._dietsValue = substrings.map((substring: string) => {
                    return {
                        key: substring,
                        value: substring,
                    };
                });

                substrings = exclude.split(', ');
                this._excludedIngredientsValue = substrings.map((substring: string) => {
                    return {
                        key: substring,
                        value: substring,
                    };
                });
            }
        }
    );


    public firstLoad = (): void => {
        let timeFrame = rootStore.query.getParam('time_frame');
        let calories = rootStore.query.getParam('calories');
        let diet = rootStore.query.getParam('diet');
        let exclude = rootStore.query.getParam('exclude');
        if (timeFrame === 'day') {
            this._checkboxValue = true;
            this._isOneDayPlan = true;
        } else if(timeFrame === 'week') {
            this._checkboxValue = false;
            this._isOneDayPlan = false;
        }
        this._currentUrl += `?time_frame=${timeFrame}`

        if (typeof calories === 'string') {
            const parsedCalories = parseInt(calories, 10);
            if (!isNaN(parsedCalories)) {
                this._sliderValue = parsedCalories;
            }
            this._currentUrl += `&calories=${calories}`
        }
        
        let substrings: string[] = [];

        if (diet && typeof diet === 'string') {
            substrings = diet?.split(', ');
            this._dietsValue = substrings.map((substring: string) => {
                return {
                    key: substring,
                    value: substring,
                };
            });
            this._currentUrl += `&diet=${diet}`
        }
        
        if (exclude && typeof exclude === 'string') {
            substrings = exclude?.split(', ');
            this._excludedIngredientsValue = substrings.map((substring: string) => {
                return {
                    key: substring,
                    value: substring,
                };
            });
            this._currentUrl += `exclude=${exclude}`
        }

        if (timeFrame) {
            this._isButtonClicked = true;
            this.getMealPlanData();
        }
        rootStore.prevUrl.setPreviousUrl(this._currentUrl)
    }

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
        return options.map((option) => option.value).join(', ') || 'Choose a diet if you have';
    };

    public setCheckboxValue() {
        this._checkboxValue = !this._checkboxValue;
    }

    public setSliderValue(value: number) {
        this._sliderValue = value;
    }

    public setIsButtonClicked(value: boolean) {
        this._isButtonClicked = true
        this._currentUrl = '/mealplan';
        let timeFrame = rootStore.query.getParam('time_frame');
        let calories = rootStore.query.getParam('calories');
        let diet = rootStore.query.getParam('diet');
        let exclude = rootStore.query.getParam('exclude');
        this._currentUrl += `?time_frame=${timeFrame}`

        if (typeof calories === 'string') {
            this._currentUrl += `&calories=${calories}`
        }

        if (diet && typeof diet === 'string') {
            this._currentUrl += `&diet=${diet}`
        }
        
        if (exclude && typeof exclude === 'string') {
            this._currentUrl += `&exclude=${exclude}`
        }

        if (timeFrame) {
            this._isButtonClicked = true;
            this.getMealPlanData();
        }
        rootStore.prevUrl.setPreviousUrl(this._currentUrl)
    }

    public setOutputStyle(value: {left: string}) {
        this._outputStyle = value;
    }

    public onNextButtonClick(): void {
        const currentIndex = this._keys.indexOf(this._currentDay);
        const nextIndex = (currentIndex + 1) % this._keys.length;
        const nextDay = this._keys[nextIndex];
        if (this._weekPlanList && this._weekPlanList[nextDay] && nextDay)  {
            this._oneOfWeekPlanList = this._weekPlanList[nextDay]!.meals
            this._oneOfWeekPlanNutrients = this._weekPlanList[nextDay]!.nutrients
            this._currentDay = nextDay;
        }
    }

    public onPreviousButtonClick(): void {
        const currentIndex = this._keys.indexOf(this._currentDay);
        const prevIndex = (currentIndex - 1) % this._keys.length;
        let prevDay = this._keys[prevIndex];
        if (!prevDay) {
            prevDay = 'saturday'
        }
        if (this._weekPlanList && this._weekPlanList[prevDay] && prevDay)  {
            this._oneOfWeekPlanList = this._weekPlanList[prevDay]!.meals
            this._oneOfWeekPlanNutrients = this._weekPlanList[prevDay]!.nutrients
            this._currentDay = prevDay;
        }
    }

    constructor() {
        
        makeObservable<MealPlanStore, PrivateFields>(this, {
            _meta: observable,
            _dietsValue: observable,
            _excludedIngredientsValue: observable,
            _checkboxValue: observable,
            _sliderValue: observable,
            _isButtonClicked: observable,
            _isOneDayPlan: observable,
            _outputStyle: observable,
            _dayPlanList: observable,
            _weekPlanList: observable,
            _dayNutrients: observable,
            _currentDay: observable,
            _oneOfWeekPlanList: observable,
            _oneOfWeekPlanNutrients: observable,
            meta: computed,
            dietsOptions: computed,
            dietsValue: computed,
            excludedIngredientsValue: computed,
            excludedIngredientsOptions: computed,
            checkboxValue: computed,
            sliderValue: computed,
            isButtonClicked: computed,
            isOneDayPlan: computed,
            outputStyle: computed,
            dayPlanList: computed,
            weekPlanList: computed,
            oneOfWeekPlanList: computed,
            oneOfWeekPlanNutrients: computed,
            dayNutrients: computed,
            currentUrl: computed,
            currentDay: computed,
            setCheckboxValue: action,
            setSliderValue: action,
            setIsButtonClicked: action,
            setOutputStyle: action,
            onNextButtonClick: action,
            onPreviousButtonClick: action
        })

        this.firstLoad()
    }

    get meta(): Meta {
        return this._meta
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
        return this._checkboxValue;
    }

    get sliderValue(): number {
        return this._sliderValue;
    }

    get outputStyle(): {left: string} {
        return this._outputStyle;
    }

    get dayPlanList(): OneDayPlan[] {
        return this._dayPlanList;
    }

    get weekPlanList(): WeekPlan {
        return this._weekPlanList;
    }

    get oneOfWeekPlanList(): OneDayPlan[] | undefined {
        return this._oneOfWeekPlanList
    }

    get oneOfWeekPlanNutrients(): Nutrients | undefined {
        return this._oneOfWeekPlanNutrients
    }

    get isButtonClicked(): boolean {
        return this._isButtonClicked;
    }

    get isOneDayPlan(): boolean {
        return this._isOneDayPlan;
    } 

    get dayNutrients(): Nutrients {
        return this._dayNutrients;
    }

    get currentUrl(): string {
        return this._currentUrl;
    }

    get currentDay(): string {
        return this._currentDay;
    }

    async getMealPlanData(): Promise<void> {
        rootStore.prevUrl.setPreviousUrl(this._currentUrl)
        this._meta = Meta.loading;
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

        runInAction(() => {
            if (response.status === 200) {
                this._meta = Meta.success;
                if (this._checkboxValue) {
                    this._isOneDayPlan = true
                    this._dayPlanList = response.data.meals.map((raw: OneDayPlan) => ({
                        id: raw.id,
                        title: raw.title,
                        readyInMinutes: raw.readyInMinutes,
                        servings: raw.servings,
                    }))

                    this._dayNutrients = response.data.nutrients
                } else {
                    this._isOneDayPlan = false
                    const daysOfWeek = Object.keys(response.data.week);
        
                    daysOfWeek.forEach(day => {
                        const { meals, nutrients } = response.data.week[day];
                        if (this._weekPlanList) {
                            this._weekPlanList[day] = {
                                meals: meals,
                                nutrients: nutrients
                            };
                        }
                    });
                    if (this._weekPlanList !== null && this._weekPlanList.sunday) {
                        this._oneOfWeekPlanList = this._weekPlanList.sunday.meals
                        this._oneOfWeekPlanNutrients = this._weekPlanList.sunday.nutrients
                    }
                    
                }
                
                return
            }

            this._meta = Meta.error
        })
    }

    reset(): void {
    }

    destroy(): void {
        this._qpReaction();
    }
}