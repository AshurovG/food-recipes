import axios from 'axios';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config';
import { ILocalStore } from 'utils/useLocalStore';
import { RecipeData, Params, OneDayPlan } from './types'
import { Meta } from 'utils/meta';
import rootStore from 'Store/RootStore';


export interface IRecipeDetailedStore {
    getRecipeData(): Promise<void>,
    getSimilarRecipesData(): Promise<void>
}

export type PrivateFields = '_recipe' | '_meta' | '_previousUrl' | '_oneOfWeekPlanList';



export default class RecipeDetailedStore implements IRecipeDetailedStore, ILocalStore {

    private _recipe: RecipeData = null;
    private _meta: Meta = Meta.initial;
    private _id:string = '';
    private _previousUrl = '/'
    private _oneOfWeekPlanList: OneDayPlan[] = []


    constructor(params: Params) {
        this._id = params.id;
        // Получаем url предыдущей страницы из глобального store
        makeObservable<RecipeDetailedStore, PrivateFields>(this, {
            _recipe: observable,
            _meta: observable,
            _previousUrl: observable,
            _oneOfWeekPlanList: observable,
            recipe: computed,
            meta: computed,
            previousUrl: computed,
            oneOfWeekPlanList: computed
        })
    }

    get recipe(): RecipeData {
        return this._recipe;
    }


    get meta(): Meta {
        return this._meta
    }

    get previousUrl(): string {
        this._previousUrl = rootStore.prevUrl.previousUrl
        console.log(this._previousUrl)
        return this._previousUrl
    }

    get oneOfWeekPlanList(): OneDayPlan[] | undefined {
        return this._oneOfWeekPlanList
    }

    async getRecipeData(): Promise<void> {
        this._meta = Meta.loading;

        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/${this._id}/information?apiKey=${apiKey}&addRecipeInformation=true&instructionsRequired=true&includeEquipment=true`
        })

        runInAction(() => {
            if (response.status === 200) {
                this._meta = Meta.success;
                this._recipe = {
                    id: response.data.id,
                    title: response.data.title,
                    image: response.data.image,
                    preparationMinutes: response.data.preparationMinutes,
                    cookingMinutes: response.data.cookingMinutes,
                    aggregateLikes: response.data.aggregateLikes,
                    servings: response.data.servings,
                    readyMinutes: response.data.readyInMinutes,
                    summary: response.data.summary,
                    extendedIngredients: response.data.extendedIngredients,
                    equipment: response.data.analyzedInstructions[0].steps,
                }
                return
            }

            this._meta = Meta.error
        })
    }

    async getSimilarRecipesData(): Promise<void> {
        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/${this._id}/similar?apiKey=${apiKey}&number=3`
        })

        console.log(response.data)

        // this.oneOfWeekPlanList = response.data.

        
        runInAction(() => {
            this._oneOfWeekPlanList = response.data.map((raw: OneDayPlan) => ({
                id: raw.id,
                title: raw.title,
                readyInMinutes: raw.readyInMinutes,
                servings: raw.servings,
            }))
    
            console.log(this.oneOfWeekPlanList)
        })
    }

    reset(): void {
        this._recipe = null;
    }

    destroy(): void { }
}