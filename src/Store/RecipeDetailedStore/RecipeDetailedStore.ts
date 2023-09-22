import axios from 'axios';
import { useParams } from 'react-router-dom';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { apiKey } from '../../../consts.config.ts';
import { ILocalStore } from 'utils/useLocalStore.ts';
import { RecipeData } from './types.ts'
import { Meta } from 'utils/meta.ts';


export interface IRecipeDetailedStore {
    getRecipeData(): Promise<void>;
}

export type PrivateFields = '_recipe' | '_meta';



export default class RecipeDetailedStore implements IRecipeDetailedStore, ILocalStore {

    private _recipe: RecipeData = {
        id: 0,
        preparationMinutes: "",
        cookingMinutes: "",
        image: "",
        aggregateLikes: "",
        readyMinutes: "",
        servings: "",
        title: "",
        summary: null,
        extendedIngredients: [],
        equipment: [],
    };
    private _meta: Meta = Meta.initial;

    private _id: any = useParams().id;

    constructor() {
        makeObservable<RecipeDetailedStore, PrivateFields>(this, {
            _recipe: observable,
            _meta: observable,
            recipe: computed,
            meta: computed,
        })
    }

    get recipe(): RecipeData {
        return this._recipe;
    }


    get meta(): Meta {
        return this._meta
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

    destroy(): void {
        this._recipe = {
            id: 0,
            preparationMinutes: "",
            cookingMinutes: "",
            image: "",
            aggregateLikes: "",
            readyMinutes: "",
            servings: "",
            title: "",
            summary: null,
            extendedIngredients: [],
            equipment: [],
        };
    }
}